export interface MatchResult {
    pokemon_1:Pokemon,
    pokemon_2:Pokemon,
   
}

export interface Pokemon{    
    total:number,
    name: string;
    types: any[];
    result: any[];
}