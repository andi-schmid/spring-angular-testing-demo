import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

import * as fromSearchPerson from './search-person.reducer';
import * as fromPerson from './person.reducer';

export interface AddressBookState {
  personListState: fromSearchPerson.SearchPersonState;
  personState: fromPerson.PersonState;
}

export const reducers: ActionReducerMap<AddressBookState> = {
  personListState: fromSearchPerson.reducer,
  personState: fromPerson.reducer
};

export const getAddressBookState = createFeatureSelector<AddressBookState>('addressbook');
