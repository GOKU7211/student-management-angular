import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewComponent } from './view/view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

const router:Routes=[
  {path:'home',component:HomeComponent},
{path:'register',component:RegisterComponent},
{path:'list',component:ListComponent},
{path:'view',component:ViewComponent},
{path:'edit',component:EditComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ListComponent,
    EditComponent,
    HomeComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule,RouterModule.forRoot(router),HttpClientModule,
    MatDatepickerModule,MatInputModule,
    MatNativeDateModule,BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
