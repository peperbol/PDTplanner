import { Injectable } from '@angular/core';

@Injectable()
export class PrerequisitesService {
  public prerequisites : number[] = [];
  public equalrequisites : number[]= [] ;
  public year :number = 0;
  public locked  =false;
  public clear(){
    if(this.locked) return;
    this.prerequisites = [];
    this.equalrequisites = [];
    this.year = 0;
  }
  public set(
      prerequisites : number[],
      equalrequisites : number[],
      year :number
    ){
      if(this.locked) return;
      this.prerequisites =prerequisites;
      this.equalrequisites =equalrequisites;
      this.year =year;
  }
}
