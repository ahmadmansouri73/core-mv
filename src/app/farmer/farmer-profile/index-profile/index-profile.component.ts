import { AuthService } from './../../../core/services/auth.service';
import { UserTypeService } from './../../../core/services/user-type.service';
import { UserService } from './../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-profile',
  templateUrl: './index-profile.component.html',
  styleUrls: ['./index-profile.component.css']
})
export class IndexProfileComponent implements OnInit {

  constructor(
    private UserService: UserService,
    private UserTypeService: UserTypeService,
    private rotuer: Router,
    private AuthService: AuthService
  ) { }

  user: any
  user_type: any
  ngOnInit(): void {
    this.UserService.observableUser.subscribe(data  => this.user = data)
    this.UserTypeService.observableType.subscribe(data => this.user_type = data)
  }

  logout() {
    this.AuthService.logOut()
    this.rotuer.navigate(['/'])
  }

  update() {
    this.rotuer.navigate(['/farmer/profile/update'])
  }


}
