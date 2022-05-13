import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { APIService } from './services/api.service';
import { CartService } from './services/cart.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ...routedComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [APIService,CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
