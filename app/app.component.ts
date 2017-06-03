import { Component, OnInit } from '@angular/core';
import { StudyCareerComponent } from './studycareer.component';
import { LoadDialog } from './loaddialog.component';
import { ProgramService } from './program.service';
import { Year }           from './year';
@Component({
  selector: 'body',
  templateUrl: 'app/app.component.html',
  directives: [StudyCareerComponent,LoadDialog],
  providers: [ProgramService]
})
export class AppComponent implements OnInit{

  overlay = false;
  loadDialog = false;
  feedbackDialog = false;
  program : Year[];
  overlayComp:any;
  url:"";

  constructor (private programService:ProgramService){

  }
  ngOnInit() {
      this.setUrl('?limit=1');
      setTimeout(()=>{this.openLoadDialog()},50);
   }
  setUrl(url){
    this.url = url;
    this.programService.getProgram(url)
                       .subscribe(
                          result => {this.program = result},
                          error => {console.log(error)}
                       );
    this.closeOverlayNow();
  }
  setProgram(array){
    this.program = array;
    this.closeOverlayNow();
  }
  openLoadDialog(){
    this.overlay = true;
    this.loadDialog = true;
    this.feedbackDialog = false;
  }
  reloadMDT(){
    this.setUrl(this.url);
  }
  openFeedback(){
    this.overlay = true;
    this.loadDialog = false;
    this.feedbackDialog = true;
  }
  closeOverlayNow(){
      this.overlay = false;
      this.loadDialog = false;
      this.feedbackDialog = false;
  }
  closeOverlay(e, overlayComp){
    if (e.target == overlayComp){
      this.closeOverlayNow();
    }
  }
}
