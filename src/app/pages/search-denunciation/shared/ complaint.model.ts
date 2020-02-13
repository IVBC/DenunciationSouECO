export interface complaint{
  denunciation: {
    id: number,
    code: string,
    anonymous: boolean,
    urban: boolean,
    type: string,
    description: string,
    longitude: string,
    latitude: string,
    reference:string,
    state: string,
    city: string,
    zipcode: string,
    number: string,
    district: string,
    street: string,
    timestamp: string,
    closed_at: string,
    files: object[],
    user: object
  },
  statusDenunciation: {
    id: number,
    details: string,
    closed_at: string,
    createdAt: string,
    state_id: number,
    file: string
  }
}

