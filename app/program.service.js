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
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('./rxjs-operators');
var ProgramService = (function () {
    function ProgramService(http) {
        this.http = http;
        this.url = "http://146.185.168.179:1337/parse/";
        this.header = { headers: new http_2.Headers() };
        this.header.headers.append("X-Parse-Application-Id", "PDT");
        this.header.headers.append("Content-Type", "application/json");
    }
    ProgramService.prototype.getProgram = function (id) {
        return this.http.get(this.url + "classes/programs/" + id, this.header)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProgramService.prototype.extractData = function (res) {
        var body = res.json();
        return body.years || body.results[0].years || [];
    };
    ProgramService.prototype.getCareers = function () {
        return this.http.get(this.url + "classes/programs?keys=objectId,graduationprogram,program", this.header)
            .map(function (e) { return e.json().results; })
            .catch(this.handleError);
    };
    ProgramService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    ProgramService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProgramService);
    return ProgramService;
}());
exports.ProgramService = ProgramService;
