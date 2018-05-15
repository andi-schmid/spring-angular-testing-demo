import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

import {AddressbookRoutingModule} from './addressbook-routing.module';
import {AddressbookContentComponent} from './addressbook-content/addressbook-content.component';
import {PersonSearchComponent} from './addressbook-content/person-search/person-search.component';
import {PersonDetailComponent} from './addressbook-content/person-detail/person-detail.component';
import {SearchInputComponent} from './addressbook-content/person-search/search-input/search-input.component';
import {SearchResultComponent} from './addressbook-content/person-search/search-result/search-result.component';
import {reducers} from './store/reducers';
import {effects} from './store/effects';

import * as fromServices from './services';
import * as fromGuards from './guards';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    FlexLayoutModule,
    AddressbookRoutingModule,
    StoreModule.forFeature('addressbook', reducers),
    EffectsModule.forFeature(effects),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [
    AddressbookContentComponent,
    PersonSearchComponent,
    PersonDetailComponent,
    SearchInputComponent,
    SearchResultComponent
  ],
  providers: [
    ...fromServices.services,
    ...fromGuards.guards
  ],
  exports: [
    AddressbookContentComponent
  ]
})
export class AddressbookModule {
}
