import { create, all } from 'mathjs'

const config = { };
const math = create(all, config);

export let cellExpressions: {
    cn: number, /* Cell Number (0-indexed)*/
    expr: string
}[] = [];
