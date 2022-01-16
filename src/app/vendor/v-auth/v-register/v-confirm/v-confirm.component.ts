import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-v-confirm',
  templateUrl: './v-confirm.component.html',
  styleUrls: ['./v-confirm.component.css']
})
export class VConfirmComponent implements OnInit {

  constructor() { }


  @Output() code = new EventEmitter<string>()

  ngOnInit(): void {
  }


  setCode(event: string) {
    if (event.trim().length == 6) {
      this.code.emit(event)
    }
  }
}
