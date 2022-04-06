import React, { MutableRefObject, useEffect, useRef, useState, useCallback, CSSProperties } from 'react';
import logo from './logo.svg';
import Graph  from './graph/Graph';
import './App.css';
import Cell from './cells/Cell';
import FadeCell from './cells/FadeCell';

function App() {
  // RESIZING SIDEBAR
  const sidebarRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(400);

  const startResizing = useCallback((mouseDownEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        setSidebarWidth(
          mouseMoveEvent.clientX -
            sidebarRef.current.getBoundingClientRect().left
        );
      }
    },
    [isResizing]
  );

  React.useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div className="app-container">
      <div
        ref={sidebarRef}
        className="app-sidebar"
        style={{ width: sidebarWidth }}
        // onMouseDown={(e) => {e.preventDefault()}}
      >
        <div className="app-sidebar-content" style={{backgroundColor: 'white'}}>
          <div id="expression-list-header" style={{height: '50px', backgroundColor: 'green'}}/>
          <Cell />
          <Cell style={{fontFamily: '\'SymbolaRegular\', \'Times New Roman\', serif'}}/>
          <FadeCell />
        </div>
        <div className="app-sidebar-resizer" onMouseDown={startResizing}/>
      </div>
      <div className="app-frame" >
        <Graph />
      </div>
    </div>
    
  );
}


export default App;
