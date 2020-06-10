import React from 'react';

import { Button, WithStyles, createStyles } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';

interface Props extends WithStyles<typeof styles> {
  title: string
}

const styles = (theme: Theme) => createStyles({

});

function Action(props: Props) {
  return <>
    {props.title &&
      <Button variant="contained" color="secondary">{props.title}</Button>}
  </>
}

export default withStyles(styles)(Action)
