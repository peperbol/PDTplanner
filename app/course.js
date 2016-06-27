"use strict";
var Course = (function () {
    function Course(id, name, prerequisites, equalrequisites, start, duration, studypoints, url) {
        this.id = id;
        this.name = name;
        this.prerequisites = prerequisites;
        this.equalrequisites = equalrequisites;
        this.start = start;
        this.duration = duration;
        this.studypoints = studypoints;
        this.url = url;
    }
    return Course;
}());
exports.Course = Course;
