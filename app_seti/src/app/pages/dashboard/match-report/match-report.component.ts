import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
@Component({
  selector: 'app-match-report',
  templateUrl: './match-report.component.html',
  styleUrls: ['./match-report.component.scss']
})
export class MatchReportComponent implements OnInit {
  //--Excel
  title = 'dropzone';
  files: File[] = [];
  //--
  closeResult = '';
  isOpen = false;
  data: any;
  display: boolean;

  @Output() sendLoader = new EventEmitter<any>();
  constructor( private service: DataService) {
  }
  ngOnInit() {
  }
  open() {
 this.sendLoader.emit(true);
    this.service.getReportMatch().toPromise().then(result => {
     
     
     this.data=result;
     this.display=true;
     this.sendLoader.emit(false);
     console.log(Object.keys(this.data[0]));
     
    });
   
  }







}
