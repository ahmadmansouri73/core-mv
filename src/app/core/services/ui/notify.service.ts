import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor( private toaster: ToastrService) { }



  public error(message: string): void {
    this.toaster.error(message)
  }

  public success(message: string): void {
    this.toaster.success(message)
  }

  public info(message: string): void {
    this.toaster.info(message)
  }

  public warning(message: string): void {
    this.toaster.warning(message)
  }

}
