import { create, all, evaluateDependencies } from 'mathjs';

const config = { };
const math = create(all, config);

export let cellExpressions: {
    cn: number, /* Cell Number (0-indexed)*/
    expr: string
}[] = [];

// An object that represents all options for the entire calculation part of the app
export let globalOptions = {
    scope: {},
    options: {
        reservedSymbols: ['x', 'y', 'r', 'theta']
    }
}

export let format = {
    precision: 5
};

// Object that has the variables or functions that were defined
export let mathScope: Record<string, unknown> = {};

export function calculate(expr: string, scope: object | null = mathScope) {
    return math.evaluate(expr, scope ?? undefined);
}

// Parse the expression before evaluating to make sure that any "y=" are removed because those are graphed, and same for others (x, r, theta).
export function preparse(expr: string) {
    let tempScope: Record<string, unknown> = {};
    let output: Record<string, unknown> = {};
    let evaluated = math.evaluate(expr, tempScope);
    for (let scopedVar in tempScope) {
        for (let reservedSymbols in globalOptions.options.reservedSymbols) {
            if (scopedVar === reservedSymbols) {
                output[scopedVar] = tempScope[scopedVar];
            }
        }
    }
}
