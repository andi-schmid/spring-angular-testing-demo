import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Store} from '@ngrx/store';

import {Person} from '../../models/addressbook.model';

import * as fromStore from '../../store';

@Component({
  selector: 'adb-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  person$: Observable<Person>;

  constructor(private store: Store<fromStore.AddressBookState>) {
  }


  ngOnInit() {

    this.person$ = this.store.select(fromStore.getPerson);
  }
}
