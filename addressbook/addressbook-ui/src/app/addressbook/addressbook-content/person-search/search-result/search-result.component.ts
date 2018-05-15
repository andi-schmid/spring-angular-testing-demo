import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

import {SearchPersonResultElement} from '../../../models/addressbook.model';

@Component({
  selector: 'adb-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {


  @Output() personSelected = new EventEmitter<number>();

  dataSource = new MatTableDataSource<SearchPersonResultElement>();
  selection = new SelectionModel<SearchPersonResultElement>(false, []);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['firstname', 'lastname', 'zip', 'city'];

  get personList(): SearchPersonResultElement[] {
    return this.dataSource.data;
  }

  @Input()
  set personList(personList: SearchPersonResultElement[]) {
    this.dataSource.data = personList;
  }

  openDetails(event: MouseEvent, row: SearchPersonResultElement): void {

    this.selection.select(row);

    const selected = event.toElement.parentElement.parentElement.querySelector('.selected');

    if (selected) {
      selected.classList.remove('selected');
    }
    event.toElement.parentElement.classList.add('selected');

    this.personSelected.emit(row.id);
  }
}
