


import { functions } from './firebaseClient'

export class CRUD {
  create(params: any): Promise<any> { return Promise.reject() }
  read(params: any): Promise<any> { return Promise.reject() }
  update(params: any): Promise<any> { return Promise.reject() }
  delete(params: any): Promise<any> { return Promise.reject() }
}

class TourFetcher implements CRUD {
  async read(params: any) {
    const callable = functions.httpsCallable('readTour')
    return callable(params).then((res: any) => res.data);
  }

  async create(params: any) {
    const callable = functions.httpsCallable('createTour')
    return callable(params).then((res: any) => res.data);
  }

  async update(params: any) {
    const callable = functions.httpsCallable('updateTour')
    return callable(params).then((res: any) => res.data);
  }

  async delete(params: any) {
    const callable = functions.httpsCallable('deleteTour')
    return callable(params).then((res: any) => res.data);
  }
}

class LocFetcher implements CRUD {
  async read(params: any) {
    const callable = functions.httpsCallable('readLocation')
    return callable(params).then((res: any) => res.data);
  }

  async create(params: any) {
    const callable = functions.httpsCallable('createLocation')
    return callable(params).then((res: any) => res.data);
  }

  async update(params: any) {
    const callable = functions.httpsCallable('updateLocation')
    return callable(params).then((res: any) => res.data);
  }

  async delete(params: any) {
    const callable = functions.httpsCallable('deleteLocation')
    return callable(params).then((res: any) => res.data);
  }
}


class TownFetcher implements CRUD {
  async read(params: any) {
    const callable = functions.httpsCallable('readTown')
    return callable(params).then((res: any) => res.data);
  }

  async create(params: any) {
    const callable = functions.httpsCallable('createTown')
    return callable(params).then((res: any) => res.data);
  }

  async update(params: any) {
    const callable = functions.httpsCallable('updateTown')
    return callable(params).then((res: any) => res.data);
  }

  async delete(params: any) {
    const callable = functions.httpsCallable('deleteTown')
    return callable(params).then((res: any) => res.data);
  }
}


export const dbClient = {
  TourFetcher,
  LocFetcher,
  TownFetcher,
}