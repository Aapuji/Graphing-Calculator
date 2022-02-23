import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

enum Axis {
    X = 'horizontal',
    Y = 'vertical',
    BOTH = 'both'
}

function Resizeable(
    { children, style, axis}: { 
        children: any, 
        style: {
            width: number, 
            height: number
        },  
        axis: Axis
    }
) {
  let wt: number = style.width, ht: number = style.height;
  const allowableAxes: Axis = axis;

  const [size, setSize] = useState({ width: wt, height: ht });
  const ref = useRef() as MutableRefObject<HTMLButtonElement>;
  
  // Sidebar
  useEffect(() => {
    console.log(
      'width', `: ${ref.current.getBoundingClientRect().x}`,
      'height',  `: ${ref.current.getBoundingClientRect().y}`
      );
  }, []);

  // Mouse Drag Handler
  const handler = useCallback(() => {
    function onMouseMove(e: MouseEvent) {
      setSize((currentSize: any) => ({
        width: currentSize.width + e.movementX,
        height: currentSize.height + e.movementY
      }));
    }
    console.log(size.width, '\n', size.height);
    function onMouseUp() {
      ref.current.removeEventListener('mousemove', onMouseMove);
      ref.current.removeEventListener('mouseup', onMouseUp);
    }

    ref.current.addEventListener('mousemove', onMouseMove);
    ref.current.addEventListener('mouseup', onMouseUp);
  }, []);

  return <div style={{width: wt, height: ht, resize: axis}}>
      <button ref={ref} onMouseDown={handler}/>
      {children}
  </div>
}

export { Axis, Resizeable };