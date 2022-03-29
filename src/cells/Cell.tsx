import react from 'react';
import './Cell.css';

function Cell(props: any): JSX.Element {

    let input: string;
    let newChar: string;

    return <div className="eqbar-cell">
        <div className="cell-drag-icon"></div>
        <div className="cell-content flex-container">   
            <div
                className="cell-text expression"
                contentEditable='true'
                onInput={e => {
                    input = e.currentTarget.textContent!;
                    newChar = input.slice(-1);
                    console.log('Text inside div: ', input)}}
            >
                Hello
            </div>
        </div>
    </div>;
}

export default Cell;