import * as fromPerson from './person.reducer';
import * as fromActions from '../actions/person.action';


describe('PersonReducer', () => {
  describe('undefined action', () => {

    it('should return the default state', function () {

      const {initialState} = fromPerson;
      const action = {} as any;

      const state = fromPerson.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_PERSON action', () => {

    it('should set loading to true', () => {
      const {initialState} = fromPerson;
      const personId = 1;
      const action = new fromActions.LoadPerson(personId);

      const state = fromPerson.reducer(initialState, action);

      expect(state.loading).toEqual(true);
      expect(state.loaded).toEqual(false);
      expect(state.person).toBeUndefined();
    });
  });

  describe('LOAD_PERSON_SUCCESS action', () => {

    it('should populate the searchPerson result', () => {

      const person = {
        id: 1, version: 0, firstname: 'Felix', lastname: 'Meier', street: 'Effingerstr. 10', zip: '3000', city: 'Bern',
        phone: '+41 31 111 11 11'
      };
      const {initialState} = fromPerson;
      const action = new fromActions.LoadPersonSuccess(person);

      const state = fromPerson.reducer(initialState, action);

      expect(state.loading).toEqual(false);
      expect(state.loaded).toEqual(true);
      expect(state.person).toEqual(person);
    });
  });

  describe('LOAD_PERSON_FAIL action', () => {

    it('should return the initial state', () => {

      const {initialState} = fromPerson;
      const action = new fromActions.LoadPersonFail({});

      const state = fromPerson.reducer(initialState, action);

      expect(state).toEqual(initialState);
    });

    it('should return the previous state', () => {

      const {initialState} = fromPerson;
      const previousState = {...initialState, loading: true};
      const action = new fromActions.LoadPersonFail({});

      const state = fromPerson.reducer(previousState, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('CLEAR_SELECTED_PERSON action', () => {


    it('should return the initial state', () => {

      const {initialState} = fromPerson;
      const previousState = {...initialState, loading: true};
      const action = new fromActions.ClearSelectedPerson();

      const state = fromPerson.reducer(previousState, action);

      expect(state).toEqual(initialState);
    });
  });
});
