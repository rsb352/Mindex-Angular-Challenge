import {Component, Input,Inject, NgModule, OnInit} from '@angular/core';
import {EmployeeService} from'../employee.service';
import {Employee} from '../employee';
// import { ModalModule } from 'ngb-modal';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
  @Input() employee: Employee;
  animal: string;
  name: string;


  // currentVal="";
  // getVal(val)
  // {
  //   console.warn(val)
  //   this.currentVal=val
  // }

  private directReportsData:any[];
  directReports = 0;
  directReportsArr = [];
  emp;



  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.employee.firstName +" " + this.employee.lastName},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialog1(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog1, {
      width: '250px',
      data: {name: this.employee.firstName +" " + this.employee.lastName},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

    ngOnInit() {
    this.directReportsData = [];
      if(this.employee.directReports === undefined){
        this.directReports = 0;
      } else {
        this.directReports = this.employee.directReports.length;
        this.directReportsArr = this.employee.directReports;
        for(var i=0; i<this.directReports; i++){
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

    onNoClick(): void {
      this.dialogRef.close();
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

    onNoClick(): void {
      this.dialogRef.close();
    }
  }
