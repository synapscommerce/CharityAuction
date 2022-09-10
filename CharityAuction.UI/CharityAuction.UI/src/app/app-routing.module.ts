import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuctionitemslistComponent } from './auctions/auctionitemslist/auctionitemslist.component';
import { AuctionslistComponent } from './auctions/auctionslist/auctionslist.component';
import { EditauctionComponent } from './auctions/editauction/editauction.component';
import { EditauctionitemComponent } from './auctions/editauctionitem/editauctionitem.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './bidding/home/home.component';
import { BigscreenComponent } from './bigscreen/bigscreen.component';
import { AuthGuard } from './guards/auth-guard';
import { EdituserComponent } from './users/edituser/edituser.component';
import { UseritemsComponent } from './users/useritems/useritems.component';
import { UserslistComponent } from './users/userslist/userslist.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  // home route protected by auth guard
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'bigscreen', component: BigscreenComponent, },
  { path: 'auctions', component: AuctionslistComponent, canActivate: [AuthGuard] },
  { path: 'auctions/:id', component: EditauctionComponent, canActivate: [AuthGuard] },
  { path: 'auctions/:auctionId/items', component: AuctionitemslistComponent, canActivate: [AuthGuard] },
  { path: 'auctions/:auctionId/items/:id', component: EditauctionitemComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserslistComponent, canActivate: [AuthGuard]},
  { path: 'users/:id', component: EdituserComponent, canActivate: [AuthGuard]},
  { path: 'users/:id/items', component: UseritemsComponent, canActivate: [AuthGuard]},

  // otherwise redirect to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
