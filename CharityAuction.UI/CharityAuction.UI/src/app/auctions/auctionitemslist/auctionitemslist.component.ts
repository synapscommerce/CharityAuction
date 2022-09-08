import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-auctionitemslist',
  templateUrl: './auctionitemslist.component.html',
  styleUrls: ['./auctionitemslist.component.scss']
})
export class AuctionitemslistComponent implements OnInit {

  public Items : any[] | null = null;

  constructor(private apiService : ApiService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.Refresh();
  }

  public Refresh(){
    let auctionId =  this.route.snapshot.params['auctionId'];
    this.apiService.GetAsync<any[]>("auctions/" + auctionId + "/items").subscribe(result => {
      this.Items = result;
    });
  }

}
