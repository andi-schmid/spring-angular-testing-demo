import {createSelector} from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromPerson from '../reducers/person.reducer';

export const getPersonState = createSelector(
  fromFeature.getAddressBookState,
  (state: fromFeature.AddressBookState) => state.personState
);

export const getPerson = createSelector(
  getPersonState,
  fromPerson.getPerson
);

export const getPersonLoading = createSelector(
  getPersonState,
  fromPerson.getPersonLoading
);

export const getPersonLoaded = createSelector(
  getPersonState,
  fromPerson.getPersonLoaded
);


