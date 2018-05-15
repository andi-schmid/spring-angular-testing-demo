import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonSearchComponent} from './addressbook-content/person-search/person-search.component';
import {PersonDetailComponent} from './addressbook-content/person-detail/person-detail.component';
import {PersonExistsGuards} from './guards';

const routes: Routes = [
  {
    path: 'person',
    children: [
      {
        path: '',
        component: PersonSearchComponent
      },
      {
        path: ':personId',
        canActivate: [PersonExistsGuards],
        component: PersonDetailComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressbookRoutingModule {
}
