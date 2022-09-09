import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public Items : any[] = []; 
  public BidTarget : any | null = null;

  constructor(private apiService : ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.Refresh();
  }

  public Refresh(){
    this.apiService.GetAsync<any[]>("bidding/available").subscribe(result => {
      this.Items = result;
    });
  }


  public PlaceBid(item : any, amount : number){
    this.apiService.PostAsync<any>("bidding/items/" + item.id + "/bids", { amount : amount}).subscribe(result => {
      if(result.id != null){
        this.BidTarget = null;
        this.toastr.success(item.title, 'Bid Added');
        for(let i =0; i < this.Items.length; i++){
          if(this.Items[i].id == result.id){
            this.Items[i] = result;
          }
        }
      }

    });
  }
}
