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
var studycareer_component_1 = require('./studycareer.component');
var loaddialog_component_1 = require('./loaddialog.component');
var program_service_1 = require('./program.service');
var AppComponent = (function () {
    function AppComponent(programService) {
        this.programService = programService;
        this.overlay = false;
        this.loadDialog = false;
        this.feedbackDialog = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setUrl('data/mct-web.json');
        setTimeout(function () { _this.openLoadDialog(); }, 50);
    };
    AppComponent.prototype.setUrl = function (url) {
        var _this = this;
        this.programService.getProgram(url)
            .subscribe(function (result) { _this.program = result; }, function (error) { console.log(error); });
        this.closeOverlayNow();
    };
    AppComponent.prototype.setProgram = function (array) {
        this.program = array;
        this.closeOverlayNow();
    };
    AppComponent.prototype.openLoadDialog = function () {
        this.overlay = true;
        this.loadDialog = true;
        this.feedbackDialog = false;
    };
    AppComponent.prototype.openFeedback = function () {
        this.overlay = true;
        this.loadDialog = false;
        this.feedbackDialog = true;
    };
    AppComponent.prototype.closeOverlayNow = function () {
        this.overlay = false;
        this.loadDialog = false;
        this.feedbackDialog = false;
    };
    AppComponent.prototype.closeOverlay = function (e, overlayComp) {
        if (e.target == overlayComp) {
            this.closeOverlayNow();
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'body',
            templateUrl: 'app/app.component.html',
            directives: [studycareer_component_1.StudyCareerComponent, loaddialog_component_1.LoadDialog],
            providers: [program_service_1.ProgramService]
        }), 
        __metadata('design:paramtypes', [program_service_1.ProgramService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
