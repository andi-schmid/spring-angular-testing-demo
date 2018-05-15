import {Person} from '../../models/addressbook.model';

import * as fromPerson from '../actions';

export interface PersonState {

  person: Person;
  loaded: boolean;
  loading: boolean;
}

export const initialState: PersonState = {

  person: undefined,
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromPerson.PersonAction
): PersonState {
  switch (action.type) {
    case fromPerson.LOAD_PERSON: {
      return {
        ...state,
        loading: true,
      };
    }
    case fromPerson.LOAD_PERSON_SUCCESS: {

      return {
        person: action.person,
        loading: false,
        loaded: true
      };
    }
    case fromPerson.LOAD_PERSON_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
    case fromPerson.CLEAR_SELECTED_PERSON: {
      return {
        ...initialState
      };
    }
  }
  return state;
}

export const getPerson = (state: PersonState) => state.person;
export const getPersonLoading = (state: PersonState) => state.loading;
export const getPersonLoaded = (state: PersonState) => state.loaded;




