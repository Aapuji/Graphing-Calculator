import React from 'react';
import './Cell.css';
import { cellExpressions, calculate, mathScope } from '../expression';

function Cell(props: any): JSX.Element {
    
    let input: string;
    let newChar: string;

    return <div className="eqbar-cell" {...props}>
        <div className="cell-drag-icon"></div>
        <div className="cell-content flex-container">   
            <input
                className="cell-text expression"
                defaultValue={' Hello'}
                contentEditable='true'
                onInput={e => {
                    // Get Input
                    const target = e.currentTarget!;
                    const parent = target.parentElement!;
                    const cell = parent.parentElement!;
                    input = target.value![0] == ' ' ? target.value! : ' ' + target.value!;

                    newChar = input.slice(-1);
                    console.log('Text inside div ', input);
                    
                    // Set Output
                    target.value = input;   
                    
                    // Send input to expression.ts
                    const id = Number(cell.id);
                    if (cellExpressions[id]) {
                        cellExpressions[id].expr = input;
                    } else {
                        cellExpressions.push({
                            cn: id,
                            expr: input.slice(1)
                        });
                    }
                    console.log(cellExpressions, cell);
                    console.log(calculate(cellExpressions[id].expr));
                    console.table(mathScope);
                }}
                suppressContentEditableWarning={true} /* Stops the warnings */
            />
        </div>
    </div>;
}

export default Cell;