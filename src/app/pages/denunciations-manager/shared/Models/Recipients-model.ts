export interface Recipient {
    id?: number;
    name?: string;
    email?: string;
    denunciation_type?: string;
    country?: string;
    state?: string;
    city?: string;
    include_primary?: boolean;
  }
  


  export interface Primary {
    id?: number;
    name?: string;
    email?: string;
    denunciation_type?: string;
    country?: string;
    state?: string;
    city?: string;
    include_primary?: boolean;
    is_primary?: boolean;
    updatedAt?: string;
    createdAt?: string;
  }
  