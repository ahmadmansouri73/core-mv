import { Router } from '@angular/router';
import { FarmerService } from './../../v-data/services/farmer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-farmer',
  templateUrl: './list-farmer.component.html',
  styleUrls: ['./list-farmer.component.css']
})
export class ListFarmerComponent implements OnInit {

  constructor(
    private farmerService: FarmerService,
    private Router: Router

  ) { }

  farmers: any[] = []


  create() {
    this.Router.navigate(['/vendor/dashboard/farmer/create-farmer'])
  }

  ngOnInit(): void {
    this.farmerService.farmers().subscribe(data => this.farmers = data.data)
  }

}
