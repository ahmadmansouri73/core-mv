import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_VALIDATORS, ValidationErrors } from '@angular/forms';
import { BehaviorSubject, map, Observable, of, ReplaySubject, Subject, tap } from 'rxjs';
import { ReqisterVendorService } from '../services/reqister-vendor.service';

@Directive({
  selector: '[appBrandnameChecking]',
  providers: [{provide: NG_VALIDATORS, useExisting: BrandnameCheckingDirective, multi: true}]
})
export class BrandnameCheckingDirective implements AsyncValidator {

  constructor(private registerService: ReqisterVendorService) { }
  
  private subject = new BehaviorSubject<any>({})
  
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    
    this.registerService.checkingExistBrandName(control.value).subscribe(data => {
      console.log(data) , 'ex';
      this.subject.next({brand_name: data.data})

      
    })


    return this.subject.asObservable().pipe(tap(data => console.log(data , 'er')))
  
  }

}
