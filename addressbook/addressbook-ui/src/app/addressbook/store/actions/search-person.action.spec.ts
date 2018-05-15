import * as fromSearchPerson from './search-person.action';

describe('SearchPerson Actions', () => {
  describe('LoadPerson Actions', () => {

    it('should create an action', () => {

      const firstname = 'Felix';
      const lastname = 'Meier';
      const action = new fromSearchPerson.SearchPerson(firstname, lastname);

      expect({...action})
        .toEqual({type: fromSearchPerson.SEARCH_PERSON, firstname: firstname, lastname: lastname});
    });

    it('SearchPersonFail', () => {

      const error = {message: 'Load Error'};
      const action = new fromSearchPerson.SearchPersonFail(error);

      expect({...action}).toEqual({type: fromSearchPerson.SEARCH_PERSON_FAIL, error: error});
    });

    it('SearchPersonSuccess', () => {

      const person = {id: 1, firstname: 'Felix', lastname: 'Meier', zip: '3000', city: 'Bern'};
      const action = new fromSearchPerson.SearchPersonSuccess([person]);

      expect({...action}).toEqual({type: fromSearchPerson.SEARCH_PERSON_SUCCESS, searchResult: [person]});
    });
  });
});
