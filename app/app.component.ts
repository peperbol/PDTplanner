import { Component } from '@angular/core';
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
export class AppComponent {

  constructor (private programService:ProgramService){}
  overlay = true;
  loadDialog = true;
  program : Year[];
  overlayComp:any;

  ngOnInit() {
      this.setUrl('data/mct-web.json');
   }
  setUrl(url){
    this.programService.getProgram(url)
                       .subscribe(
                          result => this.program = result,
                          error => {}
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
  }
  closeOverlayNow(){

      this.overlay = false;
      this.loadDialog = false;
  }
  closeOverlay(e, overlayComp){
    if (e.target == overlayComp){
      this.closeOverlayNow();
    }
  }
}
