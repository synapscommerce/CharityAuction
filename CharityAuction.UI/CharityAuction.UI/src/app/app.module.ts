import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AuctionslistComponent } from './auctions/auctionslist/auctionslist.component';
import { AuthGuard } from './guards/auth-guard';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EditauctionComponent } from './auctions/editauction/editauction.component';
import { AuctionitemslistComponent } from './auctions/auctionitemslist/auctionitemslist.component';
import { EditauctionitemComponent } from './auctions/editauctionitem/editauctionitem.component';
import { HomeComponent } from './bidding/home/home.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuctionslistComponent,
    EditauctionComponent,
    AuctionitemslistComponent,
    EditauctionitemComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [AuthGuard, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
