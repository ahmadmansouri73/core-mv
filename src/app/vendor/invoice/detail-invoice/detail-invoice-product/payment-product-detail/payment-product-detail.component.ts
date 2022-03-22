import { MatDialogRef } from '@angular/material/dialog';
import { NotifyService } from './../../../../../core/services/ui/notify.service';
import { regex } from './../../../../../shared/regex';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValueTypeService } from './../../../../../core/services/value-type.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-product-detail',
  templateUrl: './payment-product-detail.component.html',
  styleUrls: ['./payment-product-detail.component.css']
})
export class PaymentProductDetailComponent implements OnInit {

  constructor(
    private valueTypeService: ValueTypeService,
    private notifyService: NotifyService,
    private MatDialogRef: MatDialogRef<PaymentProductDetailComponent>,
  ) { }


  form = new FormGroup({
    value: new FormControl(null , [Validators.required , Validators.pattern(regex.digit_or_float)]),
    amount_price: new FormControl(null , [Validators.required , Validators.pattern(regex.digit)]),
    wage_percentage: new FormControl(null , [Validators.pattern(regex.digit_or_float)]),
    amount_wage: new FormControl(null , [ Validators.pattern(regex.digit_or_float)]),
    final_amount_price: new FormControl(null , [Validators.required , Validators.pattern(regex.digit)]),
  })


  submit() {
    if (this.form.valid) {
      this.MatDialogRef.close(this.form.value)
    }
    else
    {
      this.notifyService.warning('form invlid')
    }
  }

  valueTypes: any [] = []

  ngOnInit(): void {
    this.valueTypeService.valueTypes.subscribe(data => this.valueTypes = data.data)
  }

}
