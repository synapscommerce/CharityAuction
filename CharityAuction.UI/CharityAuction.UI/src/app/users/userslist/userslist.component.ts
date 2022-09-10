import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.scss']
})
export class UserslistComponent implements OnInit {

  public Users : any[] = [];
  constructor(private apiService : ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.Refresh();
  }

  public Refresh(){
    this.apiService.GetAsync<any[]>('users/users').subscribe(result =>{
      this.Users = result;
    });
  }

  public ClearUserPin(id : number){
    this.apiService.DeleteAsync<any[]>('users/users/' + id + '/pin').subscribe(result =>{
      this.toastr.success("User " + id + " PIN cleared", "PIN Cleared");
    });
  }

}
