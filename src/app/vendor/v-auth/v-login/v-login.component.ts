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
    private router: Router
  ) { }


  public form: FormGroup = new FormGroup({
    username: new FormControl(null , [Validators.required , Validators.pattern(/09(0[1-2]|1[0-9]|3[0-9]|2[0-1])-?[0-9]{3}-?[0-9]{4}/) , Validators.pattern(/^\d+$/)]),
    password: new FormControl(null , [Validators.required]),
  })


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
          alert(data.message)
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
