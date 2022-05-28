import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import './Cell.css';
import { cellExpressions, calculate, mathScope } from '../expression';
import MathQuill, { MathField } from 'mathquill-node';
import math from 'mathjs';

// @ts-ignore
const MathJax = globalThis.MathJax;
const MQ = MathQuill.getInterface(2);

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
    let mathField: MathField;

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

    // Set Default Values
    useEffect(() => {
        mathField = MQ.MathField(textref.current, {
            restrictMismatchedBrackets: true,
            handlers: {
                edit: function() {
                  let enteredMath = mathField.latex(); // Get entered math in LaTeX format
                }
            }
        });
        mathField.latex("\\frac{1}{2}");
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
            <span 
                className="cell-text expression" 
                ref={textref}
            ></span>
        </div>
    </div>;
}

/*
<span
                className="cell-text expression"
                ref={textref}
                // defaultValue={" Hello"}
                // contentEditable={false}
                // onInput={onInput}
                // suppressContentEditableWarning={true} /* Stops the warnings
                >
                </span>
*/

export default Cell;

/** 
 * Plan for getting equations, axis variables (x, y, r, theta), latex img/representation, and ability to traverse single characters by moving the cursor
 * 
 * Perhaps, store svgs when the values aren't so easy. So for normal x = 1, `x` and `1` can be normal italic numbers, while for subscripts and superscripts, it can use svgs, and store some of the more common ones (eg. parentheses, exponent of 2, 3, /, +, -, *, =)
 * 
 * Use https://editor.codecogs.com/docs/ for getting the svgs
 * Use <var></var> for the texts
 * 
 * =================================================================== 
 *                              ALGORITHM                              
 * =================================================================== 
 * 0. Set constants for the size of the svgs to be equal to textsize, and a function to determine svg size depending on text height
 * 1. Get plain text input from div, store it
 * 2. Parse it into an array of objects which hold information about each character
 *      eg. pos (position in str), char (actual character), scriptPos (number representing position in "scripts," eg. 0 = normal, -1 = subscript, 1, = superscript), and next which points to the next object in that cell or null.
 * 3. Loop through that array and convert to LaTeX the ones that need latex, and insert <var>{char}</var> or its svg using the API call.
 *      Remember, multiple subscripts or superscripts can be done by doing `2_{2_{2}}` or `2^{2^{2}}`
 * 4. 
 * 
*/