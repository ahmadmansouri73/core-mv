import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ImageUploadingService } from './../../../core/services/image-uploading.service';
import { UpdateProfileService } from './../../v-data/services/update-profile.service';
import { UserService } from './../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ImageCompressorService } from 'src/app/core/services/image-compressor.service';
import { delay, filter, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(

    private imageCompressorService: ImageCompressorService,
    private imageUploadingService: ImageUploadingService,
    private userService: UserService,
    private router: Router,
    private updateProfileService: UpdateProfileService,
    private authService: AuthService,

  ) { }


  private changeLogo = new Subject<{image: string , size: number}>()

  logo: any
  uploadLogo(event: any) {
    let file = event.target.files[0]
    this.imageCompressorService.compress(file).then(data => {
      this.changeLogo.next(data)
      console.log(data);
      this.logo = data.image

    })

  }



  public logout(): void {
    this.authService.logOut()
    this.router.navigate(['/'])
  }
  user: any
  ngOnInit(): void {

    this.changeLogo.asObservable().pipe(
      filter(next => next != null && next.image != undefined),
      delay(300),
      switchMap(next => this.updateProfileService.logo({logo_address_image: this.imageUploadingService.base64ImageEncoder(next.image)})),
      filter(data => data.status == true)
    ).subscribe(_ => this.user.logo_address_image = this.logo )


    this.user = this.userService.user
  }

}
