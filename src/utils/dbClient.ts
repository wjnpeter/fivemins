


import { functions } from './firebaseClient'

export class CRUD {
  create(params: any): Promise<any> { return Promise.reject() }
  read(params: any): Promise<any> { return Promise.reject() }
  update(params: any): Promise<any> { return Promise.reject() }
  delete(params: any): Promise<any> { return Promise.reject() }
}

class PodcastFetcher implements CRUD {
  async read(params: any) {
    const callable = functions.httpsCallable('readPodcast')
    return callable(params).then((res: any) => res.data);
  }

  async create(params: any) {
    const callable = functions.httpsCallable('createPodcast')
    return callable(params).then((res: any) => res.data);
  }

  async update(params: any) {
    const callable = functions.httpsCallable('updatePodcast')
    return callable(params).then((res: any) => res.data);
  }

  async delete(params: any) {
    const callable = functions.httpsCallable('deletePodcast')
    return callable(params).then((res: any) => res.data);
  }
}

class SpeakerFetcher implements CRUD {
  async read(params: any) {
    const callable = functions.httpsCallable('readSpeaker')
    return callable(params).then((res: any) => res.data);
  }

  async create(params: any) {
    const callable = functions.httpsCallable('createSpeaker')
    return callable(params).then((res: any) => res.data);
  }

  async update(params: any) {
    const callable = functions.httpsCallable('updateSpeaker')
    return callable(params).then((res: any) => res.data);
  }

  async delete(params: any) {
    const callable = functions.httpsCallable('deleteSpeaker')
    return callable(params).then((res: any) => res.data);
  }
}




export const dbClient = {
  PodcastFetcher,
  SpeakerFetcher,
}