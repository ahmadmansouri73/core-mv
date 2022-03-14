import { regex } from './../../../shared/regex';
import { NotifyService } from './../../../core/services/ui/notify.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginVendorService } from '../../v-data/services/login-vendor.service';

@Component({
  selector: 'app-v-login',
  templateUrl: './v-login.component.html',
  styleUrls: ['./v-login.component.css']
})
export class VLoginComponent implements OnInit {

  constructor(
    private loginService: LoginVendorService,
    private authService:  AuthService,
    private router: Router,
    private notify: NotifyService
  ) { }


  public form: FormGroup = new FormGroup({
    username: new FormControl(null , [Validators.required , Validators.pattern(regex.phone) , Validators.pattern(regex.digit)]),
    password: new FormControl(null , [Validators.required , Validators.minLength(4)]),
  })
  user: string = ''

  is_submit = false
  public submit(): void {


    if (this.form.valid && this.is_submit == false)
    {
      this.is_submit = true
      this.loginService.login(this.form.value).pipe(
          filter(next => next.status == true),
          switchMap(_ => this.authService.attempAuth())
        ).subscribe(data => {
        if (data.status == true) {
          this.notify.success(data.message)
          this.router.navigate(['/vendor']) // root projact module angular navigate checking guard set router
        }
      }, error => {

      }, () => {
        this.is_submit = false
      })
    }
  }


  ngOnInit(): void {
  }

}
