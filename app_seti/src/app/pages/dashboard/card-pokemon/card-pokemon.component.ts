import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.scss']
})
export class CardPokemonComponent implements OnInit {
  @Input() data;
  @Input() width = 60;
  @Input() vWidth = 200;
  @Input() height = 60;
  @Output() sendPokemon = new EventEmitter<any>();
  constructor(public service: DataService) { }

  ngOnInit(): void {
  }
  onClick() {
    if (this.data != null) this.sendPokemon.emit(this.data)
  }
  getTypes(types) {
    let ans = '';
    if (types != undefined) {
      types.forEach(e => {
        ans += e.type.name + ' ';
      });
      ans.slice(-4);
    }

    return ans;
  }
}
