import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import {catchError, interval, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-bigscreen',
  templateUrl: './bigscreen.component.html',
  styleUrls: ['./bigscreen.component.scss']
})
export class BigscreenComponent implements OnInit {

  public Items : any[] = [];
  public MainItem : any = {};
  public ImageBaseUrl : string = environment.apiUrl;
  public Feed : string[] = ['','','','','',''];
  private timer !: Subscription;
  private timer2 !: Subscription;
  private MainIndex : number = 1;

  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
    this.Refresh();
    const t = interval(3000);
    this.timer = t.subscribe(result => this.Update());
    const t2 = interval(15000);
    this.timer2 = t2.subscribe(result => this.Rotate());
  }

  public Refresh(){
    this.apiService.GetAsync<any[]>("public/currentitems").subscribe(result =>{
      this.Items = result;
      if(result.length > 0)
        this.MainItem = result[0];
    });
  }

  public Rotate(){
    if(this.Items.length == 0)
      return;
    this.MainIndex += 1;
    if(this.MainIndex >= this.Items.length)
      this.MainIndex = 0;
    this.MainItem = this.Items[this.MainIndex];
  }

  public Update(){
    this.apiService.GetAsync<any[]>("public/currentitems").subscribe(result => {
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
              if(x.topBidBidAmount > y.topBidBidAmount){
                //someone has bid
                let s = "Bidder " + x.topBidUserBidderNumber + " has bid $" + x.topBidBidAmount.toFixed(2) + " on " + x.title;
                this.Feed.splice(0, 0, s);
                while(this.Feed.length > 6){
                  this.Feed.splice(6, 1);
                }

              }
              this.Items[j] = x;
              if(this.MainItem == y){
                this.MainItem = x;
              }
            }
          }
          if(found == false){
            this.Items.push(x);
          }
        }
      }
    });
  }

}
