import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-auctionslist',
  templateUrl: './auctionslist.component.html',
  styleUrls: ['./auctionslist.component.scss']
})
export class AuctionslistComponent implements OnInit {

  public Auctions : any[] | null = null;

  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
    this.Refresh();
  }

  public Refresh(){
    this.apiService.GetAsync<any[]>("auctions").subscribe(result => {
      this.Auctions = result;
    });
  }

}
