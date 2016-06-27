import { Component, Input,AfterViewChecked,OnInit, Renderer, ElementRef} from '@angular/core';
import { ProgramService } from './program.service';
import { Year }           from './year';
import { YearComponent } from './year.component';

@Component({
  selector: 'career',
  templateUrl: 'app/studycareer.component.html',
  directives: [YearComponent],
  providers: [ProgramService]
})
export class StudyCareerComponent implements OnInit{

  program: Year[];
  errorMessage: string;
  me = this;
  
  verticalscroll = 0;
  pageheight = 0;
  windowheight = 0;

  updateVerticalScroll(){
    this.verticalscroll = document.body.scrollTop;
    this.pageheight = document.body.offsetHeight;
    this.windowheight = window.innerHeight;
    console.log(document.body.offsetHeight);
  }
  distanceFromBottom():number{
    return Math.max(0,this.pageheight - this.verticalscroll - this.windowheight);
  }

  constructor (private el: ElementRef, private programService:ProgramService,private renderer: Renderer){}

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
  }
  getYearIndex(year:Year) : number{
    return this.program.indexOf(year);
  }
  addYear(){
    this.program.push({'order':this.program.length+1,'courses': []});
  }
  deleteYear(){
    if(this.program.length <= 1) return;
    let lastY = this.program.pop();
    this.program[this.program.length - 1].courses = this.program[this.program.length - 1].courses.concat(lastY.courses);
  }
  ngOnInit() {
    this.loadProgram();
      console.log('hey');
      setTimeout(()=>this.updateVerticalScroll(),100);
   }
  loadProgram(){
    this.programService.getProgram('mct-web')
                       .subscribe(
                          result => this.program = result,
                          error =>  this.errorMessage = <any>error
                       );
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
