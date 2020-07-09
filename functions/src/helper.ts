
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
  
}

export class SpeakerTransformer extends DefaultTransformer {
  
}


// References

// FunctionsErrorCode: "ok" | "cancelled" | "unknown" | "invalid-argument" | "deadline-exceeded" | "not-found" | "already-exists" | "permission-denied" | "resource-exhausted" | "failed-precondition" | "aborted" | "out-of-range" | "unimplemented" | "internal" | "unavailable" | "data-loss" | "unauthenticated"