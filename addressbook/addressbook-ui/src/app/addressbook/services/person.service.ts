import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';

import {Person, SearchPersonResultElement} from '../models/addressbook.model';

@Injectable()
export class PersonService {

  constructor(private http: HttpClient) {
  }

  searchPerson(firstname: string, lastname: string): Observable<SearchPersonResultElement[]> {

    return this.http
      .get<SearchPersonResultElement[]>('/rest/persons', {params: {firstname: firstname, lastname: lastname}})
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  loadPerson(personId: number): Observable<Person> {

    return this.http
      .get<Person>(`/rest/persons/${personId}`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
