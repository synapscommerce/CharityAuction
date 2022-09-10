import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-useritems',
  templateUrl: './useritems.component.html',
  styleUrls: ['./useritems.component.scss']
})
export class UseritemsComponent implements OnInit {

  public User : any = {};
  public Items : any[] = [];
  public TotalToPay : number = 0;
  constructor(private apiService : ApiService, private route : ActivatedRoute, private router : Router, private toastr : ToastrService) { }

  ngOnInit(): void {
    let id =  this.route.snapshot.params['id'];
    this.apiService.GetAsync<any>('users/users/' + id).subscribe(result => {
      this.User = result;
    });
    this.RefreshItems();
  }

  public RefreshItems(){
    let id =  this.route.snapshot.params['id'];
    this.apiService.GetAsync<any[]>('users/users/' + id + '/wonitems').subscribe(result => {
      this.Items = result;
      this.Recalculate();
    });
  }

  public Recalculate(){
    let amount = 0;
    for(let i of this.Items){
      if(i.paid == false){
        amount += i.topBidBidAmount;
      }
    }
    this.TotalToPay = amount;
  }

  public SetItemPaid(item : any, paid : boolean){
    if(paid == true){
      this.apiService.PostAsync<any>('users/users/' + this.User.id + '/items/' + item.id + '/paid',{}).subscribe(result => {
        item.paid = result.paid;
      this.Recalculate();
    });
    }
    else{
      this.apiService.DeleteAsync<any>('users/users/' + this.User.id + '/items/' + item.id + '/paid').subscribe(result => {
        item.paid = result.paid;
        this.Recalculate();
    });
    }
  }

}
