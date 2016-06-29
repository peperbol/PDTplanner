import { Component, Output,EventEmitter } from '@angular/core';

@Component({
  selector: '.loaddialog',
  templateUrl: 'app/loaddialog.component.html'
})
export class LoadDialog {

  filemode = false;
  file:any ;
  filejson:any;
  filename  = "Kies een file...";

  mdtUrl = "data/";
  mdtOptions = {'MCT: Audio Video':'mct-av.json',
                'MCT: Web & UX':'mct-web.json',
                'MCT: Virtual & 3D':'mct-vir.json',
                }
  selectedMdt ="";

  @Output() loadMdtEvent = new EventEmitter();
  @Output() loadJsonEvent = new EventEmitter();

  mdtKeys() : string[] {
   return Object.keys(this.mdtOptions);
  }

  onFileChange(event) {
    this.file = event.srcElement.files[0];
    if(this.file){
      this.filename =this.file.name;


      let fr = new FileReader();
      var me = this;
      fr.onload = e=> {
        let t :any = e.target
        me.filejson = JSON.parse(t.result).data;
      };
      fr.readAsText(this.file);

    } else{
      this.filename ="Kies een file..."
      this.filejson = null;
    }
    console.log(this.filejson);
  }
  loadMdt(){
    if(this.selectedMdt){
      this.loadMdtEvent.emit(this.mdtUrl+this.selectedMdt)
    }
  }

  loadFile(){
    if(this.filejson){
      this.loadJsonEvent.emit(this.filejson)
    }
  }
 }
