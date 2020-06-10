import React from 'react';

import { Button, Toolbar, AppBar, Avatar, Box, WithStyles, createStyles, Select, MenuItem } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';

import firebase from '../utils/firebaseClient'
import { ContentType } from './MainContent'

interface Props extends WithStyles<typeof styles> {
  collectionType: ContentType
  onCollectionTypeChange: any
}

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: "space-between",
  },
  brand: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: theme.palette.primary.contrastText,
    ...theme.typography.h5,

    "& :hover": {
      backgroundColor: theme.palette.primary.dark
    }
  },
  titleIcon: {
    color: theme.palette.primary.contrastText,
  }
});

function Header(props: Props) {
  const classes = props.classes

  const handleExitClick = () => {
    firebase.auth().signOut()
   
    document.location.href="/";
  }

  return <>
    <div className={classes.root}>
      <AppBar position="static" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Avatar className={classes.brand} src="/images/logo.png" variant="rounded">C</Avatar>

          <Select
            defaultValue={props.collectionType}
            value={props.collectionType}
            className={classes.title}
            disableUnderline
            color="secondary"
            classes={{
              icon: classes.titleIcon
            }}
            onChange={(e) => props.onCollectionTypeChange(e.target.value)}
          >
            <MenuItem value={ContentType.Tour} >{ContentType.Tour}</MenuItem>
            <MenuItem value={ContentType.Location}>{ContentType.Location}</MenuItem>
            <MenuItem value={ContentType.Town}>{ContentType.Town}</MenuItem>
          </Select>

          <Box style={{ display: "flex", alignItems: "center" }}>
            <Button color="inherit" onClick={() => handleExitClick()}>Exit</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  </>
}

export default withStyles(styles)(Header)
