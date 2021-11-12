import { Router } from "express";

import match from "./resolvers/match.resolver";

const router = Router();


/**
 * Ganador batalla.
 * Ganador de una batalla Pokémon uno a uno: Debo poder enviar como parámetros 
 * el nombre de dos Pokémon diferentes.
 * @param {string} pokemon_1 nombre del primer pokemon.
 * @param {string} pokemon_2 nombre del segundo pokemon.
 */
router.route('/match_result/:pokemon_1/:pokemon_2').get(match.getResult);

/**
 * Historia de batallas.
 * Top  de las batallas Pokémon mas populares
 */
 router.route('/match_report').get(match.getReport);






export default router;