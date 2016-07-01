"use strict";
var Course = (function () {
    function Course(id, name, prerequisites, equalrequisites, graduationyear, start, duration, studypoints, pass, dispensation, url) {
        this.id = id;
        this.name = name;
        this.prerequisites = prerequisites;
        this.equalrequisites = equalrequisites;
        this.graduationyear = graduationyear;
        this.start = start;
        this.duration = duration;
        this.studypoints = studypoints;
        this.pass = pass;
        this.dispensation = dispensation;
        this.url = url;
    }
    return Course;
}());
exports.Course = Course;
