import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { APIService } from './services/api.service';
import { CartService } from './services/cart.service';
import { ToasterService } from 'angular2-toaster';
import {ToasterModule} from 'angular2-toaster';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ...routedComponents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToasterModule.forRoot()
  ],
  providers: [APIService,CartService,ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
