import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: 'input[appOnlyNumbers]'
})
export class OnlyNumbersDirective {
  constructor(private _el: ElementRef) {

  }


  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this._el.nativeElement.value;
    const replacedValue = initialValue
    .replace( "۱" , "1")
    .replace( "۲" , '2')
    .replace("۳" , '3')
    .replace( "۴" , '4')
    .replace( "۵" , '5')
    .replace("۶" , '6')
    .replace("۷", '7')
    .replace( "۸", '8')
    .replace("۹", '9')
    .replace("۰" , '0')
    .replace( "١" , "1")
    .replace( "٢" , '2')
    .replace("٣" , '3')
    .replace( "٤" , '4')
    .replace( "٥" , '5')
    .replace("٦" , '6')
    .replace("٧", '7')
    .replace( "٨", '8')
    .replace("٩", '9')
    .replace("٠" , '0')
    .replace(/[^0-9]*/g, '');
    this._el.nativeElement.value = replacedValue
    if (initialValue !== replacedValue) {
      event.stopPropagation();
    }
  }
}
