import { PodcastTransformer, SpeakerTransformer } from "./helper";

const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

const podcastRef = db.collection('podcast');
const speakerRef = db.collection('speaker');

const checkAuth = (context: any) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('failed-precondition', 'not authenticated.');
  }
};

const isAdmin = (context: any) => {
  checkAuth(context)

  const loggedInEmail = context.auth.token.email
  if (!loggedInEmail) {
    throw new functions.https.HttpsError('failed-precondition', 'not authenticated.');
  }


  return db.collection('admins').where('email', '==', loggedInEmail)
    .get()
    .then((snap: any) => {
      if (snap.empty) {
        throw new functions.https.HttpsError('failed-precondition', 'not authenticated.');
      }

      return true
    })
}

/** 
 * dbData: {
 * id: doc.id
 * data: match db keys,
 * ...other options
 * }
*/

function performGet(collectionRef: any, dbData: any, context: any) {
  checkAuth(context);

  let filteredRef = collectionRef
  if (dbData && 'select' in dbData) {
    filteredRef = filteredRef.select(dbData.select)
  }

  return filteredRef.get()
    .then((snap: any) => {
      const ret: any[] = []
      snap.forEach((doc: any) => {
        ret.push({
          id: doc.id,
          data: { ...doc.data() }
        })
      })

      return ret
    });
}

function performAdd(collectionRef: any, dbData: any, context: any) {
  return isAdmin(context)
    .then(() => collectionRef.add(dbData.data))
    .then((doc: any) => doc.id);

}

function performUpdate(collectionRef: any, dbData: any, context: any) {

  return isAdmin(context)
    .then(() => collectionRef.doc(dbData.id).update({ ...dbData.data }))
    .then((res: any) => res.writeTime.toDate());
}

function performDelete(collectionRef: any, dbData: any, context: any) {
  return isAdmin(context)
    .then(() => collectionRef.doc(dbData.id).delete())
    .then((res: any) => res.writeTime.toDate());
}

// Podcast

exports.readPodcast = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  return performGet(podcastRef, dbData, context)
});

exports.createPodcast = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  dbData.data = PodcastTransformer.toDB(apiData.data)
  return performAdd(podcastRef, dbData, context)
});

exports.updatePodcast = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  dbData.data = PodcastTransformer.toDB(apiData.data)
  return performUpdate(podcastRef, dbData, context)
});

exports.deletePodcast = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  return performDelete(podcastRef, dbData, context)
});

// Speaker

exports.readSpeaker = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  return performGet(speakerRef, dbData, context)
    .then((docs: any) => docs.map((doc: any) => {
      return {
        id: doc.id,
        data: SpeakerTransformer.fromDB(doc.data)
      }
    }));
});

exports.createSpeaker = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  dbData.data = SpeakerTransformer.toDB(apiData.data)
  return performAdd(speakerRef, dbData, context)
});

exports.updateSpeaker = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  dbData.data = SpeakerTransformer.toDB(apiData.data)
  return performUpdate(speakerRef, dbData, context)
});

exports.deleteSpeaker = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  return performDelete(speakerRef, dbData, context)
});

// Auth

exports.authenticate = functions.https.onCall((apiData: any, context: any) => {
  return isAdmin(context);
});