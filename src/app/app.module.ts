import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatNativeDateModule, MatInputModule} from '@angular/material';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HttpModule } from '@angular/http';
import { loginService } from './services/login.service';

import { HomePageComponent } from './home-page/home-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule } from '@angular/material';
import {AuthguardGuard } from './login-form/authguard.guard';
import { HeaderComponent } from './header/header.component';


import {MatToolbarModule} from '@angular/material/toolbar';
import { ProfileComponent } from './profile/profile.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {DialogOverviewExampleDialog} from './profile/profile.component';
import {viewNotificationComponent} from './home-page/viewNotification.component'; 
import {DilogForSaveChanges} from './profile/profile.component';
import {DilogForChangeProfilePicture} from './profile/profile.component';

import {ProjectService} from './services/project.service';
import { RegisterService } from './services/register.service';
import { RegistrationComponent } from './registration/registration.component';
import { ProjectsComponent } from './projects/projects.component';
import { AssignedprojectsComponent } from './assignedprojects/assignedprojects.component';
import { ChatdetailsComponent } from './chatdetails/chatdetails.component'
import {ChatService} from './services/chat.service';

const appRoutes:Routes = [
  {
    path:'',
   canActivate:[AuthguardGuard],
    component:LoginFormComponent
 },

  {
     path:'HomePage',
    //canActivate:[AuthguardGuard],
     component:HomePageComponent
  },
  
  {
    path:'profile',
    //canActivate:[AuthguardGuard],
    component:ProfileComponent
  },
  {
    path:'projects',
    //canActivate:[AuthguardGuard],
    component:ProjectsComponent
  },
  {
    path:'assigned_projects',
    //canActivate:[AuthguardGuard],
    component:AssignedprojectsComponent
  },
  {
	 path:'chatdetails',
    //canActivate:[AuthguardGuard],
    component:ChatdetailsComponent	  
  },
  
  

 ]


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomePageComponent,
    HeaderComponent,
    ProfileComponent,
    DialogOverviewExampleDialog,
    viewNotificationComponent,
    DilogForSaveChanges,
    DilogForChangeProfilePicture,
    RegistrationComponent,
    ProjectsComponent,
    AssignedprojectsComponent,
    ChatdetailsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatCardModule,
    MatDialogModule,
    MatTooltipModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatListModule,
    HttpModule,
    MatPaginatorModule
],
  providers: [loginService,,AuthguardGuard,RegisterService,ProjectService,ChatService],
  entryComponents:[DialogOverviewExampleDialog,DilogForSaveChanges,DilogForChangeProfilePicture],
  bootstrap: [AppComponent]
})
export class AppModule { }
