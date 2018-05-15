import {Actions} from '@ngrx/effects';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EMPTY, Observable, of} from 'rxjs';

import {PersonService} from '../../services';
import {Person} from '../../models/addressbook.model';

import * as fromEffects from './person.effect';
import * as fromActions from '../actions/person.action';
import {cold, hot} from 'jasmine-marbles';


export class TestActions extends Actions {
  constructor() {
    super(EMPTY);
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('PersonEffects', () => {

  let actions$: TestActions;
  let service: PersonService;
  let effects: fromEffects.PersonEffects;

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
      imports: [HttpClientTestingModule],
      providers: [
        PersonService,
        fromEffects.PersonEffects,
        {provide: Actions, useFactory: getActions},
      ],
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(PersonService);
    effects = TestBed.get(fromEffects.PersonEffects);

    spyOn(service, 'loadPerson').and.returnValue(of(person));
  });

  describe('loadPerson$', () => {

    it('should return a person from LoadPersonSuccess', () => {

      const action = new fromActions.LoadPerson(person.id);
      const completion = new fromActions.LoadPersonSuccess(person);

      actions$.stream = hot('-a', {a: action});
      const expected = cold('-b', {b: completion});

      expect(effects.loadPerson$).toBeObservable(expected);
    });
  });
});
