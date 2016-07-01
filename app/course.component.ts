import { Component, Input,Output,EventEmitter, ElementRef } from '@angular/core';
import { Course } from './course';
import { StudyCareerComponent } from './studycareer.component';
import {NgClass} from '@angular/common';
import {PrerequisitesService} from './prerequisites.service';
import { Observable }     from 'rxjs/Observable';
import { Subject }     from 'rxjs/Subject';
import './rxjs-operators';
import {owl} from './deepCopy'

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

  isGood():boolean{
   return  (this.course.pass&&(this.prerequisitesService.prerequisites.some(e=>e == this.course.id)&& this.prerequisitesService.year> this.year)) ||
        (this.prerequisitesService.equalrequisites.some(e=>e == this.course.id)&& this.prerequisitesService.year >= this.year);
  }
  isWrong():boolean{
   return  (this.prerequisitesService.prerequisites.some(e=>e == this.course.id)&& this.prerequisitesService.year <= this.year) ||
        ((this.prerequisitesService.equalrequisites.some(e=>e == this.course.id)&& this.prerequisitesService.year < this.year)&&
       this.year== this.careerComponent.getYearOf(this.course.id, e=>true) );
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
  canGoBack():boolean{
    return !this.course.graduationyear && this.year>1 && this.careerComponent.program[this.year-2].courses.filter(e=>e.id ==this.course.id).length <= 0;
  }

  canGoForward():boolean{
    return !this.course.graduationyear && this.year< this.careerComponent.program.length && this.careerComponent.program[this.year].courses.filter(e=>e.id ==this.course.id).length <= 0;
  }

  isFinalYear():boolean{
    return this.course.prerequisites.some(e=>e<0);
  }
  set noPass(value:boolean){

    this.course.pass = !value;
    let clone =owl.copy(this.course);
    clone.pass =true;
    if(value){
      this.careerComponent.addCourse(clone, this.year, this.careerComponent.program[this.year-1].courses.indexOf(this.course));
    }else{
      this.careerComponent.removeCourseFromYears(this.course.id, this.year);
    }
  }
  set dispensation(value:boolean){
    this.course.dispensation = value;
  }

  buisClick(){
    this.noPass = this.course.pass;
    this.dispensation = false;

  }
  vrijstellingClick(){
      this.dispensation = !this.course.dispensation
      this.noPass = false;
  }

  moveBack(){this.moveBackEvent.emit(this.course)}
  moveForward(){this.moveForwardEvent.emit(this.course)}
  areRequisitesMet(): boolean{
    let good = true;
    for (let i = 0; i < this.course.prerequisites.length; i++) {
        good = good && this.year > this.careerComponent.getYearOf(this.course.prerequisites[i],e=>e.pass);
    }
    for (let i = 0; i < this.course.equalrequisites.length; i++) {
        good = good && this.year >= this.careerComponent.getYearOf(this.course.equalrequisites[i],e=>true);
    }
    return good;
  }
}
