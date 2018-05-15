import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';

import {SearchPersonResultElement} from '../../models/addressbook.model';

import * as fromSearchPerson from './search-person.reducer';
import * as fromActions from '../actions/search-person.action';

export const entityAdapter: EntityAdapter<SearchPersonResultElement> = createEntityAdapter<SearchPersonResultElement>();

describe('SearchPerson Reducer', () => {
  describe('undefined action', () => {

    it('should return the default state', function () {

      const {initialState} = fromSearchPerson;
      const action = {} as any;

      const state = fromSearchPerson.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('SEARCH_PERSON action', () => {

    it('should set loading to true', () => {
      const {initialState} = fromSearchPerson;
      const firstname = 'Felix';
      const lastname = 'Meier';
      const action = new fromActions.SearchPerson(firstname, lastname);

      const state = fromSearchPerson.reducer(initialState, action);

      expect(state.loading).toEqual(true);
      expect(state.loaded).toEqual(false);
      expect(state.entities).toEqual(fromSearchPerson.initialState.entities);
    });
  });

  describe('SEARCH_PERSON_SUCCESS action', () => {

    it('should populate the searchPerson result', () => {

      const {initialState} = fromSearchPerson;
      const person = {id: 1, firstname: 'Felix', lastname: 'Meier', zip: '3000', city: 'Bern'};
      const personEntites = entityAdapter.addOne(person, {...initialState}).entities;
      const action = new fromActions.SearchPersonSuccess([person]);

      const state = fromSearchPerson.reducer(initialState, action);

      expect(state.loading).toEqual(false);
      expect(state.loaded).toEqual(true);
      expect(state.entities).toEqual(personEntites);
    });
  });

  describe('SEARCH_PERSON_FAIL action', () => {

    it('should return the initial state', () => {

      const {initialState} = fromSearchPerson;
      const action = new fromActions.SearchPersonFail({});

      const state = fromSearchPerson.reducer(initialState, action);

      expect(state).toEqual(initialState);
    });

    it('should return the previous state', () => {

      const {initialState} = fromSearchPerson;
      const previousState = {...initialState, loading: true};
      const action = new fromActions.SearchPersonFail({});

      const state = fromSearchPerson.reducer(previousState, action);

      expect(state).toEqual(initialState);
    });
  });
});
