import { FarmerConnectionService } from './../../services/farmer-connection.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-connection',
  templateUrl: './index-connection.component.html',
  styleUrls: ['./index-connection.component.css']
})
export class IndexConnectionComponent implements OnInit {

  constructor(private farmerConnectionService: FarmerConnectionService) { }

  connections: any[] = []
  ngOnInit(): void {
    this.farmerConnectionService.connections().subscribe(data => this.connections = data.data)
  }

}
