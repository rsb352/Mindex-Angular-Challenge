export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  compensation: number;
  directReports?: Array<number>;

//I added constructor for employees

  constructor(id:number,
    firstName:string,
    lastName:string,
    position:string,
    compensation:number,
    directReports?: Array<number>){
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.position = position;
      this.compensation = compensation;
      this.directReports = directReports;

    }
  //my addition till here
}
