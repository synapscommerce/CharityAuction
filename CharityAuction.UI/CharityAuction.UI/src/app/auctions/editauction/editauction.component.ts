import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editauction',
  templateUrl: './editauction.component.html',
  styleUrls: ['./editauction.component.scss']
})
export class EditauctionComponent implements OnInit {

  public auction : any = {};
  public ImageUrl : string = environment.apiUrl + "/public/images/";

  constructor(private apiService : ApiService, private route : ActivatedRoute, private router : Router, private toastr : ToastrService) { 
  }

  ngOnInit(): void {
    let id =  this.route.snapshot.params['id'];

    if(id == 'new'){
      this.auction = { name : "New Auction", description: "", startDate: "", endDate: "", logoImageId: null};
    }
    else{
      this.apiService.GetAsync<any>("auctions/" + id ).subscribe(result =>{
        this.auction = result;
      });
    }
   
  }

  public Save(){
    let id =  this.route.snapshot.params['id'];

    if(id == "new"){
      this.apiService.PostAsync<any>("auctions", this.auction).subscribe(result =>{
        this.auction = result;
        this.router.navigateByUrl("auctions");
      });
    }
    else {
      this.apiService.PutAsync<any>("auctions/" + id, this.auction).subscribe(result =>{
        this.auction = result;
        this.router.navigateByUrl("auctions");
      });
    }
  }


  public UploadImage(image: any) {
    var file = image.target.files[0] as File;

    var fileByteArray: number[] = [];
    var reader = new FileReader();
    let api = this.apiService;
    let auction = this.auction;
    let toastr = this.toastr;
    reader.onload = function () {
      var arrayBuffer = this.result as ArrayBuffer,
        array = new Uint8Array(arrayBuffer)
      for (var i = 0; i < array.length; i++) {
        fileByteArray.push(array[i]);
      }
        api.PostAsync<any>("images", { FileName: file.name, FileBytes: fileByteArray}).pipe(catchError((error : any) => { 
          toastr.warning(error.error.Message, "Error");
          return of(null); 
        })).subscribe(result => {
            auction.logoImageId = result.id;
        });
    };
    var x = reader.readAsArrayBuffer(image.target.files[0]);

  }


}
