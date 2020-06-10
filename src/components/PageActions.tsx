import React from 'react';

import { Button, Grid, WithStyles, createStyles } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';

import { ContentType } from './Content'
import firebase from '../utils/firebaseClient'

interface Props extends WithStyles<typeof styles> {
  onContentTypeChange: (t: ContentType) => void
}

const styles = (theme: Theme) => createStyles({
  root: {
    marginTop: theme.spacing(2),
    ...theme.mixins.gutters(),
  },
  action: {
    marginLeft: theme.spacing(4)
  }
});

function PageActions(props: Props) {
  const classes = props.classes

  const handleExitClick = () => {
    
    firebase.auth().signOut().then(function(res: any) {
      
    })
  }

  return <>
    <Grid container className={classes.root} justify="space-between">
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleExitClick()}
          >
          Exit
       </Button>
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          onClick={() => props.onContentTypeChange(ContentType.User)}
          color="secondary"
          className={classes.action}>
          Users
        </Button>
        <Button
          variant="contained"
          onClick={() => props.onContentTypeChange(ContentType.Town)}
          color="secondary"
          className={classes.action}>
          Towns
        </Button>
        <Button
          variant="contained"
          onClick={() => props.onContentTypeChange(ContentType.Tour)}
          color="secondary"
          className={classes.action}>
          Tours
        </Button>
        <Button
          variant="contained"
          onClick={() => props.onContentTypeChange(ContentType.Location)}
          color="secondary"
          className={classes.action}>
          Locations
        </Button>
      </Grid>
    </Grid>

  </>
}

export default withStyles(styles)(PageActions)
