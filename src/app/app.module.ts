import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {AppComponent} from './app.component';
import {BackendlessMockService} from './backendless-mock.service';
import {EmployeeComponent} from './components/employee/employee.component';
import {DialogOverviewExampleDialog, DialogOverviewExampleDialog1} from './components/employee/employee.component';
import {EmployeeListComponent} from './components/employee-list/employee-list.component';
import {EmployeeService} from './employee.service';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeListComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog1
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(BackendlessMockService, {
      apiBase: 'api/',
      delay: 250,
      passThruUnknownUrl: true,
      post204: false,
      put204: false
    }),
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
  entryComponents: [EmployeeComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {
}
