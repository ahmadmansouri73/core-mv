import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-info-invoice',
  templateUrl: './info-invoice.component.html',
  styleUrls: ['./info-invoice.component.css']
})
export class InfoInvoiceComponent implements OnInit {

  constructor() { }
  @Output() ok = new EventEmitter()

  ngOnInit(): void {
  }

}
