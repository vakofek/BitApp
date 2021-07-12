import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';
import { FormsModule } from '@angular/forms';
import { ContactDetailsComponent } from './cmps/contact-details/contact-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartPageComponent } from './pages/chart-page/chart-page.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { HeaderComponent } from './cmps/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { SingupComponent } from './pages/singup/singup.component';
import { TransferListComponent } from './cmps/transfer-list/transfer-list.component';
import { TranserPreviewComponent } from './cmps/transer-preview/transer-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContactListComponent,
    ContactPreviewComponent,
    ContactPageComponent,
    ContactFilterComponent,
    ContactDetailsComponent,
    ChartPageComponent,
    HeaderComponent,
    LoginComponent,
    ContactEditComponent,
    SingupComponent,
    TransferListComponent,
    TranserPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GoogleChartsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
