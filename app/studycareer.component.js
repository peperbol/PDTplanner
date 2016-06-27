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
var program_service_1 = require('./program.service');
var year_component_1 = require('./year.component');
var StudyCareerComponent = (function () {
    function StudyCareerComponent(el, programService, renderer) {
        this.el = el;
        this.programService = programService;
        this.renderer = renderer;
        this.me = this;
        this.verticalscroll = 0;
        this.pageheight = 0;
        this.windowheight = 0;
    }
    StudyCareerComponent.prototype.updateVerticalScroll = function () {
        this.verticalscroll = document.body.scrollTop;
        this.pageheight = document.body.offsetHeight;
        this.windowheight = window.innerHeight;
        console.log(document.body.offsetHeight);
    };
    StudyCareerComponent.prototype.distanceFromBottom = function () {
        return Math.max(0, this.pageheight - this.verticalscroll - this.windowheight);
    };
    StudyCareerComponent.prototype.moveCourseBack = function (index, year) {
        this.moveCourse(year, this.program[this.getYearIndex(year) - 1], index);
    };
    StudyCareerComponent.prototype.moveCourseForward = function (index, year) {
        this.moveCourse(year, this.program[this.getYearIndex(year) + 1], index);
    };
    StudyCareerComponent.prototype.moveCourse = function (fromY, toY, index) {
        var course = fromY.courses[index];
        fromY.courses.splice(index, 1);
        if (toY.courses.length > index) {
            toY.courses.splice(index, 0, course);
        }
        else {
            toY.courses.push(course);
        }
    };
    StudyCareerComponent.prototype.getYearIndex = function (year) {
        return this.program.indexOf(year);
    };
    StudyCareerComponent.prototype.addYear = function () {
        this.program.push({ 'order': this.program.length + 1, 'courses': [] });
    };
    StudyCareerComponent.prototype.deleteYear = function () {
        if (this.program.length <= 1)
            return;
        var lastY = this.program.pop();
        this.program[this.program.length - 1].courses = this.program[this.program.length - 1].courses.concat(lastY.courses);
    };
    StudyCareerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadProgram();
        console.log('hey');
        setTimeout(function () { return _this.updateVerticalScroll(); }, 100);
    };
    StudyCareerComponent.prototype.loadProgram = function () {
        var _this = this;
        this.programService.getProgram('mct-web')
            .subscribe(function (result) { return _this.program = result; }, function (error) { return _this.errorMessage = error; });
    };
    StudyCareerComponent.prototype.isValid = function () {
        var elements = this.el.nativeElement.querySelector("course .invalid");
        if (!elements)
            return true;
        return elements.length <= 0;
    };
    StudyCareerComponent.prototype.getYearOf = function (courseId) {
        var result = -1;
        var i = 0;
        while (result < 0 && i < this.program.length) {
            if (this.program[i].courses.some(function (e) { return e.id == courseId; })) {
                result = this.program[i].order;
            }
            i++;
        }
        return result;
    };
    StudyCareerComponent = __decorate([
        core_1.Component({
            selector: 'career',
            templateUrl: 'app/studycareer.component.html',
            directives: [year_component_1.YearComponent],
            providers: [program_service_1.ProgramService]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, program_service_1.ProgramService, core_1.Renderer])
    ], StudyCareerComponent);
    return StudyCareerComponent;
}());
exports.StudyCareerComponent = StudyCareerComponent;
