import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCompressorService } from 'src/app/core/services/image-compressor.service';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.css']
})
export class ImagePickerComponent implements OnInit {

  constructor(private imageCompressorService: ImageCompressorService) { }

  ngOnInit(): void {
  }

  items: any[] = []

  public item: any
  @Output() image = new EventEmitter<{image: string , size: number}>()
  @Input() set default_image(path: string) {
    if (path && path.toString().trim() != '')
      this.item = {image: path}
  }
  handleFileInput(file: any) {
    this.imageCompressorService.compress(file?.target?.files[0]).then(data => {
      this.image.emit(data)
      this.item = data
    })
  }


  remove() {
    this.item = null
  }
}
