import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from 'src/app/core/services/ui/progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  constructor(public progressBarService: ProgressBarService) { }

  ngOnInit(): void {
  }

}
