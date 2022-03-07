import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { FarmerConnectionService } from './../../services/farmer-connection.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-connection',
  templateUrl: './index-connection.component.html',
  styleUrls: ['./index-connection.component.css']
})
export class IndexConnectionComponent implements OnInit {

  constructor(
    private farmerConnectionService: FarmerConnectionService,
    private router: Router
  ) { }

  connections: any[] = []

  loading = true
  invoice(id: number) {
    this.router.navigate(['/farmer/invoice'] , {queryParams: {vendor_id: id}})
  }
  ngOnInit(): void {
    this.farmerConnectionService.connections()
    .pipe(finalize(() => this.loading = false))
    .subscribe(data => this.connections = data.data)
  }

}
