import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import * as fromServices from '../../services';
import * as personActions from '../actions';

@Injectable()
export class PersonEffects {

  @Effect()
  loadPerson$ = this.actions$.ofType(personActions.LOAD_PERSON).pipe(
    switchMap((action: personActions.LoadPerson) => {

      return this.personService.loadPerson(action.id).pipe(
        map(person => new personActions.LoadPersonSuccess(person)),
        catchError(error => of(new personActions.LoadPersonFail(error)))
      );
    }));

  constructor(
    private actions$: Actions,
    private personService: fromServices.PersonService
  ) {
  }
}
