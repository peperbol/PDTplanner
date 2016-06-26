import { Course } from './course';

export class Year {
  constructor(
    public order: number,
    public courses: Course[]) { }

}
