import _ from 'lodash';
import moment from 'moment'

import React, { useEffect, useState } from 'react';

import { WithStyles, createStyles, Button, TextField, Paper, Grid, Checkbox, Typography, FormControlLabel } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';

import { readableKey, KeyDictionary, fieldStyle, FieldProps } from '../utils/tableHelper'
import StringFieldWrap from "./StringFieldWrap";


interface Props extends WithStyles<typeof styles> {
  view: any
  rowData: any
  onNew: any
  onAdd: any
  onDelete: any
  onUpdate: any
}

const styles = (theme: Theme) => createStyles({
  root: {
    padding: theme.spacing(1, 1, 3),
  }
});

function NumberField(props: FieldProps) {
  const [value, setValue] = useState("")

  // date control
  const [dateValue, setDateValue] = useState("")

  useEffect(() => {
    if (props.value) setValue(props.value)
    else setValue("")
  }, [props.value])


  const field = props.field

  useEffect(() => {
    // init date
    if (field === "podcastAvailable") {
      var d = new Date()
      if (props.value) {
        d = new Date(props.value * 1000)
      } 

      setDateValue(moment(d).format().substring(0, 16))
    }

  }, [field, props.value])
  
  // generate date component
  if (!_.isEmpty(dateValue)) {
    return <TextField
      style={{ width: "65%", marginRight: "0.5rem", ...fieldStyle }}
      key={field}
      value={dateValue}
      type="datetime-local"
      variant="outlined"
      label={readableKey(field)}
      helperText={props.helperText}
      onChange={(e) => {
        const newDate = new Date(e.target.value)
        props.onFieldChange(field, newDate.getTime() / 1000)
        setDateValue(e.target.value)
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  }

  return <TextField
    style={{ width: "65%", marginRight: "0.5rem", ...fieldStyle }}
    key={field}
    value={value}
    type="number"
    variant="outlined"
    label={readableKey(field)}
    helperText={props.helperText}
    onChange={(e) => {
      props.onFieldChange(field, e.target.value)
      setValue(e.target.value)
    }}
  />
}

function BooleanField(props: FieldProps) {
  const [checked, setChecked] = React.useState(false)
  useEffect(() => {
    if (props.value) setChecked(props.value)
    else setChecked(false)
  }, [props.value])


  return <FormControlLabel
    style={{ ...fieldStyle }}
    control={
      <Checkbox
        checked={checked}
        onChange={(e) => {
          props.onFieldChange(props.field, e.target.checked)
          setChecked(e.target.checked)
        }}
      />
    }
    label={readableKey(props.field)}
  />
}

function DetailPanel(props: Props) {
  const classes = props.classes

  const rowData = props.rowData
  const view = props.view

  const [dirty, setDirty] = useState(false)

  const [data, setData] = useState<KeyDictionary>({})
  useEffect(() => { setData(rowData ? rowData : {}) }, [rowData])

  const handleFieldChange = (field: string, newValue: any) => {
    const newData = _.clone(data)
    newData[field] = newValue
    setData(newData)

    setDirty(true)
  }


  const details = view.dbKeys().map((field: string) => {
    const fieldType = view[field]

    let fieldValue = data[field]
    if (fieldValue instanceof File) {
      fieldValue = fieldValue.name
    } else if (field.endsWith("Geo") && !fieldValue) {
      fieldValue = view.makeGeo(data);
    }

    const fieldProps = {
      helperText: view.helperText(field),
      key: field,
      value: fieldValue,
      field: field,
      onFieldChange: handleFieldChange
    }
    if (fieldType === "string") {
      return <StringFieldWrap {...fieldProps} />
    } else if (fieldType === "numeric") {
      return <NumberField {...fieldProps} />
    } else if (fieldType === "boolean") {
      return <BooleanField {...fieldProps} />
    }

    return <div key={field}></div>
  })

  return <>
    <Paper className={classes.root}>
      <Typography variant="h6">
        {
          !_.isNil(data.id) ? "Editing Selected Data" : "Creating Data"
        }
      </Typography>

      {details}

      <Grid container justify="space-between" style={{ marginTop: "0.5rem" }}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              props.onNew()

              setData({})
              setDirty(false)
            }}>
            New
          </Button>
        </Grid>

        <Grid item>
          <Button
            style={{ marginRight: "0.25rem" }}
            variant="outlined"
            color="primary"
            disabled={_.isNil(data.id)}
            onClick={() => {
              if (!_.isNil(data.id)) props.onDelete(data)

              setData({})
            }}>
            Delete
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!dirty}
            onClick={() => {
              if (!_.isNil(data.id)) props.onUpdate(data)
              else props.onAdd(data)

              setDirty(false)
            }}>
            Save
          </Button>
        </Grid>
      </Grid>

    </Paper>
  </>
}

export default withStyles(styles)(DetailPanel)
