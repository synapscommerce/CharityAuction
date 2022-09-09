import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons';
import {catchError, interval, of, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public Items : any[] = []; 
  public BidTarget : any | null = null;
  public Icons = {faCommentsDollar : faCommentsDollar };
  private timer !: Subscription;
  public ImageUrl : string = environment.apiUrl + "/public/images/";



  constructor(private apiService : ApiService, private toastr: ToastrService, public loginService : LoginService) { }

  ngOnInit(): void {
    this.Refresh();
    const t = interval(4000);
    this.timer = t.subscribe(result => this.Update());
  }
  ngOnDestroy(): void {
      this.timer.unsubscribe();
  }

  public Refresh(){
    this.apiService.GetAsync<any[]>("bidding/available").subscribe(result => {
      this.Items = result;
    });
  }
  public Update(){
    this.apiService.GetAsync<any[]>("bidding/available").subscribe(result => {
      if(this.Items.length == 0){
        this.Items = result;
      }
      else{
        for(let i=0; i < result.length; i++){
          let x = result[i];
          let found : boolean = false;
          for(let j=0; j < this.Items.length; j++){
            let y = this.Items[j];
            if(x.id == y.id){
              found = true;
              if(this.BidTarget != null && this.BidTarget.id == x.id){
                this.BidTarget = x;
              }
              if(x.youAreOutbid == true && y.youAreOutbid == false){
                this.toastr.warning(y.title, "You have been outbid!");
              }
              this.Items[j] = x;
            }
          }
          if(found == false){
            this.Items.push(x);
          }
        }
      }
    });
  }

  public PlaceBid(item : any, amount : number){
    this.apiService.PostAsync<any>("bidding/items/" + item.id + "/bids", { amount : amount}).pipe(catchError((error : any) => { 
      this.toastr.warning(error.error.Message, "Error");
      this.Refresh(); 
      return of(null); 
    }))
    .subscribe(result => {
      if(result.id != null){
        this.BidTarget = null;
        this.toastr.success(item.title, 'Bid Added');
        for(let i =0; i < this.Items.length; i++){
          if(this.Items[i].id == result.id){
            this.Items[i] = result;
          }
        }
      }
      else{

      }

    });
  }
}
