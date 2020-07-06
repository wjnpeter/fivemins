import { PodcastTransformer, SpeakerTransformer } from "./helper";

const _ = require('lodash')

const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

const userRef = db.collection('user');
const podcastRef = db.collection('podcast');
const speakerRef = db.collection('speaker');
const promoRef = db.collection('promo');
const subRef = db.collection('subscription');
const adminRef = db.collection('admin');


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


  return adminRef.where('email', '==', loggedInEmail)
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

  if (dbData && 'where' in dbData && Array.isArray(dbData.where)) {
    dbData.where.forEach((filter: any) => {
      const lhs = filter.lhs
      const op = filter.op
      const rhs = filter.rhs

      if (!_.isNil(lhs) && !_.isNil(op) && !_.isNil(rhs)) {
        filteredRef = filteredRef.where(lhs, op, rhs)
      }
    })

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

// Auth

exports.authenticate = functions.https.onCall((apiData: any, context: any) => {
  return isAdmin(context);
});

// Podcast

exports.readPodcast = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  if (apiData) {
    dbData.data = PodcastTransformer.toDB(apiData.data)
  }
  return performGet(podcastRef, dbData, context)
    .then((docs: any) => docs.map((doc: any) => {
      return {
        id: doc.id,
        data: PodcastTransformer.fromDB(doc.data)
      }
    }));
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

// Subscription

exports.readSubscription = functions.https.onCall((apiData: any, context: any) => {
  return performGet(subRef, apiData, context)
})

// User

/** 
 * apiData: {
 * idToken: 
 * data: match db keys,
 * ...other options
 * }
*/


exports.createUser = functions.https.onCall((apiData: any, context: any) => {
  checkAuth(context)

  const dbData = apiData
  dbData.data = apiData.data
  dbData.data.uid = context.auth.uid

  return userRef.add(dbData.data)
    .then((doc: any) => doc.id);
})

exports.readAUser = functions.https.onCall((apiData: any, context: any) => {
  checkAuth(context)

  const uid = context.auth.uid

  return userRef.where('uid', '==', uid).get()
    .then((snap: any) => {
      let foundUserData: any = null
      snap.forEach((user: any) => {
        if (_.isNull(foundUserData)) foundUserData = user.data()
      })

      return foundUserData
    })
});

exports.updateUser = functions.https.onCall((apiData: any, context: any) => {
  checkAuth(context)

  const uid = context.auth.uid

  return userRef.where('uid', '==', uid).get()
    .then((snap: any) => {
      let foundUserId: any = null
      snap.forEach((user: any) => {
        if (_.isNull(foundUserId)) foundUserId = user.id
      })

      return foundUserId
    })
    .then((foundUserId: any) => {
      const dbData = {
        id: foundUserId,
        data: apiData.data
      }

      return userRef.doc(dbData.id).update({ ...dbData.data })
        .then((res: any) => res.writeTime.toDate());
    })
});

// Promo

// Promo - DB Portal

exports.readPromo = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  return performGet(promoRef, dbData, context)
    .then((docs: any) => docs.map((doc: any) => {
      return {
        id: doc.id,
        data: doc.data
      }
    }));
});

exports.createPromo = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  dbData.data = apiData.data
  return performAdd(promoRef, dbData, context)
});

exports.updatePromo = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  dbData.data = apiData.data
  return performUpdate(promoRef, dbData, context)
});

exports.deletePromo = functions.https.onCall((apiData: any, context: any) => {
  const dbData = apiData
  return performDelete(promoRef, dbData, context)
});

// Promo - Client

exports.verifyPromo = functions.https.onCall((apiData: any, context: any) => {
  checkAuth(context)

  if (!apiData && !apiData.promoCode) {
    throw new functions.https.HttpsError('invalid-argument', 'miss promo code');
  }

  return _verifyPromoCode(apiData.promoCode)
    .then((res: any) => {
      return { status: !_.isNil(res) ? 0 : 1 }
    })
})

exports.applyPromo = functions.https.onCall((apiData: any, context: any) => {
  checkAuth(context)

  if (!apiData && !apiData.promoCode) {
    throw new functions.https.HttpsError('invalid-argument', 'miss promo code');
  }

  return _verifyPromoCode(apiData.promoCode)
    .then((promo: any) => {
      if (!promo) return null

      const dbData = {
        id: promo.id,
        data: { promoUsed: _.toNumber(promo.data().promoUsed) + 1 }
      }

      return promoRef.doc(dbData.id).update({ ...dbData.data })
        .then((res: any) => res.writeTime.toDate());
    })
    .then((res: any) => {
      return { status: !_.isNil(res) ? 0 : 1 }
    })
})

function _verifyPromoCode(code: string) {

  return promoRef.where('promoCode', '==', code)
    .get()
    .then((snap: any) => snap.empty ? null : snap.docs[0])
    .then((promo: any) => {

      if (!promo) return null

      const promoData = promo.data()

      if (promoData.promoCode !== code) {
        return null
      }

      if (promoData.promoUsed >= promoData.promoMax) {
        return null
      }

      return promo
    })
}

// category

exports.categories = functions.https.onCall((apiData: any, context: any) => {
  return ["5 minutes"]
})

exports.subCategories = functions.https.onCall((apiData: any, context: any) => {
  return ["wellness", "mindset", "resilience", "productivity"]
})