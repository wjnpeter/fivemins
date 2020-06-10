import _ from "lodash";

export class KeyDictionary {
  [key: string]: any
}

class DefaultView extends KeyDictionary {
  helperText(field: string) {
    return this[field]
  }

  dbKeys() { return _.keys(this) }
}

const HT_URLStorage = "URL to Storage"
const HT_Geo = "latitude, longitude. ie -26.075885, 148.257014"
const HT_Lat = "In DD at 8 decimal precision"
const HT_Lon = "In DD at 8 decimal precision"
const HT_TourName = "refer to tours/tourId/tourName"
const HT_TownName = "refer to towns/townId/townName"
const HT_TownState = "refer to towns/townId/townState"
const HT_State = "3 x Abrev State in Capitals"
 

// [db-keyname : ui-type]
// data-table type: 'boolean' | 'numeric' | 'date' | 'datetime' | 'time' | 'currency'

export class TourView extends DefaultView {
  tourNum = 'numeric'
  tourName = "string"
  tourDesc = "string"
  tourTownName = "string"   // refer to town 
  tourTownState = "string"  // refer to town
  tourUrl = "string"
  tourPic1 = "string"
  tourMode = "boolean"
  tourDrive = "boolean"
  tourRide = "boolean"
  tourWalk = "boolean"

  summaryKeys() { return ["tourName", "tourTownName", "tourTownState"] }

  helperText(field: string) {
    if (field === "tourPic1") return HT_URLStorage
    if (field === "tourTownName") return HT_TownName
    if (field === "tourTownState") return HT_TownState

    return this[field]
  }
}

export class LocView extends DefaultView {

  locNum = "numeric"
  locName = "string"
  locTourNum = "string"
  locTourName = "string"  // refer to tour
  locSub = "string"
  locDesc = "string"
  locGeo = "string"       // GeoPoint
  locLat = "numeric"
  locLon = "numeric"
  locRad = "numeric"
  locTownName = "string"   // refer to town 
  locTownState = "string"  // refer to town
  locPic1 = "string"
  locCat = "string"
  locAudio1 = "string"

  summaryKeys() { return ["locName", "locTownName", "locTownState"] }

  helperText(field: string) {
    if (field === "locTourName") return HT_TourName
    if (field === "locGeo") return HT_Geo
    if (field === "locLat") return HT_Lat
    if (field === "locLon") return HT_Lon
    if (field === "locPic1") return HT_URLStorage
    if (field === "locAudio1") return HT_URLStorage

    return this[field]
  }
}

export class TownView extends DefaultView {
  townName = "string"
  townDesc = "string"
  townUrl = "string"
  townState = "string"
  townPic1 = "string"
  townCouncil = "string"
  townLat = "numeric"
  townLon = "numeric"
  townGeo = "string"    // GeoPoint

  summaryKeys() { return ["townName", "townState"] }

  helperText(field: string) {
    if (field === "townState") return HT_State
    if (field === "townGeo") return HT_Geo
    if (field === "townLat") return HT_Lat
    if (field === "townLon") return HT_Lon
    if (field === "townPic1") return HT_URLStorage

    return this[field]
  }
}


export const readableKey = (k: string): string => {
  return _.words(k).map((w) => _.capitalize(w)).join(' ')
}

export const fieldStyle = {
  minWidth: "43%",
  margin: "0.5rem auto"
}

export interface FieldProps {
  field: string
  onFieldChange: any
  value: any
  helperText: string
}
