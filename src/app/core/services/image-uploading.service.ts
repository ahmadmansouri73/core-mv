import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadingService {


  constructor(private httpClient: HttpClient ) { }



  public base64ImageEncoder(image: string) {
    let base64 = image.replace('data:image/jpeg;base64,', '')
    base64 = base64.replace('data:image/jpg;base64,', '')
    base64 = base64.replace('data:image/png;base64,', '')
    return base64
  }

  public upload_file_base64(image: {kay: string , image: string }  , address_upload: string , object_item: any = {}): Observable<any> {
    object_item[image.kay] = this.base64ImageEncoder(image.image)
    return this.httpClient.post(address_upload , object_item)
  }


  upload_file_form_data(): boolean {
    return false
  }

}
