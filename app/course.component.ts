import { Component, Input,Output,EventEmitter, ElementRef } from '@angular/core';
import { Course } from './course';
import { StudyCareerComponent } from './studycareer.component';
import {NgClass} from '@angular/common';
import {PrerequisitesService} from './prerequisites.service';
import { Observable }     from 'rxjs/Observable';
import { Subject }     from 'rxjs/Subject';
import './rxjs-operators';

@Component({

  host:{
      "(mouseenter)":"mouseEnter()",
     "(mouseleave)":"mouseLeave()"
   },
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
  hoverObservable :Observable<any>;
  hoverSubscription: any;
  showOptions =false;

  constructor (private prerequisitesService : PrerequisitesService , private el: ElementRef){

    this.hoverObservable = new Observable(o=>{
      setTimeout(() => {
        o.next(2);
      }, 1000);
    });



  }

  isGood(){
   return  (this.prerequisitesService.prerequisites.some(e=>e == this.course.id)&& this.prerequisitesService.year> this.year) ||
        (this.prerequisitesService.equalrequisites.some(e=>e == this.course.id)&& this.prerequisitesService.year >= this.year);
  }
  isWrong(){
   return  (this.prerequisitesService.prerequisites.some(e=>e == this.course.id)&& this.prerequisitesService.year <= this.year) ||
        (this.prerequisitesService.equalrequisites.some(e=>e == this.course.id)&& this.prerequisitesService.year < this.year);
  }
  mouseEnter(){
    this.prerequisitesService.set(this.course.prerequisites,this.course.equalrequisites,this.year);
    if(this.hoverSubscription)
      this.hoverSubscription.unsubscribe();
    this.hoverSubscription = this.hoverObservable.subscribe(e=>{
      this.showOptions = true;
    });
  }
  mouseLeave(){
    this.prerequisitesService.clear();
    this.hoverSubscription.unsubscribe();
    this.showOptions =false;
  }

  isFinalYear():boolean{
    return this.course.prerequisites.some(e=>e<0);
  }

  buisClick(){
    this.course.pass = !this.course.pass;
    this.course.dispensation = false;
  }

  vrijstellingClick(){
      this.course.dispensation = !this.course.dispensation
      this.course.pass = true;
  }

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
