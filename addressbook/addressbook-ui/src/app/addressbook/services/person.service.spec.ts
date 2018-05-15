import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {PersonService} from './person.service';


describe('PersonService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonService]
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  describe('with searchPerson', () => {

    it('should return a list of persons with firstname=Felix', inject([HttpTestingController, PersonService], (httpMock, personService) => {

      const expectedPersons = [
        {id: 1, firstname: 'Felix', lastname: 'Meier', zip: '3000', city: 'Bern'},
      ];
      personService.searchPerson('Felix', '').subscribe((resultPersons) => {

        expect(resultPersons.length).toBe(1);
        expect(resultPersons[0].id).toBe(1);
        expect(resultPersons[0].firstname).toEqual('Felix');
        expect(resultPersons[0].lastname).toEqual('Meier');
        expect(resultPersons[0].zip).toEqual('3000');
        expect(resultPersons[0].city).toEqual('Bern');
      });

      const req = httpMock.expectOne('/rest/persons?firstname=Felix&lastname=');

      expect(req.request.method).toEqual('GET');
      req.flush(expectedPersons);
    }));

    it('should return a list of persons with lastname=Meier', inject([HttpTestingController, PersonService], (httpMock, personService) => {

      const expectedPersons = [
        {id: 1, firstname: 'Felix', lastname: 'Meier', zip: '3000', city: 'Bern'},
        {id: 2, firstname: 'Stefan', lastname: 'Meier', zip: '3000', city: 'Bern'}
      ];
      personService.searchPerson('', 'Meier').subscribe((resultPersons) => {

        expect(resultPersons.length).toBe(2);

        expect(resultPersons[0]).toEqual(expectedPersons[0]);
        expect(resultPersons[1]).toEqual(expectedPersons[1]);
      });

      const req = httpMock.expectOne('/rest/persons?firstname=&lastname=Meier');

      expect(req.request.method).toEqual('GET');
      req.flush(expectedPersons);
    }));
  });

  describe('with loadPerson', () => {

    it('should load the person details', inject([HttpTestingController, PersonService], (httpMock, personService) => {

      const expectedPerson = {
        id: 1, version: 0, firstname: 'Felix', lastname: 'Meier', street: 'Effingerstr. 10', zip: '3000', city: 'Bern',
        phone: '+41 31 111 11 11'
      };
      personService.loadPerson(expectedPerson.id).subscribe((resultPerson) => {

        expect({...resultPerson}).toEqual({...expectedPerson});
      });

      const req = httpMock.expectOne('/rest/persons/' + expectedPerson.id);

      expect(req.request.method).toEqual('GET');
      req.flush(expectedPerson);
    }));
  });
});
