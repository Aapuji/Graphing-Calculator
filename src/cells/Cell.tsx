import React from 'react';
import './Cell.css';

function Cell(props: any): JSX.Element {

    let input: string = 'Hi';
    let newChar: string;

    return <div className="eqbar-cell" {...props}>
        <div className="cell-drag-icon"></div>
        <div className="cell-content flex-container">   
            <input
                className="cell-text expression"
                defaultValue={' Hello'}
                contentEditable='true'
                onInput={e => {
                    let target = e.currentTarget;
                    input = target.value![0] == ' ' ? target.value! : ' ' + target.value!;
                    target.value = input;
                    newChar = input.slice(-1);
                    console.log('Text inside div ', input);
                    // TODO Send input to TS file to parse with all other cell inputs
                }}
                suppressContentEditableWarning={true} /* Stops the warnings */
            />
        </div>
    </div>;
}

export default Cell;