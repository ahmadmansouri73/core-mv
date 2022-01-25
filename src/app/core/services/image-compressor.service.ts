import { Injectable } from '@angular/core';
import {NgxImageCompressService} from 'ngx-image-compress';


@Injectable({
  providedIn: 'root'
})
export class ImageCompressorService {

  constructor(private imageCompressService: NgxImageCompressService) { }



  compress(image: File): Promise<{ image: string, size: number }> {
    const imageSize = image.size
    let bestQuality = 30
    switch (true) {
      case imageSize <= 200_000: // <= 200 Kb
        bestQuality = 70
        break
      case imageSize <= 2_000_000: // <= 2 MB
        bestQuality = 60
        break
      case imageSize <= 5_000_000: //  <= 5 MB
        bestQuality = 40
        break
    }
    return this.getAppropriateRatio(image).then(result => {
      return this.imageCompressService.compressFile(result.image, 0, result.ratio, bestQuality).then(compressedImage => {
        return {image: compressedImage, size: this.imageCompressService.byteCount(compressedImage)}
      })
    })
  }


  private getAppropriateRatio(image: any): Promise<{ image: string, ratio: number }> {
    return new Promise((resolve => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const loadedImage = event.target.result
        const img = new Image()
        img.onload = () => {
          const width = img.width
          const height = img.height
          const max = Math.max(width, height)
          const appropriateRatio = max > 1_000 ? 1_000 * 100 / max : 100
          resolve({image: loadedImage, ratio: appropriateRatio})
        }
        img.src = loadedImage
      }
      reader.readAsDataURL(image);
    }))
  }





}
