import React, { useState, useEffect } from "react"
import _ from "lodash";

import { Button, createStyles, Grid, TextField } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';

import { readableKey, fieldStyle, FieldProps } from '../utils/tableHelper'

interface UploadProps extends FieldProps {
  inputAcceptType: string
}

function UploadField(props: UploadProps) {

  const [filename, setFilename] = useState("")
  useEffect(() => {
    setFilename(props.value ? props.value : "")
  }, [props.value])
  
  return <Grid
    key={props.field}
    container
    alignItems="baseline"
    style={{ width: "95%", ...fieldStyle }}>
    <TextField
      helperText={props.helperText}
      placeholder={readableKey(props.field)}
      variant="outlined"
      value={filename}
      InputProps={{
        readOnly: true,
      }}
    />

    <input
      accept={props.inputAcceptType}
      style={{ display: "none" }}
      id={"upload-file-" + props.field}
      type="file"
      onChange={(e) => {
        if (!_.isNil(e.target.files)) props.onFieldChange(props.field, e.target.files![0])
      }}
    />
    <label htmlFor={"upload-file-" + props.field} >
      <Button color="primary" component="span" >
        Upload
      </Button>
    </label>
  </Grid>
}

const styles = (theme: Theme) => createStyles({
});


export default withStyles(styles)(UploadField)
