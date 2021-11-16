import {async, TestBed} from '@angular/core/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA, Input} from '@angular/core';

import {EmployeeListComponent} from './employee-list.component';
import {EmployeeService} from '../../employee.service';
import {of} from 'rxjs';

@Component({selector: 'app-employee', template: ''})
class EmployeeComponent {
  @Input('employee') employee: any;
}

@Component({selector: 'app-mat-grid-list', template: ''})
class GridListComponent {
}

@Component({selector: 'app-mat-grid-tile', template: ''})
class GridTileComponent {
}

const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', {'getAll': of('mock data'), 'save': of('mock data')});

describe('EmployeeListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeListComponent,
        EmployeeComponent,
        GridListComponent,
        GridTileComponent
      ],
      providers: [
        {provide: EmployeeService, useValue: employeeServiceSpy}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  }));

  it('should get all employees', async(() => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.ngOnInit();
    expect(comp.employees.length).toBeTruthy();
  }));

  it('should get all employees after update', async(() => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const comp = fixture.debugElement.componentInstance;
    const spy = spyOn(comp, 'getAllEmployees');
    comp.updateEmployee({});
    expect(spy).toHaveBeenCalled();
  }));

  it('should update employee after delete', async(() => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const comp = fixture.debugElement.componentInstance;
    const spy = spyOn(comp, 'updateEmployee');
    comp.deleteEmployee({});
    expect(spy).toHaveBeenCalled();
  }));

  it('should handle the error', async(() => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const comp = fixture.debugElement.componentInstance;
    const e = {
      message: 'Error'
    };
    comp.handleError(e);
    expect(comp.errorMessage).toEqual('Error');
  }));
});
