import { UserTypeService } from './../../../core/services/user-type.service';
import { UserService } from './../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-profile',
  templateUrl: './index-profile.component.html',
  styleUrls: ['./index-profile.component.css']
})
export class IndexProfileComponent implements OnInit {

  constructor(private UserService: UserService, private UserTypeService: UserTypeService) { }

  user: any
  user_type: any
  ngOnInit(): void {
    this.UserService.observableUser.subscribe(data  => this.user = data)
    this.UserTypeService.observableType.subscribe(data => this.user_type = data)
  }

}
