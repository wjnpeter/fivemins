const admin = require('firebase-admin');
const _ = require('lodash');

class DefaultTransformer {
  static fromDB(dbData: any) {
    return dbData
  }

  static toDB(apiData: any) {
    return apiData
  }
}

export class TourTransformer extends DefaultTransformer {

}

export class LocTransformer extends DefaultTransformer {
  static fromDB(dbData: any) {
    if (dbData.locGeo && dbData.locGeo instanceof admin.firestore.GeoPoint) {
      dbData.locGeo = dbData.locGeo._latitude + ',' + dbData.locGeo._longitude
    }

    return dbData
  }

  static toDB(apiData: any) {
    if (typeof apiData.locGeo === 'string') {
      const latlon = apiData.locGeo.split(',')
      if (latlon.length === 2) {
        const lat = _.toNumber(latlon[0])
        const lon = _.toNumber(latlon[1])
        apiData.locGeo = new admin.firestore.GeoPoint(lat, lon)
      }
    }

    return apiData
  }
}

export class TownTransformer extends DefaultTransformer {
  static fromDB(dbData: any) {
    if (dbData.townGeo && dbData.townGeo instanceof admin.firestore.GeoPoint) {
      dbData.townGeo = dbData.townGeo._latitude + ',' + dbData.townGeo._longitude
    }

    return dbData
  }

  static toDB(apiData: any) {
    if (typeof apiData.townGeo === 'string') {
      const latlon = apiData.townGeo.split(',')
      if (latlon.length === 2) {
        const lat = _.toNumber(latlon[0])
        const lon = _.toNumber(latlon[1])
        apiData.townGeo = new admin.firestore.GeoPoint(lat, lon)
      }
    }

    return apiData
  }
}