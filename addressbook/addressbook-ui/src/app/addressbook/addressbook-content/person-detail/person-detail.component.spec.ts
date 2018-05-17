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
  page = new Page();

  fixture.detectChanges();

  fixture.whenStable().then(() => {

    fixture.detectChanges();
  });
}

class Page {

  get firstname(): HTMLSpanElement {
    return this.query('#firstname');
  }

  get lastname(): HTMLSpanElement {
    return this.query('#lastname');
  }

  get street(): HTMLSpanElement {
    return this.query('#street');
  }

  get zip(): HTMLSpanElement {
    return this.query('#zip');
  }

  get city(): HTMLSpanElement {
    return this.query('#city');
  }

  get phone(): HTMLSpanElement {
    return this.query('#phone');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}
