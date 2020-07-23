import clsx from 'clsx';
import React from 'react';
import { Avatar, Grid, Link, Container, Typography, Box, WithStyles, createStyles, CssBaseline } from '@material-ui/core';
import { withStyles, Theme, ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const appBarHeight = 224

const styles = (theme: Theme) => createStyles({
  root: {
    backgroundColor: "#C3E3CC",
    textAlign: "center",

  },
  top: {
    position: "relative",
    top: appBarHeight,

    [theme.breakpoints.up('sm')]: {
      minHeight: `calc(100vh - ${appBarHeight}px)`,

    }
  },
  middle: {
    marginTop: "0.25rem",
    [theme.breakpoints.up('sm')]: {
      minHeight: `calc(100vh - ${appBarHeight}px)`,
    },

    padding: theme.spacing(1, 4, 8),

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(1, 24, 8),
    }
  },
  bottom: {
    marginTop: "0.25rem",
    [theme.breakpoints.up('sm')]: {
      minHeight: `calc(100vh - ${appBarHeight}px)`,

    },

    padding: theme.spacing(1, 4, 8),

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(1, 24, 8),
    }
  },
  typography: {
    color: "white",
    marginTop: "0.25rem",
    fontWeight: 600,
    letterSpacing: "0.05rem",

    [theme.breakpoints.up('sm')]: {
      letterSpacing: "0.25rem",
    }
  },
  bottomGutter: {
    marginBottom: "0.5rem",
    [theme.breakpoints.up('md')]: {
      marginBottom: "1rem"
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: "2rem"
    }
  },
  appBar: {
    height: appBarHeight,
    position: "fixed",
    backgroundColor: "#c3e3cc",
    zIndex: theme.zIndex.appBar,
    width: "95%",
  },
  logoWrap: {
    margin: "auto",
    [theme.breakpoints.up('sm')]: {
      margin: "initial"
    }

  },
  logo: {
    width: "8rem",
    height: "8rem",

    [theme.breakpoints.up('md')]: {
      width: "14rem",
      height: "14rem",
    }
  },
  nav: {
    width: "auto",
    paddingTop: "1rem",
    margin: "auto",

    [theme.breakpoints.up('md')]: {
      marginRight: "initial"
    }
  },
  navItem: {
    marginLeft: "0.5rem",
    marginRight: "0.5rem",

    [theme.breakpoints.up('sm')]: {
      marginLeft: "1rem",
      marginRight: "1rem",
    }
  },
  navLink: {
    fontWeight: 600,
    letterSpacing: "0.02rem",

    [theme.breakpoints.up('sm')]: {
      letterSpacing: "0.25rem",
    }
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

  },
  categoryIcon: {
    width: "48px",
    height: "auto",

    [theme.breakpoints.up('md')]: {
      width: "64px",
    }
  },
  category: {
    width: "225px",
    backgroundColor: "white",
    color: "#C3E3CC",
    borderRadius: "8px",
    padding: "0.5rem",

    [theme.breakpoints.up('sm')]: {
      width: "270px",
    }
  },
  contact: {
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
  let theme = createMuiTheme({
    typography: {
      fontFamily: "'Montserrat', sans-serif",
    },
  });
  theme = responsiveFontSizes(theme);

  return <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth={false} className={classes.root}>
      <Box >
        {/* header */}
        <Grid container justify="space-between" className={classes.appBar}>
          <Grid item className={classes.logoWrap}>
            <Avatar className={classes.logo} src="images/logo.png"></Avatar>
          </Grid>
          <Grid item container alignItems="flex-start" className={classes.nav}>
            <Link href="#about" underline="none" className={classes.navItem}>
              <Typography variant="subtitle1" className={clsx(classes.typography, classes.navLink)}>
                About Us
          </Typography>
            </Link>
            <Link href="#contact" underline="none" className={classes.navItem}>
              <Typography variant="subtitle1" className={clsx(classes.typography, classes.navLink)}>
                For Business
            </Typography>
            </Link>
            <Link href="#contact" underline="none" className={classes.navItem}>
              <Typography variant="subtitle1" className={clsx(classes.typography, classes.navLink)}>
                Contact Us
            </Typography>
            </Link>

          </Grid>
        </Grid>

        {/* banner */}
        <Grid container direction="column" justify="center" className={classes.top} >
          <Typography variant="h4" className={classes.typography}>Are you ready to take</Typography>
          <Typography variant="h4" className={classes.typography}>5 minutes a day just for you!</Typography>

          <Box className={classes.store}>
            <Typography variant="h4" paragraph className={classes.typography}>To get started download our app:</Typography>
            <Grid container spacing={4} justify="center" style={{ marginTop: "7vh" }}>
              <Grid item>
                <Link href="https://apps.apple.com/us/app/id1522818898">
                  <Avatar className={classes.storeAvatar} variant="rounded" src="images/app-store-badge.svg"></Avatar>
                </Link>
              </Grid>
              <Grid item>
                <Avatar className={classes.storeAvatar} variant="rounded" src="images/google-play-badge.png"></Avatar>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Box>

      {/* content */}
      <Box id="about" style={{ paddingTop: appBarHeight }}>
        <Grid container direction="column" justify="center" className={classes.middle} >
          <Grid item>
            <Typography variant="h5" paragraph className={clsx(classes.typography, classes.bottomGutter)}>
              5 days a week we launch a 5 minute podcast with our knowledge specialists and celebrities!
          </Typography>
          </Grid>

          <Grid item className={classes.categoryWrap}>
            <Typography variant="h5" paragraph className={clsx(classes.typography, classes.bottomGutter)}>
              We trust you get at least one takeaway from each podcast to help improve your day, week and month.
            </Typography>
            <Grid container spacing={1} style={{ marginTop: "2vh" }}>
              <Grid item container justify="center" alignItems="center">
                <Avatar className={classes.categoryIcon} variant="square" src="images/category/wellness.png"></Avatar>
                <Typography variant="subtitle1" className={clsx(classes.typography, classes.category)}>Wellness</Typography>
              </Grid>
              <Grid item container justify="center" alignItems="center">
                <Avatar className={classes.categoryIcon} variant="square" src="images/category/mindest.png"></Avatar>
                <Typography variant="subtitle1" className={clsx(classes.typography, classes.category)}>Mindest</Typography>
              </Grid>
              <Grid item container justify="center" alignItems="center">
                <Avatar className={classes.categoryIcon} variant="square" src="images/category/productivity.png"></Avatar>
                <Typography variant="subtitle1" className={clsx(classes.typography, classes.category)}>Productivity</Typography>
              </Grid>
              <Grid item container justify="center" alignItems="center">
                <Avatar className={classes.categoryIcon} variant="square" src="images/category/resilience.png"></Avatar>
                <Typography variant="subtitle1" className={clsx(classes.typography, classes.category)}>Resilience</Typography>
              </Grid>
              <Grid item container justify="center" alignItems="center">
                <Avatar className={classes.categoryIcon} variant="square" src="images/category/all.png"></Avatar>
                <Typography variant="subtitle1" className={clsx(classes.typography, classes.category)}>All</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container direction="column" justify="center" className={classes.bottom} id="contact" style={{ paddingTop: appBarHeight }}>
          <Typography variant="h5" className={clsx(classes.typography, classes.bottomGutter)}>
            We can tailor a package for your business!
        </Typography>

          <Typography variant="h5" paragraph className={clsx(classes.typography, classes.bottomGutter)}>
            If you are looking for a way to bring Wellness, Mindset, Productivity and Resilience tips to your team every weekday, get in touch with us to discuss.
        </Typography>

          <Typography variant="h5" className={clsx(classes.typography, classes.contact)}>
            Contact us
        </Typography>
          <Typography variant="subtitle1" className={clsx(classes.typography, classes.contact)}>
            Email: team@5minutesforme.app
        </Typography>

          {/* social */}
          <Grid container justify="center" spacing={1} className={classes.socialWrap} style={{ marginTop: "10vh" }}>
            <Link href="mailto:team@5minutesforme.app">
              <Avatar src="images/social/mail.png" />
            </Link>
            <Link href="https://www.instagram.com/5minutesforme/">
              <Avatar src="images/social/instagram.png" />
            </Link>
            <Link href="https://www.facebook.com/5-Minutes-for-Me-111737820614358">
              <Avatar src="images/social/facebook.png" />
            </Link>
          </Grid>
        </Grid>


      </Box>
    </Container>
  </ThemeProvider>
}

export default withStyles(styles)(Home)
