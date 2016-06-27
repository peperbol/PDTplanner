export class Course {
  constructor(
    public id : number,
    public name : string,
    public prerequisites : number[],
    public equalrequisites : number[],
    public start : number,
    public duration : number,
    public studypoints : number,
    public url : string
  ) { }
}
