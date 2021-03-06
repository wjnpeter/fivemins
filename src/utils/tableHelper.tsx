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

// [db-keyname : ui-type]
// keep to use data-table type to give flexibility to move to summary key
// data-table type: 'boolean' | 'numeric' | 'date' | 'datetime' | 'time' | 'currency'

export class PodcastView extends DefaultView {
  podcastName = "string"
  podcastCategory = "string"     // select
  podcastSubcategory = "string"  // select
  podcastAvailable = "numeric"      
  podcastFile = "string"        // upload file
  podcastDesc = "string"
  podcastSpeakerName = "string"      // select, refer to speaker collection
  podcastTrial = "boolean"      // select, refer to speaker collection
  
  summaryKeys() { return ["podcastName", "podcastCategory", "podcastSubcategory"] }

  helperText(field: string) {
    
    return this[field]
  }
}

export class SpeakerView extends DefaultView {
  speakerName = "string"
  speakerAvatar = "string"     // select
  speakerLink = "string" 
  
  summaryKeys() { return ["speakerName"] }

  helperText(field: string) {
    return this[field]
  }
}

export class PromoView extends DefaultView {
  promoCode = "string"
  promoUsed = "numeric"
  promoMax = "numeric" 
  
  summaryKeys() { return ["promoCode", "promoUsed", "promoMax"] }

  helperText(field: string) {
    return this[field]
  }
}

export const readableKey = (k: string): string => {
  return _.words(k).map((w) => _.capitalize(w)).join(' ')
}

export const fieldStyle = {
  minWidth: "60%",
  margin: "0.5rem auto"
}

export interface FieldProps {
  field: string
  onFieldChange: any
  value: any
  helperText: string
}
