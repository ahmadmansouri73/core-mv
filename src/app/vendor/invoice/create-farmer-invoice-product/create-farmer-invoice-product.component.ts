import { FarmerService } from './../../v-data/services/farmer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-farmer-invoice-product',
  templateUrl: './create-farmer-invoice-product.component.html',
  styleUrls: ['./create-farmer-invoice-product.component.css']
})
export class CreateFarmerInvoiceProductComponent implements OnInit {

  constructor(private farmerService: FarmerService) { }

  connections: any[] = [];
  ngOnInit(): void {
    this.farmerService.connections().subscribe(data => {
      this.connections = data.data
    })
  }

}
