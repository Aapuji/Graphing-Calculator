import react from 'react';
import './Cell.css';

function FadeCell(props: any): JSX.Element {

    return <div className="eqbar-cell fade-cell">
        <div className="cell-drag-icon" />
        <div className="flex-container" />
    </div>;
}

export default FadeCell;