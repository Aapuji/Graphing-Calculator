import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import './Cell.css';
import { cellExpressions, calculate, mathScope } from '../expression';

// function getCaretSelection(element: HTMLDivElement) {
//     let start = 0;
//     let end = 0;
//     let doc = element.ownerDocument!;
//     let win = doc.defaultView!;
//     let selection;
//     if (typeof win.getSelection != "undefined") {
//         selection = win.getSelection()!;
//         if (selection.rangeCount > 0) {
//             let range = win.getSelection()!.getRangeAt(0);
//             let preCaretRange = range.cloneRange();
//             preCaretRange.selectNodeContents(element);
//             preCaretRange.setEnd(range.startContainer, range.startOffset);
//             start = preCaretRange.toString().length;
//             preCaretRange.setEnd(range.endContainer, range.endOffset);
//             end = preCaretRange.toString().length;
//         }
//     }
//     // } else if ( (selection = doc.getSelection()) && selection.type != "Control") {
//     //     var textRange = selection.getRangeAt(0);
//     //     var preCaretTextRange = doc.body.createTextRange();
//     //     preCaretTextRange.moveToElementText(element);
//     //     preCaretTextRange.setEndPoint("EndToStart", textRange);
//     //     start = preCaretTextRange.text.length;
//     //     preCaretTextRange.setEndPoint("EndToEnd", textRange);
//     //     end = preCaretTextRange.text.length;
//     // }
//     return { start: start, end: end };
// }

function Cell(props: any): JSX.Element {

    const textref = useRef() as MutableRefObject<HTMLDivElement>;

    // const reportSelection = useCallback(
    //     (): {start: number, end: number} => {
    //     let value: {start: number, end: number} = getCaretSelection(textref.current);
    //     console.log(value);
    //     return value;
    // }, []);

    let input: string;
    let newChar: string;
    let output: string;

    // Set Event Handlers

    // useEffect(() => {
    //     document.addEventListener('selectionchange', reportSelection);
    //     document.addEventListener('mousedown', reportSelection);
    //     document.addEventListener('mouseup', reportSelection);
    //     document.addEventListener('keyup', reportSelection);
    // }, []);

    // Set Default Text
    useEffect(() => {
    }, []);

    const [eqBarWidth, setEQBarWidth] = useState(392); // The sidebar resizer has a width of 6px

    // Change Width of eqbar-cell
    useEffect(() => {
        const EQ_BAR_CELL = textref.current.parentElement!.parentElement!;

        setEQBarWidth(0.96 * (EQ_BAR_CELL.getBoundingClientRect().width - 6));
    }, [props.isResizing]);

    function onInput(e: React.FormEvent<HTMLDivElement>) {
        // Get input and make sure there is a space at front for aesthetic purposes
        const target = e.currentTarget!;
        const parent = target.parentElement!;
        const cell = parent.parentElement!;

        input = target.textContent!;
        newChar = input.slice(-1);
        output = input;
        console.log('Text inside div ', input);
        
        // Set Output
        // target.innerText = output;   

        
        
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
    }

    return <div className="eqbar-cell" {...props}>
        <div className="cell-drag-icon"></div>
        <div className="cell-content flex-container">   
            <div
                className="cell-text expression"
                ref={textref}
                defaultValue={" Hello"}
                contentEditable="true"
                onInput={onInput}
                suppressContentEditableWarning={true} /* Stops the warnings */
            >
                {'\\(f(x) = x^2-1 \\over x\\)'}
            </div>
            {/* <div className="expression-output">
                Hello
            </div> */}
        </div>
    </div>;
}

export default Cell;