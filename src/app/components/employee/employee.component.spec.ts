import {async, TestBed} from '@angular/core/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

import {EmployeeComponent} from './employee.component';

@Component({selector: 'app-mat-card', template: ''})
class CardComponent {
}

@Component({selector: 'app-mat-card-header', template: ''})
class CardHeaderComponent {
}

@Component({selector: 'app-mat-card-title', template: ''})
class CardTitleComponent {
}

@Component({selector: 'app-mat-card-subtitle', template: ''})
class CardSubtitleComponent {
}

@Component({selector: 'app-mat-card-content', template: ''})
class CardContentComponent {
}

const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);

describe('EmployeeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
      declarations: [
        EmployeeComponent,
        CardComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardSubtitleComponent,
        CardContentComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employee = {
      id: 1,
      firstName: 'first',
      lastName: 'last',
      compensation: 0,
      position: 'jobTitle'
    };

    expect(comp).toBeTruthy();
  }));

  it('should set the direct reports data', async(() => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employee = {};
    comp.employee.directReports = undefined;
    comp.ngOnInit();
    expect(comp.directReportsData.length).toEqual(0);
  }));

  it('should set the direct reports', async(() => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employee = {};
    comp.employee.directReports = undefined;
    comp.ngOnInit();
    expect(comp.directReports).toEqual(0);
  }));
});
