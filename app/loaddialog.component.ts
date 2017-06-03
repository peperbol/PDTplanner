import { Component, Output,EventEmitter, OnInit } from '@angular/core';
import { Mobile } from './mobile.service';
import { ProgramService } from './program.service';

@Component({
  selector: '.loaddialog',
  templateUrl: 'app/loaddialog.component.html',
  providers: [ Mobile, ProgramService ]
})
export class LoadDialog implements OnInit {
  constructor ( private mobile:Mobile, private http: ProgramService){}

  filemode = false;
  file:any ;
  filejson:any;
  filename  = "Kies een file...";

  mdtOptions =[];
  selectedProgram ="";
  selectedMdt ="";

  @Output() loadMdtEvent = new EventEmitter();
  @Output() loadJsonEvent = new EventEmitter();

  mdtPrograms(){
    return this.mdtOptions.reduce((arr,el)=>(arr.some(e=>e.program == el.program)?arr:arr.concat([el])), [])
    .sort(function(a, b) { return (a.program.toUpperCase() < b.program.toUpperCase())? -1:((a.program.toUpperCase() > b.program.toUpperCase())?1:0)});
  }
  filteredMdt(){
      return this.mdtOptions.filter(e=>e.program == this.selectedProgram)
      .sort(function(a, b) { return (a.graduationprogram.toUpperCase() < b.graduationprogram.toUpperCase())? -1:((a.graduationprogram.toUpperCase() > b.graduationprogram.toUpperCase())?1:0)});
  }
  ngOnInit(){
    this.http.getCareers().subscribe(
       result => {
         this.mdtOptions = result.sort(function(a,b){return (a.program + a.graduationprogram).localeCompare(b.program + b.graduationprogram);});
       });

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
      this.loadMdtEvent.emit(this.selectedMdt)
    }
  }
  loadFile(){
    if(this.filejson){
      this.loadJsonEvent.emit(this.filejson)
    }
  }
 }
