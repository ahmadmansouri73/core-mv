import { MatDialogRef } from '@angular/material/dialog';
import { regex } from 'src/app/shared/regex';
import { NotifyService } from './../../../core/services/ui/notify.service';
import { ValueTypeService } from 'src/app/core/services/value-type.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-append-delivery-farmer-invoice',
  templateUrl: './append-delivery-farmer-invoice.component.html',
  styleUrls: ['./append-delivery-farmer-invoice.component.css']
})
export class AppendDeliveryFarmerInvoiceComponent implements OnInit {

  constructor(
    private valueTypeService: ValueTypeService,
    private matDialogRef: MatDialogRef<any>
  ) { }

  types: any [] = []
  @Output() item = new EventEmitter<any>()

  form = new FormGroup({
    full_name_driver: new FormControl(null ),
    v_empty: new FormControl(null , Validators.pattern(regex.digit_or_float) ),
    v_full: new FormControl(null , Validators.pattern(regex.digit_or_float)),
    v_real: new FormControl(null, Validators.pattern(regex.digit_or_float) ),
    value_type_id: new FormControl(null ),
    date_BS: new FormControl(null ),
    amount_BS: new FormControl(null , Validators.pattern(regex.digit)),
    status_give_price_BS: new FormControl(null ),
    description: new FormControl(null ),
    image_path: new FormControl(null),
    amount_rent_delivery: new FormControl(null, [Validators.pattern(regex.digit)] ),
    status_give_price_rent: new FormControl(1),
  })

  submit() {
    if (this.form.valid) {
      this.item.emit(this.form.value)
      this.matDialogRef.close(this.form.value)
    }
  }
  ngOnInit(): void {

    this.valueTypeService.valueTypes.subscribe(data => this.types = data.data)

  }

}
