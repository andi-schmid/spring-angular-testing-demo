import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import {SearchPersonResultElement} from '../../models/addressbook.model';

import * as fromSearchPerson from '../actions';

export const entityAdapter: EntityAdapter<SearchPersonResultElement> = createEntityAdapter<SearchPersonResultElement>();

export interface SearchPersonState extends EntityState<SearchPersonResultElement> {

  loaded: boolean;
  loading: boolean;
}

export const initialState: SearchPersonState = entityAdapter.getInitialState({
  loaded: false,
  loading: false
});

export function reducer(
  state = initialState,
  action: fromSearchPerson.SearchPersonAction
): SearchPersonState {
  switch (action.type) {
    case fromSearchPerson.SEARCH_PERSON: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromSearchPerson.SEARCH_PERSON_SUCCESS: {

      const searchPersonResult: SearchPersonResultElement[] = (<fromSearchPerson.SearchPersonSuccess> action).searchResult;

      if (!searchPersonResult || searchPersonResult.length === 0) {
        return {
          ...initialState,
          loaded: true
        };
      }
      return {
        ...entityAdapter.addAll(searchPersonResult, state),
        loading: false,
        loaded: true
      };
    }

    case fromSearchPerson.SEARCH_PERSON_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
  }
  return state;
}

export const getSearchPersonLoading = (state: SearchPersonState) => state.loading;
export const getSearchPersonLoaded = (state: SearchPersonState) => state.loaded;

export const {
  selectIds: selectSearchPersonElemengIds,
  selectEntities: selectSearchPersonEntities,
  selectAll: selectAllSearchPersonElements,
  selectTotal: selectSearchPersonElementTotal,
} = entityAdapter.getSelectors();




