import {Component, OnInit} from '@angular/core';
import {catchError, map, reduce} from 'rxjs/operators';
import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string;

  formValue !: FormGroup;

  constructor(private employeeService: EmployeeService,
    private dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.employeeService.getAll()
      .pipe(
        reduce((emps, e: Employee) => emps.concat(e), []),
        map(emps => this.employees = emps),
        catchError(this.handleError.bind(this))
      ).subscribe();
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent,dialogConfig);
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
}
