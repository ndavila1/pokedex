import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/class/pokemon-interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute) { }

  name = ''
  url = '';
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
  evoChain = [];
  load = false;

  
  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
    this.url = 'https://pokeapi.co/api/v2/pokemon/'+this.name;
    this.getPokemon()
  }

  getPokemon(){
    this.pokemonService.getPokemon(this.url)
    .subscribe((poke : Pokemon) =>{
      this.pokemon = poke;
    },null,
    () => this.getEvol())
  }

  getEvol(){
    this.pokemonService.getPokemon(this.pokemon.species.url)
    .subscribe( evo_chain =>{
      this.pokemonService.getPokemon(evo_chain.evolution_chain.url)
      .subscribe( chain =>{
        var evoData = chain.chain;
        do {
          let numberOfEvolutions = evoData.evolves_to.length; 
          this.evoChain.push({
            "species_name": evoData.species.name,
            "url": 'https://pokeapi.co/api/v2/pokemon/'+ evoData.species.name
          });
        
          if(numberOfEvolutions > 1) {
            for (let i = 1;i < numberOfEvolutions; i++) { 
              this.evoChain.push({
                "name": evoData.evolves_to[i].species.name,
                "url": 'https://pokeapi.co/api/v2/pokemon/'+ evoData.evolves_to[i].species.name
             });
            }
          }        
        
          evoData = evoData.evolves_to[0];
        
        } while (evoData != undefined && evoData.hasOwnProperty('evolves_to'));
      },null,()=> {console.log(this.evoChain); this.load=true})
    })
    
  }

}
