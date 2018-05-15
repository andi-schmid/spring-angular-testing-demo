import {Component, DebugElement} from '@angular/core';
import {CommonModule} from '@angular/common';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import {newEvent} from '../../../../../testing';

import {SearchInputComponent} from './search-input.component';
import {SearchPersonCriteria} from '../../../models/addressbook.model';

let component: TestSearchInputHostComponent;
let fixture: ComponentFixture<TestSearchInputHostComponent>;
let debugElement: DebugElement;
let htmlElement: HTMLElement;
let page: Page;

describe('SearchInputComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      imports: [
        CommonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatExpansionModule,
      ],
      declarations: [
        SearchInputComponent,
        TestSearchInputHostComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    createComponent();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the search button if the input is empty', async(() => {

    page.firstname.value = '';
    page.lastname.value = '';

    page.firstname.dispatchEvent(newEvent('input'));
    page.lastname.dispatchEvent(newEvent('input'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(page.searchBtn.disabled).toBe(true);
    });

  }));

  it('should submit the firstname', async(() => {

    const firstname = 'Felix';

    page.firstname.value = firstname;
    page.firstname.dispatchEvent(newEvent('input'));

    fixture.detectChanges();
    page.searchBtn.click();

    fixture.whenStable().then(() => {

      expect(component.submittedSearchCriteria).toBeTruthy();
      expect(component.submittedSearchCriteria.firstname).toBe(firstname);
      expect(component.submittedSearchCriteria.lastname).toBeFalsy();
    });
  }));

  it('should submit the lastname', async(() => {

    const lastname = 'Meier';

    page.lastname.value = lastname;
    page.lastname.dispatchEvent(newEvent('input'));

    fixture.detectChanges();
    page.searchBtn.click();

    fixture.whenStable().then(() => {

      expect(component.submittedSearchCriteria).toBeTruthy();
      expect(component.submittedSearchCriteria.firstname).toBeFalsy();
      expect(component.submittedSearchCriteria.lastname).toBe(lastname);
    });
  }));

  it('should submit the firstname and lastname', async(() => {

    const firstname = 'Felix';
    const lastname = 'Meier';

    page.firstname.value = firstname;
    page.lastname.value = lastname;
    page.firstname.dispatchEvent(newEvent('input'));
    page.lastname.dispatchEvent(newEvent('input'));

    fixture.detectChanges();
    page.searchBtn.click();

    fixture.whenStable().then(() => {

      expect(component.submittedSearchCriteria).toBeTruthy();
      expect(component.submittedSearchCriteria.firstname).toBe(firstname);
      expect(component.submittedSearchCriteria.lastname).toBe(lastname);
    });
  }));

  it('should clear the firstname', async(() => {

    const firstname = 'Felix';
    const lastname = 'Meier';

    page.firstname.value = firstname;
    page.lastname.value = lastname;
    page.firstname.dispatchEvent(newEvent('input'));
    page.lastname.dispatchEvent(newEvent('input'));

    fixture.detectChanges();
    page.addClearButtons();
    page.firstnameClearBtn.click();

    fixture.detectChanges();
    page.searchBtn.click();

    fixture.whenStable().then(() => {

      expect(component.submittedSearchCriteria).toBeTruthy();
      expect(component.submittedSearchCriteria.firstname).toBeFalsy();
    });
  }));

  it('should clear the lastname', async(() => {

    const firstname = 'Felix';
    const lastname = 'Meier';

    page.firstname.value = firstname;
    page.lastname.value = lastname;
    page.firstname.dispatchEvent(newEvent('input'));
    page.lastname.dispatchEvent(newEvent('input'));

    fixture.detectChanges();
    page.addClearButtons();
    page.lastnameClearBtn.click();

    fixture.detectChanges();
    page.searchBtn.click();

    fixture.whenStable().then(() => {

      expect(component.submittedSearchCriteria).toBeTruthy();
      expect(component.submittedSearchCriteria.lastname).toBeFalsy();
    });
  }));
});

function createComponent(): void {

  fixture = TestBed.createComponent(TestSearchInputHostComponent);
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

  firstname: HTMLInputElement;
  firstnameClearBtn: HTMLButtonElement;
  lastname: HTMLInputElement;
  lastnameClearBtn: HTMLButtonElement;
  searchBtn: HTMLButtonElement;

  addPageElements(): void {

    this.firstname = htmlElement.querySelector('#firstname');
    this.lastname = htmlElement.querySelector('#lastname');
    this.searchBtn = htmlElement.querySelector('#searchBtn');

    this.addClearButtons();
  }

  addClearButtons(): void {
    this.firstnameClearBtn = htmlElement.querySelector('#firstnameClearBtn');
    this.lastnameClearBtn = htmlElement.querySelector('#lastnameClearBtn');
  }
}

@Component({
  template: `
    <adb-search-input
      (doSearch)="onSearch($event)">
    </adb-search-input>
  `
})
class TestSearchInputHostComponent {

  submittedSearchCriteria: SearchPersonCriteria;

  onSearch(event: SearchPersonCriteria): void {
    this.submittedSearchCriteria = event;
  }
}
