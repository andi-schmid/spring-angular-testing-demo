import {combineReducers, Store, StoreModule} from '@ngrx/store';
import {TestBed} from '@angular/core/testing';

import {Person} from '../../models/addressbook.model';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from '../selectors/person.selectors';

describe('Person selectors', () => {

  let store: Store<fromReducers.AddressBookState>;

  const person: Person = {
    id: 1,
    version: 0,
    firstname: 'Felix',
    lastname: 'Meier',
    street: 'Effingerstr. 10',
    zip: '3000',
    city: 'Bern',
    phone: '+41 31 111 11 11'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          addressbook: combineReducers(fromReducers.reducers),
        }),
      ],
    });

    store = TestBed.get(Store);
  });

  describe('getPersonState', () => {

    it('should return the state of a person', () => {

      let result = null;

      store.select(fromSelectors.getPersonState).subscribe(value => result = value);

      expect(result).toEqual({
        person: undefined,
        loading: false,
        loaded: false
      });

      store.dispatch(new fromActions.LoadPersonSuccess(person));

      expect(result).toEqual({
        person: person,
        loading: false,
        loaded: true
      });
    });
  });

  describe('getPerson', () => {

    it('should return a person', () => {

      let result = null;

      store.select(fromSelectors.getPerson).subscribe(value => result = value);

      expect(result).toBeUndefined();

      store.dispatch(new fromActions.LoadPersonSuccess(person));

      expect(result).toEqual(person);
    });
  });

  describe('getPersonLoading', () => {

    it('should return true if a person is beeing loaded', () => {

      let result = null;

      store.select(fromSelectors.getPersonLoading).subscribe(value => result = value);

      expect(result).toBe(false);

      store.dispatch(new fromActions.LoadPerson(1));

      expect(result).toEqual(true);
    });
  });

  describe('getPersonLoaded', () => {

    it('should return true if a person is beeing loaded', () => {

      let result = null;

      store.select(fromSelectors.getPersonLoaded).subscribe(value => result = value);

      expect(result).toBe(false);

      store.dispatch(new fromActions.LoadPersonSuccess(person));

      expect(result).toEqual(true);
    });
  });
});
