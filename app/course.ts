export class Course {
  constructor(
    public id : number,
    public name : string,
    public prerequisites : number[],
    public equalrequisites : number[],
    public graduationyear :boolean,
    public start : number,
    public duration : number,
    public studypoints : number,
    public pass : boolean,
    public dispensation : boolean,
    public url : string
  ) { }
}
