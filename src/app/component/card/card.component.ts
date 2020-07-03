import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from '../../class/pokemon-interface'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() pokemonUrl:string;
  @Input() pokemonStar:string;

  pokemon:Pokemon = {
    id:0,
    name:'',
    sprites:[],
    types: [],
    height:0,
    weight:0,
    moves:[],
    species:{}
  };

  classStar = false;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon(){
    this.pokemonService.getPokemon(this.pokemonUrl)
    .subscribe((poke : Pokemon) =>{
      this.pokemon = poke;
    },null,
    () => {this.classStar = this.pokemonStar === this.pokemon.name})
  }

  get types(){
    return this.pokemon.types.reduce( (current,next:any) => current + ' ' + next.type.name, '' )
  }

}
