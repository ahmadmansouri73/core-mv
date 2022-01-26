import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-new-product',
  templateUrl: './view-new-product.component.html',
  styleUrls: ['./view-new-product.component.css']
})
export class ViewNewProductComponent implements OnInit {

  constructor() { }


  @Input() item: any = null

  ngOnInit(): void {
  }

}
