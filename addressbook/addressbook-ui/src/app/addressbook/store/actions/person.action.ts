import {Action} from '@ngrx/store';

import {Person} from '../../models/addressbook.model';

export const LOAD_PERSON = '[Addressbook] load person';
export const LOAD_PERSON_SUCCESS = '[Addressbook] load person success';
export const LOAD_PERSON_FAIL = '[Addressbook] load person fail';
export const CLEAR_SELECTED_PERSON = '[Addressbook] clear selected person';


export class LoadPerson implements Action {
  readonly type = LOAD_PERSON;

  constructor(public id: number) {
  }
}

export class LoadPersonSuccess implements Action {
  readonly type = LOAD_PERSON_SUCCESS;

  constructor(public person: Person) {
  }
}

export class LoadPersonFail implements Action {
  readonly type = LOAD_PERSON_FAIL;

  constructor(public error: any) {
  }
}

export class ClearSelectedPerson implements Action {

  readonly type = CLEAR_SELECTED_PERSON;
}

export type PersonAction = LoadPerson | LoadPersonSuccess | LoadPersonFail | ClearSelectedPerson;
