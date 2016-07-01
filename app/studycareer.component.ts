import { Component, Input,EventEmitter, Output,AfterViewChecked,OnInit, Renderer, ElementRef} from '@angular/core';
import { ProgramService } from './program.service';
import { Year }           from './year';
import { Course }           from './course';
import { YearComponent } from './year.component';
import {PrerequisitesService} from './prerequisites.service';
import { Observable }     from 'rxjs/Observable';
import './rxjs-operators';

@Component({
  selector: 'career',
  templateUrl: 'app/studycareer.component.html',
  directives: [YearComponent],
  providers: [PrerequisitesService]
})
export class StudyCareerComponent implements OnInit{

  @Input() program: Year[];
  errorMessage: string;
  me = this;

  verticalscroll = 0;
  pageheight = 0;
  windowheight = 0;
  scrolling =false;
  scrollingObservable :Observable<any>;


  @Output() openLoadDialogEvent = new EventEmitter();

  updateVerticalScroll(scroll){
    this.verticalscroll = document.body.scrollTop;
    this.pageheight = document.body.offsetHeight;
    this.windowheight = window.innerHeight;
    this.scrolling= scroll;
  }
  distanceFromBottom():number{
    return Math.max(0,this.pageheight - this.verticalscroll - this.windowheight);
  }
  constructor (private el: ElementRef, private programService:ProgramService,private renderer: Renderer){
    this.scrollingObservable = Observable.fromEvent(document,"scroll")
                                          .debounceTime(300)
                                          .distinctUntilChanged();
    this.scrollingObservable.subscribe(e=>{
      this.scrolling = false;
    });

  }

  moveCourseBack(index:number, year:Year){
    this.moveCourse(year,this.program[this.getYearIndex(year)-1],index)
  }
  moveCourseForward(index:number, year:Year){

      this.moveCourse(year,this.program[this.getYearIndex(year)+1],index)
  }
  moveCourse(fromY:Year, toY:Year, index:number){

      let course = fromY.courses[index];
      fromY.courses.splice (index,1);
      if(toY.courses.length> index)
      {
        toY.courses.splice(index,0, course);
      }else{
        toY.courses.push(course);
      }

      setTimeout(()=>this.updateVerticalScroll(false),50);
  }
  getYearIndex(year:Year) : number{
    return this.program.indexOf(year);
  }
  addYear(){
    let courses : Course[];
    courses = this.program[this.program.length-1].courses.filter(e=>e.graduationyear);
    this.program[this.program.length-1].courses = this.program[this.program.length-1].courses.filter(e=>!e.graduationyear);
    this.program.push({'order':this.program.length+1,'courses': courses});

    setTimeout(()=>{
      this.updateVerticalScroll(false);

    },50);
  }
  deleteYear(){
    if(this.program.length <= 1) return;
    let lastY = this.program.pop();
    this.program[this.program.length - 1].courses = this.program[this.program.length - 1].courses.concat(lastY.courses);

    setTimeout(()=>this.updateVerticalScroll(false),50);
  }
  ngOnInit() {
      setTimeout(()=>this.updateVerticalScroll(false),50);
   }


  openLoadDialog(){
    this.openLoadDialogEvent.emit({});
  }
  saveFile(){
    let blob = new Blob([JSON.stringify({'data':this.program})], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "mijnstudietraject.json");
  }

  isValid():boolean{
    let elements : any[] = this.el.nativeElement.querySelector("course .invalid");
    if(!elements) return true;
    return  elements.length <= 0;
  }
  getYearOf(courseId:number): number{
    let result = -1;
    let i = 0;
    while (result < 0 && i< this.program.length){
      if(this.program[i].courses.some(e=>e.id == courseId)){
        result = this.program[i].order;
      }
      i++;
    }
    return result;
  }
}
