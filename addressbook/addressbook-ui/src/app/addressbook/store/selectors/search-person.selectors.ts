import {createSelector} from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSearchPerson from '../reducers/search-person.reducer';

export const getSearchPersonState = createSelector(
  fromFeature.getAddressBookState,
  (state: fromFeature.AddressBookState) => state.personListState
);

export const getSearchPersonElements = createSelector(
  getSearchPersonState,
  fromSearchPerson.selectAllSearchPersonElements
);
