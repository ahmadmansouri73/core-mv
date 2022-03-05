import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-farmer-dashboard',
  templateUrl: './farmer-dashboard.component.html',
  styleUrls: ['./farmer-dashboard.component.css']
})
export class FarmerDashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public userService: UserService,
    private router: Router
    ) { }

  logout() {
    this.authService.logOut()
    this.router.navigate(['/farmer/auth'])
  }
  ngOnInit(): void {
  }

}
