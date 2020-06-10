import { TourTransformer, LocTransformer, TownTransformer } from "./helper";

const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

const toursRef = db.collection('tours');
const locationsRef = db.collection('locations');
const townsRef = db.collection('towns');

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

// Tour

exports.readTour = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  return performGet(toursRef, dbData, context)
});

exports.createTour = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  dbData.data = TourTransformer.toDB(apiData.data)
  return performAdd(toursRef, dbData, context)
});

exports.updateTour = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  dbData.data = TourTransformer.toDB(apiData.data)
  return performUpdate(toursRef, dbData, context)
});

exports.deleteTour = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  return performDelete(toursRef, dbData, context)
});

// Location

exports.readLocation = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  return performGet(locationsRef, dbData, context)
    .then((docs: any) => docs.map((doc: any) => {
      return {
        id: doc.id,
        data: LocTransformer.fromDB(doc.data)
      }
    }));
});

exports.createLocation = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  dbData.data = LocTransformer.toDB(apiData.data)
  return performAdd(locationsRef, dbData, context)
});

exports.updateLocation = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  dbData.data = LocTransformer.toDB(apiData.data)
  return performUpdate(locationsRef, dbData, context)
});

exports.deleteLocation = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  return performDelete(locationsRef, dbData, context)
});

// Town

exports.readTown = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  return performGet(townsRef, dbData, context)
    .then((docs: any) => docs.map((doc: any) => {
      return {
        id: doc.id,
        data: TownTransformer.fromDB(doc.data)
      }
    }));
});

exports.createTown = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  dbData.data = TownTransformer.toDB(apiData.data)
  return performAdd(townsRef, dbData, context)
});

exports.updateTown = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  dbData.data = TownTransformer.toDB(apiData.data)
  return performUpdate(townsRef, dbData, context)
});

exports.deleteTown = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  return performDelete(townsRef, dbData, context)
});

// Auth

exports.authenticate = functions.https.onCall((apiData: any, context: any) => {
  return isAdmin(context);
});