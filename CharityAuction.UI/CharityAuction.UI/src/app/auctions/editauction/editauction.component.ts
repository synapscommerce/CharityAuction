import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-editauction',
  templateUrl: './editauction.component.html',
  styleUrls: ['./editauction.component.scss']
})
export class EditauctionComponent implements OnInit {

  public auction : any = {};
  constructor(private apiService : ApiService, private route : ActivatedRoute, private router : Router) { 
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
    reader.onload = function () {
      var arrayBuffer = this.result as ArrayBuffer,
        array = new Uint8Array(arrayBuffer)
      for (var i = 0; i < array.length; i++) {
        fileByteArray.push(array[i]);
      }
      let obs = new Observable<number>(subscriber => {
        api.PostAsync<any>("images", { FileName: file.name, FileBytes: file}).subscribe(result => {
            subscriber.next(result.Id);
        });
    })

    }
  }


}
