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
    this.FarmerRegisterService.register_phone(this.form.value.call_number).subscribe(data => {
      if (data.status) {
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
