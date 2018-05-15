import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import * as fromServices from '../../services';
import * as searchPersonActions from '../actions';

@Injectable()
export class SearchPersonEffects {

  @Effect()
  searchPerson$ = this.actions$.ofType(searchPersonActions.SEARCH_PERSON).pipe(
    switchMap((action: searchPersonActions.SearchPerson) => {

      return this.personService.searchPerson(action.firstname, action.lastname).pipe(
        map(result => new searchPersonActions.SearchPersonSuccess(result)),
        catchError(error => of(new searchPersonActions.SearchPersonFail(error)))
      );
    }));

  constructor(
    private actions$: Actions,
    private personService: fromServices.PersonService
  ) {
  }
}
