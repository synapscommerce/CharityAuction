import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AuctionslistComponent } from './auctions/auctionslist/auctionslist.component';
import { AuthGuard } from './guards/auth-guard';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuctiondetailComponent } from './auctions/auctiondetail/auctiondetail.component';
import { EditauctionComponent } from './auctions/editauction/editauction.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuctionslistComponent,
    AuctiondetailComponent,
    EditauctionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
