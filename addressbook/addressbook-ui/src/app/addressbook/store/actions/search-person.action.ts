import {Action} from '@ngrx/store';
import {SearchPersonResultElement} from '../../models/addressbook.model';

export const SEARCH_PERSON = '[Addressbook] search person';
export const SEARCH_PERSON_SUCCESS = '[Addressbook] search person success';
export const SEARCH_PERSON_FAIL = '[Addressbook] search person fail';

export class SearchPerson implements Action {
  readonly type = SEARCH_PERSON;

  constructor(public firstname: string, public lastname: string) {
  }
}

export class SearchPersonSuccess implements Action {
  readonly type = SEARCH_PERSON_SUCCESS;

  constructor(public searchResult: SearchPersonResultElement[]) {
  }
}

export class SearchPersonFail implements Action {
  readonly type = SEARCH_PERSON_FAIL;

  constructor(public error: any) {
  }
}

export type SearchPersonAction = SearchPerson | SearchPersonSuccess | SearchPersonFail;
