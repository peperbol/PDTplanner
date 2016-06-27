import { Component, Input,Output,EventEmitter } from '@angular/core';
import { Course }           from './course';
import {NgClass} from '@angular/common';

@Component({
  selector: 'course',
  templateUrl: 'app/course.component.html',
  directives: [NgClass]
})
export class CourseComponent {

  @Input() course: Course;
  @Output() moveBackEvent = new EventEmitter();
  @Output() moveForwardEvent = new EventEmitter();

  moveBack(){this.moveBackEvent.emit(this.course)}
  moveForward(){this.moveForwardEvent.emit(this.course)}
  RequisitesAreValid(): Bool{
    
  }
}
