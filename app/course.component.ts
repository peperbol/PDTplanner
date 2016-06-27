import { Component, Input,Output,EventEmitter } from '@angular/core';
import { Course } from './course';
import { StudyCareerComponent } from './studycareer.component';
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
  @Input() year :number;
  @Input() careerComponent: StudyCareerComponent;


  moveBack(){this.moveBackEvent.emit(this.course)}
  moveForward(){this.moveForwardEvent.emit(this.course)}
  areRequisitesMet(): boolean{
    let good = true;
    for (let i = 0; i < this.course.prerequisites.length; i++) {
        good = good && this.year > this.careerComponent.getYearOf(this.course.prerequisites[i]);
    }
    for (let i = 0; i < this.course.equalrequisites.length; i++) {
        good = good && this.year >= this.careerComponent.getYearOf(this.course.equalrequisites[i]);
    }
    return good;
  }
}
