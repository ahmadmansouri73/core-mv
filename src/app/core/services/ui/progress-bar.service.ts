import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  constructor() { }

  private progress_count: number = 0;


  public add(): void {
    this.progress_count ++
  }

  public clear(): void {
    if (this.progress_count > 0)
      this.progress_count --
  }


  public status(): boolean {
    return this.progress_count > 0
  }

}
