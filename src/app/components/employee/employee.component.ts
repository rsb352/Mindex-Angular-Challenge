import {Component, Input, Inject, OnInit, Output, EventEmitter} from '@angular/core';
import {EmployeeService} from '../../employee.service';
import {Employee} from '../../employee';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  id: number;
  compensation: number;
  firstName: string;
  lastName: string;
  position: string;
  directReports: Array<number>;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Output() updateEmployee = new EventEmitter();
  @Output() deleteEmployee = new EventEmitter();
  private directReportsData;
  directReports = 0;
  directReportsArr = [];

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {}

  openDialog(emp): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      data: {
        id: emp.id,
        compensation: emp.compensation,
        firstName: emp.firstName,
        lastName: emp.lastName,
        position: emp.position,
        directReports: emp.directReports
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateEmployee.emit(result);
      } else {
        console.log('The dialog was closed');
      }
    });
  }

  openDialog1(emp): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog1, {
      width: '300px',
      data: {
        id: emp.id,
        firstName: emp.firstName,
        lastName: emp.lastName
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEmployee.emit(result);
      } else {
        console.log('The dialog was closed');
      }
    });
  }

  ngOnInit() {
    this.directReportsData = [];
    if (this.employee.directReports === undefined) {
      this.directReports = 0;
    } else {
      this.directReports = this.employee.directReports.length;
      this.directReportsArr = this.employee.directReports;
      for (let i = 0; i < this.directReports; i++) {
        this.employeeService.get(this.directReportsArr[i]).subscribe((data) => {
          this.directReportsData.push(data);
        });
      }
    }
  }
}

@Component({
  selector: 'employee.dialog',
  templateUrl: 'employee.dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  closeDialog(action): void {
    if (action === 'edit') {
      this.dialogRef.close(this.data);
    } else {
      this.dialogRef.close();
    }
  }
}

@Component({
  selector: 'Delete.dialog',
  templateUrl: 'Delete.dialog.html',
})
export class DialogOverviewExampleDialog1 {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog1>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  closeDialog(action): void {
    if (action === 'delete') {
      this.dialogRef.close(this.data);
    } else {
      this.dialogRef.close();
    }
  }
}
