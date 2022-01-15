import { Component, ViewChild, OnInit } from '@angular/core';
import {NbSidebarComponent, NbSidebarService} from "@nebular/theme";

@Component({
  selector: 'app-v-dashboard',
  templateUrl: './v-dashboard.component.html',
  styleUrls: ['./v-dashboard.component.css']
})
export class VDashboardComponent implements OnInit {

  constructor(private sidebarService: NbSidebarService) { }

  @ViewChild('sidebar') sidebar: NbSidebarComponent | undefined


  click () {
    this.sidebarService.toggle(true)
  }

  ngOnInit(): void {
    
  }

}
