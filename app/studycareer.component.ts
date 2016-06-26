import { Component, Input,OnInit } from '@angular/core';
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

  constructor (private programService:ProgramService){}

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
  ngOnInit() { this.loadProgram(); }

  loadProgram(){
    this.programService.getProgram('mct-web')
                       .subscribe(
                          result => this.program = result,
                          error =>  this.errorMessage = <any>error
                       );
  }
}
