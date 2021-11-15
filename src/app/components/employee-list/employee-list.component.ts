import { Component, OnInit } from '@angular/core';
import { catchError, map, reduce } from 'rxjs/operators';
import { Employee } from '../../employee';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  updateEmployee(emp) {
    this.employeeService.save(emp)
      .pipe(
        catchError(this.handleError.bind(this))
      ).subscribe();
    this.getAllEmployees();
  }

  deleteEmployee(emp) {
    this.employeeService.remove(emp)
      .pipe(
        catchError(this.handleError.bind(this))
      ).subscribe();
    this.getAllEmployees();
  }

  private getAllEmployees() {
    this.employeeService.getAll()
      .pipe(
        reduce((emps, e: Employee) => emps.concat(e), []),
        map(emps => this.employees = emps),
        catchError(this.handleError.bind(this))
      ).subscribe();
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
}
