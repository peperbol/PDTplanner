"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var year_1 = require('./year');
var course_component_1 = require('./course.component');
var studycareer_component_1 = require('./studycareer.component');
var YearComponent = (function () {
    function YearComponent() {
        this.moveBackEvent = new core_1.EventEmitter();
        this.moveForwardEvent = new core_1.EventEmitter();
    }
    YearComponent.prototype.moveCourseBack = function (course) {
        this.moveBackEvent.emit({ 'year': this.year, 'index': this.getCourseIndex(course) });
    };
    YearComponent.prototype.moveCourseForward = function (course) {
        this.moveForwardEvent.emit({ 'year': this.year, 'index': this.getCourseIndex(course) });
    };
    YearComponent.prototype.getCourseIndex = function (course) {
        return this.year.courses.indexOf(course);
    };
    YearComponent.prototype.getTotalPoints = function () {
        if (this.year.courses.length > 0)
            return Math.round(this.year.courses.map(function (e) { return e.studypoints; }).reduce(function (t, e) { return t + e; }));
        return 0;
    };
    YearComponent.prototype.getTotalPointsOfP = function (p) {
        if (this.year.courses.filter(function (e) { return ((e.start) <= p) && ((e.start + e.duration) > p); }).length > 0)
            return Math.round(this.year.courses.filter(function (e) { return ((e.start) <= p) && ((e.start + e.duration) > p); }).map(function (e) { return e.studypoints / e.duration; }).reduce(function (t, e) { return t + e; }));
        return 0;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', year_1.Year)
    ], YearComponent.prototype, "year", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], YearComponent.prototype, "moveBackEvent", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], YearComponent.prototype, "moveForwardEvent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', studycareer_component_1.StudyCareerComponent)
    ], YearComponent.prototype, "careerComponent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], YearComponent.prototype, "distanceFromBottom", void 0);
    YearComponent = __decorate([
        core_1.Component({
            selector: 'year',
            templateUrl: 'app/year.component.html',
            directives: [course_component_1.CourseComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], YearComponent);
    return YearComponent;
}());
exports.YearComponent = YearComponent;
