import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[float]'
})
export class DigitOrFloatDirective {

  constructor(private _el: ElementRef) {}



  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this._el.nativeElement.value;

    const replacedValue = initialValue
    .replace( "۰" , "0")
    .replace( "۱" , '1')
    .replace("۲" , '2')
    .replace( "۳" , '3')
    .replace( "۴" , '4')
    .replace("۵" , '5')
    .replace("۶", '6')
    .replace( "۷", '7')
    .replace("۸", '8')
    .replace("۹" , '9')
    .replace("." , '.')
    // .replace(/[^0-9]*/g, '');
    this._el.nativeElement.value = replacedValue

    if (initialValue !== replacedValue) {
      event.stopPropagation();
    }
  }

}
