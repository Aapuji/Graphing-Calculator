import react from 'react';
import './Cell.css';

function Cell(props: any): JSX.Element {



    return <div className="eqbar-cell">
        <div className="cell-drag-icon"></div>
        <div className="cell-content flex-container">
            <div className="cell-text expression">
                Hello
            </div>
        </div>
    </div>;
}

export default Cell;