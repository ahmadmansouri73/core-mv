import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-append-delivery-farmer-invoice',
  templateUrl: './append-delivery-farmer-invoice.component.html',
  styleUrls: ['./append-delivery-farmer-invoice.component.css']
})
export class AppendDeliveryFarmerInvoiceComponent implements OnInit {

  constructor() { }

  form = new FormGroup({

  })

  submit() {
    if (this.form.valid) {

    }
  }
  ngOnInit(): void {
  }

}
