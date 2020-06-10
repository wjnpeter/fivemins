import _ from 'lodash';

import React, { useEffect, useCallback, useState } from 'react';
import MaterialTable, { Column } from "material-table";

import { WithStyles, createStyles, Grid, Paper, Snackbar, Container } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';

import { dbClient, CRUD } from '../utils/dbClient'
import { tableIcons } from './TableIcons'
import DetailPanel from './DetailPanel'
import { TourView, TownView, LocView, readableKey } from '../utils/tableHelper'

export enum ContentType {
  Summary = "Summary",
  User = "User",
  Town = "Town",
  Tour = "Tour",
  Location = "Location",
}

interface Props extends WithStyles<typeof styles> {
  tableType: ContentType
}

const styles = (theme: Theme) => createStyles({
});

interface TableData {
  columns: Array<Column<any>>;
  data: any[];
}

function MainContent(props: Props) {
  const [tableData, setTableData] = React.useState<TableData>({
    columns: [],
    data: [],
  });
  const [selectedRow, setSelectedRow] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")


  const dbFetcher = useCallback(() => {
    if (props.tableType === ContentType.Tour) {
      return new dbClient.TourFetcher()
    } else if (props.tableType === ContentType.Town) {
      return new dbClient.TownFetcher()
    } else if (props.tableType === ContentType.Location) {
      return new dbClient.LocFetcher()
    }

    return new CRUD()
  }, [props.tableType])

  const dbView = useCallback(() => {
    if (props.tableType === ContentType.Tour) {
      return new TourView();
    } else if (props.tableType === ContentType.Town) {
      return new TownView();
    } else if (props.tableType === ContentType.Location) {
      return new LocView();
    }

    return new TownView()
  }, [props.tableType])

  // READ

  const getTableData = useCallback(async () => {
    setLoading(true)
    setSelectedRow(null)

    const docs = await dbFetcher().read(null)
    if (!_.isNil(docs)) {
      const view = dbView()
      const colKeys = view.summaryKeys()

      const columns = colKeys.map((k: string, i: number) => {
        return {
          title: readableKey(k), field: k, type: view[k]
        }
      })

      const tableData = docs.map((doc: any) => {
        return { id: doc.id, ...doc.data }
      })

      setTableData({
        columns: columns,
        data: tableData
      })

      setMessage("[SUCCESS] Read " + tableData.length + " records.")
    } else {
      setMessage("[FAIL] Read records from " + props.tableType)
    }

    setLoading(false)
  }, [dbFetcher, dbView, props.tableType])

  useEffect(() => {
    getTableData()
  }, [getTableData])


  // CREATE

  const handleRowAdd = (newData: any) => {
    setLoading(true)

    const data = _.clone(newData)
    delete data.id

    dbFetcher().create({ data: data })
      .then((newDataId) => {
        if (newDataId) {
          setTableData((prev) => {
            const data = [...prev.data];
            data.push({ id: newDataId, ...newData });
            return { ...prev, data };
          });

          setMessage("[SUCCESS] Created data, id: " + newDataId)
        }

        setLoading(false)
      })
      .catch(() => {
        setMessage("[FAIL] Create data.")

        setLoading(false)
      })
  }

  // UPDATE

  const handleRowUpdate = (newData: any) => {
    setLoading(true)

    const data = _.clone(newData)
    delete data.id
    dbFetcher().update({ id: newData.id, data: data })
      .then(() => {
        if (newData) {
          setTableData((prev) => {
            const data = [...prev.data];
            const oldDataIdx = data.findIndex((e) => e.id === newData.id)
            if (oldDataIdx !== -1) data[oldDataIdx] = newData;
            return { ...prev, data };
          });

          setMessage("[SUCCESS] Updated data, id: " + newData.id)

          setLoading(false)
        }
      })
      .catch((e) => {
        setMessage("[FAIL] Update data.")
        setLoading(false)
      })
  }

  // DELETE

  const handleRowDelete = (oldData: any) => {
    setLoading(true)

    dbFetcher().delete({ id: oldData.id })
      .then(() => {
        if (oldData) {
          setTableData((prev) => {
            const data = [...prev.data];
            data.splice(data.indexOf(oldData), 1);
            return { ...prev, data };
          });

          setMessage("[SUCCESS] Deleted data, id: " + oldData.id)
        }

        setLoading(false)
      })
      .catch(() => {
        setMessage("[FAIL] Delete data.")
        setLoading(false)
      })
  }

  return <Container maxWidth="xl">
    <Grid container spacing={1} >
      <Grid item xs={7}>
        <MaterialTable
          title={props.tableType + " Listing"}
          options={{ pageSize: 10 }}
          icons={tableIcons}
          columns={tableData.columns}
          data={tableData.data}
          isLoading={loading}
          onRowClick={(e, row) => setSelectedRow(row)}
          components={{
            Container: (props: any) => <Paper {...props} elevation={1} />
          }}
        />
      </Grid>

      <Grid item xs={5}>
        <DetailPanel
          view={dbView()}
          rowData={selectedRow}
          onAdd={handleRowAdd}
          onDelete={handleRowDelete}
          onUpdate={handleRowUpdate}
          onNew={() => setSelectedRow(null)}
        />
      </Grid>
    </Grid>

    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={!_.isEmpty(message)}
      autoHideDuration={3000}
      message={message}
      onClose={() => setMessage("")}
    />
  </Container>
}

export default withStyles(styles)(MainContent)
