import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';

import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

import * as fromStore from '../store/index';

@Injectable()
export class PersonExistsGuards implements CanActivate {
  constructor(private store: Store<fromStore.AddressBookState>) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {

    return this.checkStore(route).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(route: ActivatedRouteSnapshot): Observable<boolean> {

    return this.store.select(fromStore.getPersonLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          const personId = parseInt(route.params.personId, 10);
          this.store.dispatch(new fromStore.LoadPerson(personId));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
