import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Year }           from './year';
import { Course }           from './course';
import { CourseComponent } from './course.component';
@Component({
  selector: 'year',
  templateUrl: 'app/year.component.html',
  directives: [CourseComponent],
})
export class YearComponent {
  @Input() year: Year;

  @Output() moveBackEvent = new EventEmitter();
  @Output() moveForwardEvent = new EventEmitter();

  moveCourseBack(course:Course){
    this.moveBackEvent.emit({'year':this.year,'index':this.getCourseIndex(course) })
  }
  moveCourseForward(course:Course){
    this.moveForwardEvent.emit({'year':this.year,'index':this.getCourseIndex(course) })
  }
  getCourseIndex(course:Course){
    return this.year.courses.indexOf(course);
  }
  
}
