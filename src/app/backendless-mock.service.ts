import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class BackendlessMockService implements InMemoryDbService {
  createDb() {
    const employees = [
      {
        id: 1,
        compensation: 100,
        firstName: 'Brian',
        lastName: 'McGee',
        position: 'CEO',
        directReports: [2, 3]
      },
      {
        id: 2,
        compensation: 120,
        firstName: 'Homer',
        lastName: 'Thompson',
        position: 'Dev Manager',
        directReports: [4]
      },
      {
        id: 3,
        compensation: 140,
        firstName: 'Rock',
        lastName: 'Strongo',
        position: 'Lead Tester'
      },
      {
        id: 4,
        compensation: 75,
        firstName: 'Max',
        lastName: 'Power',
        position: 'Junior Software Engineer'
      }
    ];
    return {employees};
  }
}

