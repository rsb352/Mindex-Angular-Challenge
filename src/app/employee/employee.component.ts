import {Component, Input} from '@angular/core';
import {EmployeeService} from'../employee.service';
import {Employee} from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  @Input() employee: Employee;

  // currentVal="";
  // getVal(val)
  // {
  //   console.warn(val)
  //   this.currentVal=val
  // }
  constructor(private employeeService: EmployeeService) {
  }

}
