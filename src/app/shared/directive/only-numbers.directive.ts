import { NotifyService } from './../../core/services/ui/notify.service';
import {Directive, ElementRef, HostListener} from '@angular/core';
import { interval } from 'rxjs';

@Directive({
  selector: 'input[appOnlyNumbers]'
})
export class OnlyNumbersDirective {
  constructor(
    private notifyService: NotifyService,
    private _el: ElementRef) {

  }


  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this._el.nativeElement.value;
    const replacedValue = initialValue.replace(/[^0-9]*/g, '');
    this._el.nativeElement.value = replacedValue
    if (initialValue !== replacedValue) {
      this.notifyService.info( 'لطفا زبان کیبورد را به انگلیسی تغییر دهید و فقط عدد وارد کنید')
      event.stopPropagation();
    }
  }
}
