import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Year }           from './year';
import { Course }           from './course';
import { CourseComponent } from './course.component';
import { StudyCareerComponent } from './studycareer.component';
@Component({
  selector: 'year',
  templateUrl: 'app/year.component.html',
  directives: [CourseComponent],
})
export class YearComponent {

  @Input() year: Year;
  
  @Output() moveBackEvent = new EventEmitter();
  @Output() moveForwardEvent = new EventEmitter();
  @Input() careerComponent: StudyCareerComponent ;
  @Input() distanceFromBottom: number ;

  moveCourseBack(course:Course){
    this.moveBackEvent.emit({'year':this.year,'index':this.getCourseIndex(course) })
  }
  moveCourseForward(course:Course){
    this.moveForwardEvent.emit({'year':this.year,'index':this.getCourseIndex(course) })
  }
  getCourseIndex(course:Course){
    return this.year.courses.indexOf(course);
  }
  getTotalPoints(){
    if (this.year.courses.length > 0)
      return Math.round(this.year.courses.map(e=>e.studypoints).reduce((t,e)=>t+e));
    return 0;
  }
  getTotalPointsOfP(p :number){
    if (this.year.courses.filter(e => ((e.start)<=p)&&((e.start+e.duration)>p)).length > 0)
      return Math.round( this.year.courses.filter(e => ((e.start)<=p)&&((e.start+e.duration)>p)).map(e=>e.studypoints/e.duration).reduce((t,e)=>t+e));
    return 0;
  }
}
