import { RefObject, useEffect, createRef } from 'react';
import { findDOMNode } from 'react-dom';
import './Cell.css';

function Cell(props: any): JSX.Element {

    let input: string;
    let newChar: string;
    let width: number;
    let x: number;

    let ref = createRef() as RefObject<HTMLDivElement>;

    function checkSize(): void {
        const node = ref.current!;
        const parent = findDOMNode(node)?.parentElement!;
        // const child = node.children[1] as HTMLElement;
        width = parent.getBoundingClientRect().width;
        x = parent.getBoundingClientRect().left;
        node.style.width = width + 'px';
        // child.style.left = x + 'px';
    }

    useEffect(checkSize);

    return <div className="eqbar-cell" ref={ref}>
        <div className="cell-drag-icon"></div>
        <div className="cell-content flex-container">   
            <div
                className="cell-text expression"
                contentEditable='true'
                onInput={e => {
                    input = e.currentTarget.textContent!;
                    newChar = input.slice(-1);
                    console.log('Text inside div ', e.currentTarget);
                    checkSize();
                }}
                suppressContentEditableWarning={true} /* Stops the warnings */
            >
                Hello
            </div>
        </div>
    </div>;
}

export default Cell;