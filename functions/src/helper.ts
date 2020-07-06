
// const admin = require('firebase-admin');

class DefaultTransformer {
  static fromDB(dbData: any) {
    return dbData
  }

  static toDB(apiData: any) {
    return apiData
  }
}

export class PodcastTransformer extends DefaultTransformer {
  // static fromDB(dbData: any) {
  //   console.log('222')
  //   console.log(dbData.podcastAvailable)
  //   if (dbData.podcastAvailable && dbData.podcastAvailable instanceof admin.firestore.Timestamp) {
  //     dbData.podcastAvailable = dbData.podcastAvailable.seconds

  //     console.log('333')
  //     console.log(dbData.podcastAvailable)
  //   }

  //   return dbData
  // }

  // static toDB(apiData: any) {
  //   if (apiData.where && apiData.where.lhs === "podcastAvailable") {
  //     let apiPodcastAvailable = apiData.where.rhs
  //     apiData.where.rhs = 
  //   }

  //   if (typeof apiData.where.podcastAvailable === 'number') {
  //     console.log('haha')
  //     console.log(apiData.podcastAvailable)
  //     apiData.podcastAvailable = new admin.firestore.Timestamp(apiData.podcastAvailable, 0)

  //     console.log('hehe')
  //     console.log(apiData.podcastAvailable)
  //   }

  //   return apiData
  // }
}

export class SpeakerTransformer extends DefaultTransformer {
  static fromDB(dbData: any) {
    // if (dbData.locGeo && dbData.locGeo instanceof admin.firestore.GeoPoint) {
    //   dbData.locGeo = dbData.locGeo._latitude + ',' + dbData.locGeo._longitude
    // }

    return dbData
  }

  static toDB(apiData: any) {
    // if (typeof apiData.locGeo === 'string') {
    //   const latlon = apiData.locGeo.split(',')
    //   if (latlon.length === 2) {
    //     const lat = _.toNumber(latlon[0])
    //     const lon = _.toNumber(latlon[1])
    //     apiData.locGeo = new admin.firestore.GeoPoint(lat, lon)
    //   }
    // }

    return apiData
  }
}


// References

// FunctionsErrorCode: "ok" | "cancelled" | "unknown" | "invalid-argument" | "deadline-exceeded" | "not-found" | "already-exists" | "permission-denied" | "resource-exhausted" | "failed-precondition" | "aborted" | "out-of-range" | "unimplemented" | "internal" | "unavailable" | "data-loss" | "unauthenticated"