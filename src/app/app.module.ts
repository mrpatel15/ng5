import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { DataService } from './services/data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import {LocalStorageModule} from '@ngx-pwa/local-storage';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {ModalModule} from 'ngx-bootstrap';
import {AlertModule} from 'ngx-bootstrap/alert';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {MultiselectModule} from 'ngx-multiselect';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    LocalStorageModule,
    MultiselectDropdownModule,
    MDBBootstrapModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    TypeaheadModule.forRoot(),
    MultiselectModule.forRoot(),
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
