import { Component } from '@angular/core';
import { ConfService } from '../core/services/conf.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private confService: ConfService){

    confService.app().subscribe(data => console.log(data , 'res') ,error => console.warn(error , 'err') , () => console.info('com'))
  }
}
