import React, { useState, useEffect } from "react"
import _ from "lodash";

import { Select, MenuItem, TextField, createStyles, FormControl, InputLabel } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';

import { dbClient } from '../utils/dbClient'
import { readableKey, fieldStyle, FieldProps } from '../utils/tableHelper'


function StringField(props: FieldProps) {
  const [value, setValue] = useState("")
  useEffect(() => {
    if (props.value) setValue(props.value)
    else setValue("")
  }, [props.value])

  const field = props.field

  return <TextField
    style={{ width: "95%", ...fieldStyle }}
    multiline
    key={field}
    value={value}
    helperText={props.helperText}
    label={readableKey(field)}
    variant="outlined"
    onChange={(e) => {
      props.onFieldChange(field, e.target.value)
      setValue(e.target.value)
    }}
  />
}

const styles = (theme: Theme) => createStyles({
});

function SelectField(props: FieldProps) {
  const [selectValues, setSelectValues] = useState([])
  const [selectValue, setSelectValue] = useState("")
  
  useEffect(() => {
    if (props.value) setSelectValue(props.value)
    else setSelectValue("")

  }, [props.value, selectValues])

  const field = props.field

  useEffect(() => {
    let active = true;

    const townFetcher = new dbClient.TownFetcher()
    const tourFetcher = new dbClient.TourFetcher()

    if (field === "tourTownName") {
      townFetcher.read({ select: "townName" })
        .then(docs => {
          if (active) {
            setSelectValues(docs.map((doc: any) => doc.data.townName))
          }
        })
    } else if (field === "tourTownState") {
      townFetcher.read({ select: "townState" })
        .then(docs => {
          if (active) {
            setSelectValues(docs.map((doc: any) => doc.data.townState))
          }
        })
    } else if (field === "locTourName") {
      tourFetcher.read({ select: "tourName" })
        .then(docs => {
          if (active) {
            setSelectValues(docs.map((doc: any) => doc.data.tourName))
          }
        })
    } else if (field === "locTownName") {
      townFetcher.read({ select: "townName" })
        .then(docs => {
          if (active) {
            setSelectValues(docs.map((doc: any) => doc.data.townName))
          }
        })
    } else if (field === "locTownState") {
      townFetcher.read({ select: "townState" })
        .then(docs => {
          if (active) {
            setSelectValues(docs.map((doc: any) => doc.data.townState))
          }
        })
    }

    return () => { active = false };
  }, [field])

  if (!_.isEmpty(selectValues)) {
    const selectItems = _.uniq(selectValues).map((v: string, i: number) => {
      return <MenuItem value={v} key={i} children={v} />
    })

    return <FormControl
      variant="outlined"
      key={field}
      style={{
        ...fieldStyle, marginRight: "0.5rem"
      }}>
      <InputLabel id="select-label">{readableKey(field)}</InputLabel>
      <Select
        label={readableKey(field)}
        labelId="select-label"
        value={selectValue}
        onChange={(e) => {
          props.onFieldChange(props.field, e.target.value)
          setSelectValue(_.toString(e.target.value))
        }}
      >
        <MenuItem value={""} key={"none"} children={"None"} />
        {selectItems}
      </Select>
    </FormControl>

  }
  
  return <StringField {...props} />
}

export default withStyles(styles)(SelectField)
