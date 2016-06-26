"use strict";
var Course = (function () {
    function Course(id, name, prerequisites, start, duration, studypoints) {
        this.id = id;
        this.name = name;
        this.prerequisites = prerequisites;
        this.start = start;
        this.duration = duration;
        this.studypoints = studypoints;
    }
    return Course;
}());
exports.Course = Course;
