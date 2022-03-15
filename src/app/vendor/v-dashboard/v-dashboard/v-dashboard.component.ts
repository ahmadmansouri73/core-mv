import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from './../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-dashboard',
  templateUrl: './v-dashboard.component.html',
  styleUrls: ['./v-dashboard.component.css']
})
export class VDashboardComponent implements OnInit {

  constructor(public userService: UserService , private authService: AuthService, private router: Router) { }



  ngOnInit(): void {


  }

  public logout(): void {
    this.authService.logOut()
    this.router.navigate(['/'])
  }
}
