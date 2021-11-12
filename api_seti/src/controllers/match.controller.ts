
import { ParamsDictionary } from "express-serve-static-core";
import matchModel from "../models/match.model";
import axios from "axios";
import * as _ from "lodash";
import { MatchHistory } from "../interfaces/matchHistory.interface";
import { Pokemon } from "../interfaces/pokemon.interface";
import { result } from "lodash";
class matchController {
    static async getReportCont(): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {

                const result = await matchModel.getReportDB();
                const total=_.sumBy(result,'count');
                result.map((d: any) => {
                    d.dates=JSON.parse(d.dates);
                    d.pokemon_1=JSON.parse(d.pokemon_1);
                    d.pokemon_2=JSON.parse(d.pokemon_2);
                    d.percentage=d.count/total*100;
                    d.total=total;
                    return d;
                })
                result.sort((a: { count: number; },b: { count: number; })=>b.count-a.count)


                resolve(result);
            } catch (error) {
                console.error(
                    "An error ocurred getReportCont: ",
                    error
                );
                reject(error);
            }
        });
    }
    static async getResultCont(params: { pokemon_1: string, pokemon_2: string } | ParamsDictionary): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {

                const pokemon_1 = await axios('https://pokeapi.co/api/v2/pokemon/' + params.pokemon_1);
                const pokemon_2 = await axios('https://pokeapi.co/api/v2/pokemon/' + params.pokemon_2);



                const check = await matchModel.checkMatchDB(pokemon_1.data.name, pokemon_2.data.name);
                let pokemon_1_r: Pokemon, pokemon_2_r: Pokemon;
                const date = new Date().toISOString();
                if (check.length > 0) {//Actualizar

                    const data: MatchHistory = { ...check[0] };
                    const dates = JSON.parse(data.dates)
                    dates.push(date);
                    data.dates = JSON.stringify(dates);
                    data.count += 1;
                    const update = await matchModel.updateMatchDB(data, check[0].name_1, check[0].name_2);

                    if (pokemon_1.data.name == check[0].name_1) {
                        pokemon_1_r = JSON.parse(check[0].pokemon_1);
                        pokemon_2_r = JSON.parse(check[0].pokemon_2);
                    } else {
                        pokemon_1_r = JSON.parse(check[0].pokemon_2);
                        pokemon_2_r = JSON.parse(check[0].pokemon_1);
                    }

                } else {//Agregar
                    const list_types_1: any[] = [];
                    const list_types_2: any[] = [];
                    pokemon_1.data.types.forEach((t: any) => {
                        list_types_1.push(t.type);
                    });
                    pokemon_2.data.types.forEach((t: any) => {
                        list_types_2.push(t.type);
                    });

                    const result_1 = await getResult(list_types_1, list_types_2);
                    const result_2 = await getResult(list_types_2, list_types_1);

                    pokemon_1_r = {
                        ...pokemon_1.data,
                        total: _.sumBy(result_1, 'points'),
                        result: result_1,
                    };
                    pokemon_2_r = {
                        ...pokemon_2.data,
                        total: _.sumBy(result_2, 'points'),
                        result: result_2,
                    };


                    const data: MatchHistory = {
                        create_time: date,
                        name_1: pokemon_1.data.name,
                        name_2: pokemon_2.data.name,
                        dates: JSON.stringify([date]),
                        count: 1,
                        pokemon_1: JSON.stringify(pokemon_1_r),
                        pokemon_2: JSON.stringify(pokemon_2_r),
                    };

                    const insert = await matchModel.insertMatchDB(data);

                }


                resolve({ pokemon_1: pokemon_1_r, pokemon_2: pokemon_2_r, });
            } catch (error) {
                console.error(
                    "An error ocurred getResultCont: ",
                    error
                );
                reject(error);
            }
        });
    }
}

export default matchController;


async function getResult(list_types_1: any[], list_types_2: any[]) {
    const damage_result: any[] = [];
    for await (const types of list_types_1) {
        const type: any = await axios(types.url);
        const damages = type.data.damage_relations;
        Object.keys(damages).forEach(damage_type => {
            const damage_temp = _.intersectionWith(damages[damage_type], list_types_2, _.isEqual);
            damage_temp.forEach(x => {
                damage_result.push({ type_a: type.data.name, damage_type: damage_type, type_b: x.name, points: 0 })
            })
        })
    }
    damage_result.map(d => {
        if (d.damage_type == 'double_damage_from') d.points = -70;
        if (d.damage_type == 'double_damage_to') d.points = 70;
        if (d.damage_type == 'half_damage_from') d.points = -30;
        if (d.damage_type == 'half_damage_to') d.points = 30;
        return d;
    })

    return damage_result
}

