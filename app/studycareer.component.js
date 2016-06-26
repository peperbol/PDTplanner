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
    function StudyCareerComponent(programService) {
        this.programService = programService;
    }
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
    StudyCareerComponent.prototype.ngOnInit = function () { this.loadProgram(); };
    StudyCareerComponent.prototype.loadProgram = function () {
        var _this = this;
        this.programService.getProgram()
            .subscribe(function (result) { return _this.program = result; }, function (error) { return _this.errorMessage = error; });
    };
    StudyCareerComponent = __decorate([
        core_1.Component({
            selector: 'career',
            templateUrl: 'app/studycareer.component.html',
            directives: [year_component_1.YearComponent],
            providers: [program_service_1.ProgramService]
        }), 
        __metadata('design:paramtypes', [program_service_1.ProgramService])
    ], StudyCareerComponent);
    return StudyCareerComponent;
}());
exports.StudyCareerComponent = StudyCareerComponent;
