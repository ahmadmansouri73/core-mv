import { Component } from '@angular/core';
import { ConfService } from '../core/services/conf.service';
import { JwtService } from '../core/services/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private confService: ConfService, private jwtService: JwtService ){

  }

  value() {
    console.log(
      this.jwtService.cookieGet('test')
    )
  }

  delete() {
    this.jwtService.cookieDelete('test')
  }


  click() {
    this.confService.config().subscribe(

      event => {
        this.jwtService.cookieSet( 'test', event)
        console.log('set');

      }
    )
  }
}
