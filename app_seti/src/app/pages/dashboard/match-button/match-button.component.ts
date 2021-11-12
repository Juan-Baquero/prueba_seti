import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
@Component({
  selector: 'app-match-button',
  templateUrl: './match-button.component.html',
  styleUrls: ['./match-button.component.scss']
})
export class MatchButtonComponent implements OnInit {
  //--Excel
  title = 'dropzone';
  files: File[] = [];
  //--
  @Input() pokemon_1;
  @Input() pokemon_2;
  pokemon
  closeResult = '';
  isOpen = false;

  display: boolean;
  resultado='GANADOR';
  @Output() sendLoader = new EventEmitter<any>();
  constructor( private service: DataService) {

  }
  ngOnInit() {


  }
  open() {
    this.sendLoader.emit(true);
    this.service.getResultMatch(this.pokemon_1.id, this.pokemon_2.id).toPromise().then(result => {
     
     if(result.pokemon_1.total==result.pokemon_2.total){this.pokemon={name:'',id:-1};
    this.resultado='EMPATE'
    }else this.resultado='GANADOR'
     if(result.pokemon_1.total>result.pokemon_2.total)this.pokemon=result.pokemon_1;
     if(result.pokemon_2.total>result.pokemon_1.total)this.pokemon=result.pokemon_2;
     this.display=true;
     this.sendLoader.emit(false);
        });
   
  }







}
