


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
    return callable(params).then((res: any) => res.data );
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

class PromoFetcher implements CRUD {
  async read(params: any) {
    const callable = functions.httpsCallable('readPromo')
    return callable(params).then((res: any) => res.data);
  }

  async create(params: any) {
    const callable = functions.httpsCallable('createPromo')
    return callable(params).then((res: any) => res.data);
  }

  async update(params: any) {
    const callable = functions.httpsCallable('updatePromo')
    return callable(params).then((res: any) => res.data);
  }

  async delete(params: any) {
    const callable = functions.httpsCallable('deletePromo')
    return callable(params).then((res: any) => res.data);
  }
}

class CategoryFetcher {
  async category() {
    const callable = functions.httpsCallable('categories')
    return callable().then((res: any) => res.data);
  }

  async subCategory() {
    const callable = functions.httpsCallable('subCategories')
    return callable().then((res: any) => res.data);
  }
}


export const dbClient = {
  PodcastFetcher,
  SpeakerFetcher,
  PromoFetcher,
  CategoryFetcher
}