import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  constructor(private router: Router) { }


  farmer() {
    this.router.navigate(['./farmer'])
  }

  vendor() {
    this.router.navigate(['./vendor'])
  }

  ngOnInit(): void {
  }

}
