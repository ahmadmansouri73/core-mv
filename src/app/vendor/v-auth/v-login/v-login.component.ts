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
    username: new FormControl(null , [Validators.required]),
    password: new FormControl(null , [Validators.required]),
  })


  public login(): void {
    if (this.form.valid)
    {
      this.loginService.login(this.form.value).pipe(
          filter(next => next.status == true),
          switchMap(_ => this.authService.attempAuth())
        ).subscribe(data => {
        if (data.status == true) {
          alert(data.message)
          this.router.navigate(['/vendor']) // root projact module angular navigate checking guard set router
        }
      })
    }
  }


  ngOnInit(): void {
  }

}
