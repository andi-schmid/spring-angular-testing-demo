import {DebugElement} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {combineReducers, StoreModule} from '@ngrx/store';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonDetailComponent} from './person-detail.component';
import {reducers} from '../../store/reducers';
import {Person} from '../../models/addressbook.model';

let component: PersonDetailComponent;
let fixture: ComponentFixture<PersonDetailComponent>;
let debugElement: DebugElement;
let htmlElement: HTMLElement;
let page: Page;

const person: Person = {
  id: 1,
  version: 0,
  firstname: 'Felix',
  lastname: 'Meier',
  street: 'Effingerstr. 10',
  zip: '3000',
  city: 'Bern',
  phone: '+41 31 111 11 11'
};

describe('PersonDetailComponent', () => {


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatCardModule,

        // Store configuration and initialization
        StoreModule.forRoot({
          addressbook: combineReducers(reducers, {
            personState: {
              person: person,
              loading: false,
              loaded: true
            }
          })
        }),
      ],
      declarations: [PersonDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    createComponent();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('With person data in the ngrx store', () => {

    it('should show the person data', () => {
      expect(page.firstname.textContent).toEqual(person.firstname);
      expect(page.lastname.textContent).toEqual(person.lastname);
      expect(page.street.textContent).toEqual(person.street);
      expect(page.zip.textContent).toEqual(person.zip);
      expect(page.city.textContent).toEqual(person.city);
      expect(page.phone.textContent).toEqual(person.phone);
    });
  });
});


function createComponent(): void {

  fixture = TestBed.createComponent(PersonDetailComponent);
  component = fixture.componentInstance;
  debugElement = fixture.debugElement;
  htmlElement = debugElement.nativeElement;
  page = new Page();

  fixture.detectChanges();

  fixture.whenStable().then(() => {

    page.addPageElements();
    fixture.detectChanges();
  });
}

class Page {

  firstname: HTMLSpanElement;
  lastname: HTMLSpanElement;
  street: HTMLSpanElement;
  zip: HTMLSpanElement;
  city: HTMLSpanElement;
  phone: HTMLSpanElement;

  addPageElements(): void {

    this.firstname = htmlElement.querySelector('#firstname');
    this.lastname = htmlElement.querySelector('#lastname');
    this.street = htmlElement.querySelector('#street');
    this.zip = htmlElement.querySelector('#zip');
    this.city = htmlElement.querySelector('#city');
    this.phone = htmlElement.querySelector('#phone');
  }
}
