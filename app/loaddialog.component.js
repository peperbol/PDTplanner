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
var LoadDialog = (function () {
    function LoadDialog() {
        this.filemode = false;
        this.filename = "Kies een file...";
        this.mdtUrl = "data/";
        this.mdtOptions = { 'MCT: Audio Video': 'mct-av.json',
            'MCT: Web & UX': 'mct-web.json',
            'MCT: Virtual & 3D': 'mct-vir.json',
        };
        this.selectedMdt = "";
        this.loadMdtEvent = new core_1.EventEmitter();
        this.loadJsonEvent = new core_1.EventEmitter();
    }
    LoadDialog.prototype.mdtKeys = function () {
        return Object.keys(this.mdtOptions);
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
            this.loadMdtEvent.emit(this.mdtUrl + this.selectedMdt);
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
            templateUrl: 'app/loaddialog.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], LoadDialog);
    return LoadDialog;
}());
exports.LoadDialog = LoadDialog;
