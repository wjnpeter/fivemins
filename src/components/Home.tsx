import clsx from 'clsx';
import React from 'react';
import { Avatar, Grid, Link, Container, Typography, Box, WithStyles, createStyles } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
  root: {
    backgroundColor: "#C3E3CC",
    textAlign: "center",
    padding: theme.spacing(1, 10, 8),
  },
  top: {
    [theme.breakpoints.up('sm')]: {
      height: "100vh"
    }
  },
  typography: {
    color: "white",
    marginTop: "0.25rem",
    ...theme.typography.h4,
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
    letterSpacing: "0.25rem",
  },
  logo: {
    width: "16rem",
    height: "16rem",
  },
  nav: {
    width: "auto",
    paddingTop: "1rem"
  },
  navItem: {
    marginLeft: "2rem"
  },
  navLink: {
    ...theme.typography.body1,
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
    letterSpacing: "0.25rem",
  },
  store: {
    marginTop: "4rem",
    marginBottom: "6rem",
  },
  storeAvatar: {
    width: "240px",
    height: "70px"
  },
  categoryWrap: {
    marginTop: "4rem",
    marginBottom: "3rem",
  },
  categoryIcon: {
    width: "64px",
    height: "auto"
  },
  category: {
    width: "270px",
    backgroundColor: "white",
    color: "#C3E3CC",
    borderRadius: "8px",
    padding: "0.5rem",
  },
  contact: {
    ...theme.typography.body1,
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
    letterSpacing: "0.25rem",
  },
  socialWrap: {
    marginTop: "3rem"
  }
});

interface Props extends WithStyles<typeof styles> {

}


function Home(props: Props) {
  const classes = props.classes

  return <Container className={classes.root}>
    <Box className={classes.top}>
      {/* header */}
      <Grid container justify="space-between">
        <Grid item>
          <Avatar className={classes.logo} src="images/logo.png"></Avatar>
        </Grid>
        <Grid item container alignItems="flex-start" className={classes.nav}>
          <Link href="#about" underline="none" className={classes.navItem}>
            <Typography className={clsx(classes.typography, classes.navLink)}>
              About Us
          </Typography>
          </Link>
          <Link href="#contact" underline="none" className={classes.navItem}>
            <Typography className={clsx(classes.typography, classes.navLink)}>
              For Business
            </Typography>
          </Link>
          <Link href="#contact" underline="none" className={classes.navItem}>
            <Typography className={clsx(classes.typography, classes.navLink)}>
              Contact Us
            </Typography>
          </Link>

        </Grid>
      </Grid>

      {/* banner */}
      <Box>
        <Typography className={classes.typography}>Are you ready to take</Typography>
        <Typography className={classes.typography}>5 minutes a day just for you!</Typography>

        <Box className={classes.store}>
          <Typography paragraph className={classes.typography}>To get started download our app:</Typography>
          <Grid container spacing={4} justify="center">
            <Grid item>
              <Avatar className={classes.storeAvatar} variant="rounded" src="images/app-store-badge.svg"></Avatar>
            </Grid>
            <Grid item>
              <Avatar className={classes.storeAvatar} variant="rounded" src="images/google-play-badge.png"></Avatar>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>

    {/* content */}
    <Box id="about">
      <Typography paragraph className={classes.typography}>
        5 days a week we launch a 5 minute podcast with our knowledge specialists and celebrities!
      </Typography>

      <Box className={classes.categoryWrap}>
        <Typography paragraph className={classes.typography}>
          We trust you get at least one takeaway from each podcast to help improve you day, week and month.
      </Typography>
        <Grid container spacing={2}>
          <Grid item container justify="center" alignItems="center">
            <Avatar className={classes.categoryIcon} variant="square" src="images/category/wellness.png"></Avatar>
            <Typography className={clsx(classes.typography, classes.category)}>Wellness</Typography>
          </Grid>
          <Grid item container justify="center" alignItems="center">
            <Avatar className={classes.categoryIcon} variant="square" src="images/category/mindest.png"></Avatar>
            <Typography className={clsx(classes.typography, classes.category)}>Mindest</Typography>
          </Grid>
          <Grid item container justify="center" alignItems="center">
            <Avatar className={classes.categoryIcon} variant="square" src="images/category/productivity.png"></Avatar>
            <Typography className={clsx(classes.typography, classes.category)}>Productivity</Typography>
          </Grid>
          <Grid item container justify="center" alignItems="center">
            <Avatar className={classes.categoryIcon} variant="square" src="images/category/resilience.png"></Avatar>
            <Typography className={clsx(classes.typography, classes.category)}>Resilience</Typography>
          </Grid>
        </Grid>
      </Box>

      <Box id="contact">
        <Typography style={{ marginTop: "6rem", marginBottom: "3rem" }} className={classes.typography}>
          We can tailor a package for your business!
        </Typography>

        <Typography paragraph className={classes.typography}>
          If you are looking for an affordable way to bring Wellness, Mindset, Productivity and Resilience tips to your team every weekday.
        </Typography>
        <Typography paragraph className={classes.typography}>
          Get it touch with us to discuss.
        </Typography>

        <Typography className={clsx(classes.typography, classes.contact)}>
          Contact us
        </Typography>
        <Typography className={clsx(classes.typography, classes.contact)}>
          Email: team@5minutes.com.au
        </Typography>

        {/* social */}
        <Grid container justify="center" spacing={1} className={classes.socialWrap}>
          <Link href="mailto:team@5minutes.com.au">
            <Avatar src="images/social/mail.png" />
          </Link>
          <Link href="#">
            <Avatar src="images/social/instagram.png" />
          </Link>
          <Link href="#">
            <Avatar src="images/social/facebook.png" />
          </Link>
        </Grid>
      </Box>


    </Box>
  </Container>
}

export default withStyles(styles)(Home)
