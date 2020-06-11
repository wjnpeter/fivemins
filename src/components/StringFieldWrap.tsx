import React, { useState, useEffect } from "react"
import _ from "lodash";

import { Select, MenuItem, TextField, createStyles, FormControl, InputLabel } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';

import { dbClient } from '../utils/dbClient'
import { readableKey, fieldStyle, FieldProps } from '../utils/tableHelper'
import UploadField from "./UploadField"


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

function StringFieldWrap(props: FieldProps) {
  // select control
  const [selectValues, setSelectValues] = useState([])
  const [selectValue, setSelectValue] = useState("")

  // upload control
  const [inputAcceptType, setInputAcceptType] = useState("")
  
  useEffect(() => {
    if (props.value) setSelectValue(props.value)
    else setSelectValue("")

  }, [props.value, selectValues])
 
  const field = props.field

  useEffect(() => {
    let active = true;

    const speakerFetcher = new dbClient.SpeakerFetcher()
    

    // init select
    if (field === "podcastSpeaker") {
      speakerFetcher.read({ select: "speakerName" })
        .then(docs => {
          if (active) {
            setSelectValues(docs.map((doc: any) => doc.data.speakerName))
          }
        })
    } 

    // init upload
    // audio/*, video/*
    if (field === "podcastGSUrl") {
      setInputAcceptType("audio/*")
    } 

    return () => { active = false };
  }, [field])

  // generate select component
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

  // generate upload component
  if (!_.isEmpty(inputAcceptType)) {
    return <UploadField inputAcceptType={inputAcceptType} {...props} />
  }
  
  return <StringField {...props} />
}

export default withStyles(styles)(StringFieldWrap)
