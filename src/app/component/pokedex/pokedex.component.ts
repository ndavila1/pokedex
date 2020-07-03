import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {

  offset:number=0;
  litsPagePokemon:Array<any>=[];
  searchForm:FormGroup;
  previosPage:boolean=true;
  nextPage:boolean=false;
  filterPokemon = []

  constructor(private router:Router, private pokemonService: PokemonService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      name: new FormControl(''),
      type: new FormControl('')
    });
    this.getPokemonPag(50);
  }

  getPokemonPag(limit:number){
    this.pokemonService.getPagination(this.offset,limit).subscribe((value:any) => {
      this.litsPagePokemon = value.results;
    })
  }

  search(){
    if (this.searchForm.value.type === '' && this.searchForm.value.name === '') {
      this.getPokemonPag(50);
      this.nextPage = false;
      this.previosPage = false;
      return;
    }
    
    this.nextPage = true;
    this.previosPage = true;
    this.filterPokemon = []
    var regexName = '([a-zA-Z]|'+this.searchForm.value.name+')*'+this.searchForm.value.name+'([a-zA-Z]|'+this.searchForm.value.name+')*$'
    if (this.searchForm.value.type === '' && this.searchForm.value.name !== '') {
      this.pokemonService.getPokemon('https://pokeapi.co/api/v2/pokemon?limit=807&offset=0').subscribe(
        poke =>{
          var pokeFilter = poke.results;
          pokeFilter.forEach(element => {
            if (element.name.match(regexName)) {
              this.filterPokemon.push(element)
            }
          });
        },null,
        () =>{
          this.litsPagePokemon = this.filterPokemon
        }
      ); 
    } else if(this.searchForm.value.type !== ''){
      var regexType = '([a-zA-Z]|'+this.searchForm.value.type+')*'+this.searchForm.value.type+'([a-zA-Z]|'+this.searchForm.value.type+')*$'
      var typeFilter = []
      for (var type in Type) {
        if (type.match(regexType)) {
          typeFilter.push(type)
        }
      }
      typeFilter.forEach(element => {
        this.litsPagePokemon = []
        this.pokemonService.getPokemon('https://pokeapi.co/api/v2/type/'+element).subscribe(
          poke =>{
            this.filterPokemon = poke.pokemon;
            if (this.searchForm.value.name === '') {
                this.filterPokemon.forEach(element => {
                this.litsPagePokemon.push(element.pokemon);
            });
            }else{
              this.filterPokemon.forEach(element => {
                if (element.pokemon.name.match(regexName)) {
                  this.litsPagePokemon.push(element.pokemon)
                }
            });
            }
          }
        );
      });
    }
    
  }
  goNextPage(){
    this.offset += 50;
    this.previosPage = false;
    if (this.offset === 800) {
      this.nextPage = true;
      this.getPokemonPag(7);
    }else{
      this.getPokemonPag(50);
    }
    
  }

  goPreviousPage(){
    this.offset -= 50;
    this.nextPage = false;
    if (this.offset === 0) {
      this.previosPage = true;
    }
    this.getPokemonPag(50);
  }
  goPokemonPage(name:string){
    this.router.navigate(['pokedex',name])
  }

}

export enum Type {
  normal,
  fighting,
  flying,
  poison,
  ground,
  rock,
  bug,
  ghost,
  steel,
  fire,
  water,
  grass,
  electric,
  psychic,
  ice,
  dragon,
  dark,
  fairy
}
