import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-invoice',
  templateUrl: './delete-invoice.component.html',
  styleUrls: ['./delete-invoice.component.css']
})
export class DeleteInvoiceComponent implements OnInit {

  constructor(
    private matDialogRef: MatDialogRef<any>
  ) { }




  ok() {
    this.matDialogRef.close(true)
  }

  no() {
    this.matDialogRef.close(false)
  }



  ngOnInit(): void {

  }

}
