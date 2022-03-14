import { ResetPasswordService } from './../../v-data/services/reset-password.service';
import { UserService } from './../../../core/services/user.service';
import { Router } from '@angular/router';
import { NotifyService } from './../../../core/services/ui/notify.service';
import { regex } from './../../../shared/regex';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private notifyService: NotifyService,
    private router: Router,
    private resetPasswordService: ResetPasswordService
  ) { }

  form = new FormGroup({
    old_password: new FormControl(null , [Validators.required , Validators.minLength(4)]),
    new_password: new FormControl(null , [Validators.required , Validators.minLength(4)]),
  })

  submit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      this.resetPasswordService.reset_password(this.form.value).subscribe(data => {
        if (data.status == true) {
          this.notifyService.success(data.message)
          this.router.navigate(['./vendor'])
        }
      })
    }
    else
    {
      this.notifyService.info('invalid form')
    }
  }


  ngOnInit(): void {

  }

}
