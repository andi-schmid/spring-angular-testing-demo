export interface SearchPersonCriteria {

  firstname?: string;
  lastname?: string;
}

export interface SearchPersonResultElement {

  id: number;
  firstname: string;
  lastname: string;
  zip: string;
  city: string;
}

export interface Person {

  id: number;
  version: number;
  firstname: string;
  lastname: string;
  street: string;
  zip: string;
  city: string;
  phone: string;
}
