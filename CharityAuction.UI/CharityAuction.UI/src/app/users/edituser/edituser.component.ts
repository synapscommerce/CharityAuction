import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {

  public User : any = {};
  constructor(private apiService : ApiService, private route : ActivatedRoute, private router : Router, private toastr : ToastrService) { }

  ngOnInit(): void {
    let id =  this.route.snapshot.params['id'];
    this.apiService.GetAsync<any>('users/users/' + id).subscribe(result => {
      this.User = result;
    });
  }

  
  public ClearPin(){
    this.apiService.DeleteAsync<any[]>('users/users/' + this.User.id + '/pin').subscribe(result =>{
      this.toastr.success("User " + this.User.id + " PIN cleared", "PIN Cleared");
    });
  }
}
