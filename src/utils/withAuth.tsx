import React, { useState } from 'react'
import _ from "lodash"
import firebase, { functions } from './firebaseClient'
import * as firebaseui from 'firebaseui'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Typography, Container, CircularProgress } from '@material-ui/core';


const uiConfig: firebaseui.auth.Config = {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  },
  signInFlow: 'popup',
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
};

export default function withAuth(AuthComponent: any) {

  return function Authenticated(props: any) {
    const [logged, setLogged] = useState(false)
    const [logErr, setLogErr] = useState("")
    const [authenticated, setAuthenticated] = useState(false)


    firebase.auth().onAuthStateChanged((user) => {
      if (!_.isNil(user) && !authenticated) {
        setAuthenticated(true)
        const callable = functions.httpsCallable('authenticate')
        
        callable()
          .then(() => {
            setLogged(true)
          })
          .catch((e) => {
            firebase.auth().signOut().then(() => user.delete())
            setLogErr("Not Authenticated")
            setLogged(false)
          })
      }
    })
    
    const uiAuth = <Container style={{ marginTop: "15%", textAlign: "center" }}>
      <Typography>{logErr}</Typography>
      {(authenticated && _.isEmpty(logErr)) && <CircularProgress />}
      {_.isEmpty(logErr) && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />}
    </Container>

    const content = !logged ? uiAuth : <AuthComponent {...props} />

    return <>{content}</>

  }
}