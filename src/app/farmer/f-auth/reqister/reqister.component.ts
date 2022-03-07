import { Router } from '@angular/router';
import { regex } from 'src/app/shared/regex';
import { NotifyService } from './../../../core/services/ui/notify.service';
import { FarmerRegisterService } from './../../services/farmer-register.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reqister',
  templateUrl: './reqister.component.html',
  styleUrls: ['./reqister.component.css']
})
export class ReqisterComponent implements OnInit {

  constructor(
    private Router: Router,
    private FarmerRegisterService: FarmerRegisterService,
    private NotifyService: NotifyService) { }


  form = new FormGroup({
    call_number: new  FormControl(null , [Validators.required , Validators.pattern(regex.call_number)] ),
    code: new  FormControl(null , [Validators.required , Validators.pattern(regex.digit)]),
  })

  step_form = 1

  register_phone(): void {


    let phone: number = this.form.value.call_number||'';

    phone
    .toString()
    .replace( "۱" , "1")
    .replace( "۲" , '2')
    .replace("۳" , '3')
    .replace( "۴" , '4')
    .replace( "۵" , '5')
    .replace("۶" , '6')
    .replace("۷", '7')
    .replace( "۸", '8')
    .replace("۹", '9')
    .replace("۰" , '0')
    .replace( "١" , "1")
    .replace( "٢" , '2')
    .replace("٣" , '3')
    .replace( "٤" , '4')
    .replace( "٥" , '5')
    .replace("٦" , '6')
    .replace("٧", '7')
    .replace( "٨", '8')
    .replace("٩", '9')
    .replace("٠" , '0')


    let call_number: string = `0${phone}`



    if (regex.call_number.test(call_number) == false) {
      this.NotifyService.warning('شماره مبايل نادرست هست')
      return
    }


    this.FarmerRegisterService.register_phone(call_number).subscribe(data => {
      if (data.status) {
        this.form.controls['call_number'].setValue(call_number)
        this.NotifyService.success(data.message)
        this.step_form = 2
      }
    })
  }




  setCode(code: any) {
    if (code.toString().length == 6) {
      this.form.controls['code'].setValue(code)
    }
  }


  submit(): void {
    this.FarmerRegisterService.confirm_code(this.form.value.call_number , this.form.value.code).subscribe(data => {
      if (data.status) {
        this.NotifyService.success(data.message)
        this.Router.navigate(['/farmer'])
      }
    })
  }


  ngOnInit(): void {
  }

}
