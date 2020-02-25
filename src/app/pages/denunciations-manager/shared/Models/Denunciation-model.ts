import {User} from './User-model';

export class Denunciation {
  constructor(
    public  id?: number,
    public code?: string,
    public anonymous ?: boolean,
    public urban?: boolean,
    public type?: string,
    public description?: string,
    public longitude?: string,
    public latitude ?: string,
    public reference?: string,
    public state ?: string,
    public city?: string,
    public zipcode?: string,
    public number?: string,
    public district?: string,
    public street?: string,
    public timestamp?: Date,
    public closed_at?: Date,
    public createdAt?: Date,
    public user?: User,
    public statesDenunciation?: {
      id: number,
      type: string,
      description: string,
      createdAt: Date,
      updatedAt: Date
    }[]
  ) {}
}
