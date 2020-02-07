import knex from '../index'
const xss = require('xss')
import {IKnexResponse} from './IKnexResponse'

async function getAll(): Promise<IKnexResponse> {
    return await knex.raw(`select text from "table"`)
}
async function save(text: string): Promise<IKnexResponse> {
    if (typeof text !== 'string') {
        throw Error('Bad argument exception')
    }
    return await knex('table').insert({text: xss(text)})
}

export {
    getAll,
    save
}
