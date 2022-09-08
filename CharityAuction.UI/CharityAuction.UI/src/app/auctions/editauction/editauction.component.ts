import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-editauction',
  templateUrl: './editauction.component.html',
  styleUrls: ['./editauction.component.scss']
})
export class EditauctionComponent implements OnInit {

  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
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
