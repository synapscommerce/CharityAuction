import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuctionslistComponent } from './auctions/auctionslist/auctionslist.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  // home route protected by auth guard
  { path: '', component: AuctionslistComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
