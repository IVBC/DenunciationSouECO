import {User} from '../../denunciations-manager/shared/Models/User-model';
import {StateDenunciation} from '../../denunciations-manager/shared/Models/StateDenunciation-model';

export interface Complaint {
  denunciation: {
    id: number,
    code: string,
    anonymous: boolean,
    urban: boolean,
    type: string,
    description: string,
    longitude: string,
    latitude: string,
    reference: string,
    state: string,
    city: string,
    zipcode: string,
    number: string,
    district: string,
    street: string,
    timestamp: string,
    closed_at: string,
    files: {url: string, name: string, path: string, size: number, key: string, id_file: number }[],
    user: User;
  };
  statusDenunciation: {
    details: string,
    closed_at: string,
    createdAt: string,
    state_id: number,
    file: {url: string, name: string, path: string, size: number, key: string, id_file: number },
    stateDenunciation: StateDenunciation;
  };
  historyDenunciation?: {
    details: string;
    closed_at: Date;
    createdAt: Date;
    updatedAt?: Date;
    file: {url: string, name: string, path: string, size: number, key: string, id_file: number };
    state_id: number;
    stateDenunciation: StateDenunciation;
  }[];
}

