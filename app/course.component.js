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
var course_1 = require('./course');
var studycareer_component_1 = require('./studycareer.component');
var common_1 = require('@angular/common');
var prerequisites_service_1 = require('./prerequisites.service');
var CourseComponent = (function () {
    function CourseComponent(prerequisitesService) {
        this.prerequisitesService = prerequisitesService;
        this.moveBackEvent = new core_1.EventEmitter();
        this.moveForwardEvent = new core_1.EventEmitter();
    }
    CourseComponent.prototype.isGood = function () {
        var _this = this;
        return (this.prerequisitesService.prerequisites.some(function (e) { return e == _this.course.id; }) && this.prerequisitesService.year > this.year) ||
            (this.prerequisitesService.equalrequisites.some(function (e) { return e == _this.course.id; }) && this.prerequisitesService.year >= this.year);
    };
    CourseComponent.prototype.isWrong = function () {
        var _this = this;
        return (this.prerequisitesService.prerequisites.some(function (e) { return e == _this.course.id; }) && this.prerequisitesService.year <= this.year) ||
            (this.prerequisitesService.equalrequisites.some(function (e) { return e == _this.course.id; }) && this.prerequisitesService.year < this.year);
    };
    CourseComponent.prototype.mouseEnter = function () {
        this.prerequisitesService.set(this.course.prerequisites, this.course.equalrequisites, this.year);
    };
    CourseComponent.prototype.mouseLeave = function () {
        this.prerequisitesService.clear();
    };
    CourseComponent.prototype.isFinalYear = function () {
        return this.course.prerequisites.some(function (e) { return e < 0; });
    };
    CourseComponent.prototype.moveBack = function () { this.moveBackEvent.emit(this.course); };
    CourseComponent.prototype.moveForward = function () { this.moveForwardEvent.emit(this.course); };
    CourseComponent.prototype.areRequisitesMet = function () {
        var good = true;
        for (var i = 0; i < this.course.prerequisites.length; i++) {
            good = good && this.year > this.careerComponent.getYearOf(this.course.prerequisites[i]);
        }
        for (var i = 0; i < this.course.equalrequisites.length; i++) {
            good = good && this.year >= this.careerComponent.getYearOf(this.course.equalrequisites[i]);
        }
        return good;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', course_1.Course)
    ], CourseComponent.prototype, "course", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CourseComponent.prototype, "moveBackEvent", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CourseComponent.prototype, "moveForwardEvent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CourseComponent.prototype, "year", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', studycareer_component_1.StudyCareerComponent)
    ], CourseComponent.prototype, "careerComponent", void 0);
    CourseComponent = __decorate([
        core_1.Component({
            selector: 'course',
            templateUrl: 'app/course.component.html',
            directives: [common_1.NgClass]
        }), 
        __metadata('design:paramtypes', [prerequisites_service_1.PrerequisitesService])
    ], CourseComponent);
    return CourseComponent;
}());
exports.CourseComponent = CourseComponent;
