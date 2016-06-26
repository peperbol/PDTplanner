"use strict";
var Course = (function () {
    function Course(id, name, prerequisites, start, duration) {
        this.id = id;
        this.name = name;
        this.prerequisites = prerequisites;
        this.start = start;
        this.duration = duration;
    }
    return Course;
}());
exports.Course = Course;
