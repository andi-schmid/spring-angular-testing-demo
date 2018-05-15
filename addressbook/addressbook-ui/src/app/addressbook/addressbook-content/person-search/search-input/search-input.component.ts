import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchPersonCriteria} from '../../../models/addressbook.model';

@Component({
  selector: 'adb-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {

  searchForm: FormGroup;

  @Output() doSearch = new EventEmitter<SearchPersonCriteria>();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.searchForm = this.formBuilder.group({
      firstname: '',
      lastname: ''
    });
  }


  search(): void {
    if (this.searchForm.value.firstname || this.searchForm.value.lastname) {
      this.doSearch.emit({...this.searchForm.value});
    }
  }
}
