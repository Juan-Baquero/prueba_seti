import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from 'src/app/core/data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 pokemons: Observable<any>[];
 pokemon_1={name:"Pokemon 1",id:0}
 pokemon_2={name:"Pokemon 2",id:0}
 index=0;
 loader=false;
   constructor(public service:DataService   ) { }
  ngOnInit() {
    Promise.all(this.service.consultas)
    .then(data =>   this.pokemons= data)
    .catch(error => console.log(error))
   
  }

  setPokemon(pokemon){
    this.index+=1;
    if(this.index%2==1)this.pokemon_1=pokemon;
    if(this.index%2==0)this.pokemon_2=pokemon;

  }
}
