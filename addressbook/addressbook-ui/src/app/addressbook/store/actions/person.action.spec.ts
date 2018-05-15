import * as fromPerson from './person.action';

describe('Person Actions', () => {
  describe('LoadPerson Actions', () => {

    it('should create an action', () => {

      const personId = 1;
      const action = new fromPerson.LoadPerson(personId);

      expect({...action}).toEqual({type: fromPerson.LOAD_PERSON, id: personId});
    });

    it('LoadPersonFail', () => {

      const error = {message: 'Load Error'};
      const action = new fromPerson.LoadPersonFail(error);

      expect({...action}).toEqual({type: fromPerson.LOAD_PERSON_FAIL, error: error});
    });

    it('LoadPersonSuccess', () => {

      const person = {
        id: 1, version: 0, firstname: 'Felix', lastname: 'Meier', street: 'Effingerstr. 10', zip: '3000', city: 'Bern',
        phone: '+41 31 111 11 11'
      };
      const action = new fromPerson.LoadPersonSuccess(person);

      expect({...action}).toEqual({type: fromPerson.LOAD_PERSON_SUCCESS, person: person});
    });
  });

  describe('ClearSelectedPerson Actions', () => {

    it('should clear the selected person', () => {

      const action = new fromPerson.ClearSelectedPerson();

      expect({...action}).toEqual({type: fromPerson.CLEAR_SELECTED_PERSON});
    });
  });
});
