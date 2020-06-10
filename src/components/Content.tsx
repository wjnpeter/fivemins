import _ from 'lodash';

import React, { useEffect, useCallback } from 'react';
import MaterialTable, { Column } from "material-table";

import { WithStyles, createStyles } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';

import { dbClient, CRUD } from '../utils/dbClient'
import { tableIcons } from './TableIcons'
import { TourView, TownView, LocView } from '../utils/tableHelper'

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

interface Row {
  name: string;
  surname: string;
  birthYear: number;
  birthCity: number;
}

interface TableData {
  columns: Array<Column<any>>;
  data: Row[];
}

const readableKeys = (keys: string[]): string[] => {
  return keys.map((k: any) =>
    _.words(k).map((w) => _.capitalize(w)).join(' ')
  )
}

function Content(props: Props) {
  const [tableData, setTableData] = React.useState<TableData>({
    columns: [],
    data: [],
  });

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
    const docs = await dbFetcher().read(null)
    if (!_.isNil(docs)) {

      const view = dbView()
      const tourKeys = view.dbKeys()
      const readableTourKeys = readableKeys(tourKeys)

      const columns = tourKeys.map((k: string, i: number) => {
        return {
          title: readableTourKeys[i], field: k, type: view[k]
        }
      })

      const tableData = docs.map((doc: any) => {
        return { id: doc.id, ...doc.data }
      })

      setTableData({
        columns: columns,
        data: tableData
      })
    }
  }, [dbFetcher, dbView])

  useEffect(() => {
    getTableData()
  }, [getTableData])


  // CREATE

  const handleRowAdd = (newData: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      const data = newData
      delete data.id
      const newDataId = await dbFetcher().create({ data: data })

      if (newDataId) {
        setTableData((prev) => {
          const data = [...prev.data];
          data.push({ id: newDataId, ...newData });
          return { ...prev, data };
        });

        resolve()
      } else reject()
    })
  }

  // UPDATE

  const handleRowUpdate = (newData: any, oldData: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      const data = _.clone(newData)
      delete data.id
      const success = await dbFetcher().update({ id: oldData.id, data: data })

      if (success) {
        if (oldData) {
          setTableData((prev) => {
            const data = [...prev.data];
            data[data.indexOf(oldData)] = newData;
            return { ...prev, data };
          });
        }
        resolve()
      } else reject()
    })
  }

  // DELETE

  const handleRowDelete = (oldData: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      const success = await dbFetcher().delete({ id: oldData.id })
      if (success) {
        if (oldData) {
          setTableData((prev) => {
            const data = [...prev.data];
            data.splice(data.indexOf(oldData), 1);
            return { ...prev, data };
          });
        }
        resolve()
      } else reject()
    })
  }

  return <>
    <MaterialTable
      icons={tableIcons}
      columns={tableData.columns}
      data={tableData.data}
      editable={{
        onRowAdd: (newData: any) => handleRowAdd(newData),
        onRowUpdate: (newData, oldData) => handleRowUpdate(newData, oldData),
        onRowDelete: (oldData) => handleRowDelete(oldData),
      }}
      components={{
        EditField: props => {
          return dbView().editFieldComponent(props)

        }
      }}
    />
  </>
}

export default withStyles(styles)(Content)
