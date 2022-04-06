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
                    console.log(target.value);
                    newChar = input.slice(-1);
                    console.log('Text inside div ', e.currentTarget);
                    // checkSize();
                }}
                suppressContentEditableWarning={true} /* Stops the warnings */
            />
        </div>
    </div>;
}

export default Cell;