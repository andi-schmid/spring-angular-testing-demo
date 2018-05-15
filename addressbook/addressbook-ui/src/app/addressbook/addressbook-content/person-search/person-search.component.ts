import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {SearchPersonCriteria, SearchPersonResultElement} from '../../models/addressbook.model';
import {AddressBookState} from '../../store/reducers';

import * as fromStore from '../../store';

@Component({
  selector: 'adb-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.css']
})
export class PersonSearchComponent implements OnInit {

  personList$: Observable<SearchPersonResultElement[]>;

  constructor(
    private router: Router,
    private store: Store<AddressBookState>) {
  }

  ngOnInit() {
    this.personList$ = this.store.select(fromStore.getSearchPersonElements);
  }

  onSearch(event: SearchPersonCriteria): void {
    this.store.dispatch(new fromStore.ClearSelectedPerson());
    this.store.dispatch(new fromStore.SearchPerson(event.firstname, event.lastname));
  }

  onPersonSelected(personId: number): void {

    this.store.dispatch(new fromStore.ClearSelectedPerson());
    this.router.navigate(['/person', personId]);
  }
}
