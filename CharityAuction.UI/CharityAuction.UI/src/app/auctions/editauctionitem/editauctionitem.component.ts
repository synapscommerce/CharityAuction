import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editauctionitem',
  templateUrl: './editauctionitem.component.html',
  styleUrls: ['./editauctionitem.component.scss']
})
export class EditauctionitemComponent implements OnInit {
  public Item : any = {};
  public ImageUrl : string = environment.apiUrl + "/public/images/";
  constructor(private apiService : ApiService, private route : ActivatedRoute, private router : Router, private toastr : ToastrService) { 
  }

  ngOnInit(): void {
    let auctionId =  this.route.snapshot.params['auctionId'];
    let id =  this.route.snapshot.params['id'];

    if(id == "new"){
      this.Item = { lotNumber : "", title: "", description: "", startPrice: 0, reservePrice: 0, imageIds: []};
    }
    else{
      this.apiService.GetAsync<any>("auctions/" + auctionId + "/items/" + id ).subscribe(result =>{
        this.Item = result;
      });
    }
  }

  public Save(){
    let auctionId =  this.route.snapshot.params['auctionId'];
    let id =  this.route.snapshot.params['id'];

    if(id == "new"){
      this.apiService.PostAsync<any>("auctions/" + auctionId + "/items", this.Item).subscribe(result =>{
        this.router.navigateByUrl("auctions/" + auctionId + "/items");
      });
    }
    else {
      this.apiService.PutAsync<any>("auctions/" + auctionId + "/items/" + id, this.Item).subscribe(result =>{
        this.router.navigateByUrl("auctions/" + auctionId + "/items");
      });
    }
  }


  public UploadImage(image: any) {
    var file = image.target.files[0] as File;

    var fileByteArray: number[] = [];
    var reader = new FileReader();
    let api = this.apiService;
    let item = this.Item;
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
            if(item.imageIds == null) item.imageIds = [];
            item.imageIds.push(result.id);
        });
    };
    var x = reader.readAsArrayBuffer(image.target.files[0]);

  }

  public RemoveImage(id : number){
    for(let i=0; i < this.Item.imageIds.length; i++){
      if(this.Item.imageIds[i] == id){
        this.Item.imageIds.splice(i, 1);
        break;
      }
    }
  }
}
