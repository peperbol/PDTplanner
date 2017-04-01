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
var mobile_service_1 = require('./mobile.service');
var program_service_1 = require('./program.service');
var LoadDialog = (function () {
    function LoadDialog(mobile, http) {
        this.mobile = mobile;
        this.http = http;
        this.filemode = false;
        this.filename = "Kies een file...";
        this.mdtOptions = [];
        this.selectedProgram = "";
        this.selectedMdt = "";
        this.loadMdtEvent = new core_1.EventEmitter();
        this.loadJsonEvent = new core_1.EventEmitter();
    }
    LoadDialog.prototype.mdtPrograms = function () {
        return this.mdtOptions.reduce(function (arr, el) { return (arr.some(function (e) { return e.program == el.program; }) ? arr : arr.concat([el])); }, []);
    };
    LoadDialog.prototype.filteredMdt = function () {
        var _this = this;
        return this.mdtOptions.filter(function (e) { return e.program == _this.selectedProgram; });
    };
    LoadDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.http.getCareers().subscribe(function (result) {
            _this.mdtOptions = result.sort(function (a, b) { return (a.program + a.graduationprogram).localeCompare(b.program + b.graduationprogram); });
        });
    };
    LoadDialog.prototype.onFileChange = function (event) {
        this.file = event.srcElement.files[0];
        if (this.file) {
            this.filename = this.file.name;
            var fr = new FileReader();
            var me = this;
            fr.onload = function (e) {
                var t = e.target;
                me.filejson = JSON.parse(t.result).data;
            };
            fr.readAsText(this.file);
        }
        else {
            this.filename = "Kies een file...";
            this.filejson = null;
        }
        console.log(this.filejson);
    };
    LoadDialog.prototype.loadMdt = function () {
        if (this.selectedMdt) {
            this.loadMdtEvent.emit(this.selectedMdt);
        }
    };
    LoadDialog.prototype.loadFile = function () {
        if (this.filejson) {
            this.loadJsonEvent.emit(this.filejson);
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LoadDialog.prototype, "loadMdtEvent", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LoadDialog.prototype, "loadJsonEvent", void 0);
    LoadDialog = __decorate([
        core_1.Component({
            selector: '.loaddialog',
            templateUrl: 'app/loaddialog.component.html',
            providers: [mobile_service_1.Mobile, program_service_1.ProgramService]
        }), 
        __metadata('design:paramtypes', [mobile_service_1.Mobile, program_service_1.ProgramService])
    ], LoadDialog);
    return LoadDialog;
}());
exports.LoadDialog = LoadDialog;
