import React, { MutableRefObject, useEffect, useRef, useState, useCallback, CSSProperties } from 'react';
import logo from './logo.svg';
import Graph  from './graph/Graph';
import './App.css';
import Cell from './cells/Cell';
import FadeCell from './cells/FadeCell';

// function App(props: any){
//   let sidebarWT = window.innerWidth / 3, sidebarHT;

//   const [size, setSize] = useState({ width: sidebarWT, height: sidebarHT });
//   const ref = useRef() as MutableRefObject<HTMLDivElement>;
  
//   // Sidebar
//   // useEffect(() => {
//   //   console.log(
//   //     'width', `: ${ref.current.getBoundingClientRect().x}`,
//   //     'height',  `: ${ref.current.getBoundingClientRect().y}`
//   //     );
//   //     // sidebarWT = 1
//   // }, []);

//   // Mouse Drag Handler
//   // const handler = useCallback(() => {
//   //   function onMouseMove(e: MouseEvent) {
//   //     setSize((currentSize: any) => ({
//   //       width: currentSize.width + e.movementX,
//   //       height: currentSize.height
//   //     }));
//   //   }
//   //   console.log(size.width, '\n', size.height);
//   //   function onMouseUp() {
//   //     ref.current.removeEventListener('mousemove', onMouseMove);
//   //     ref.current.removeEventListener('mouseup', onMouseUp);
//   //   }

//   //   ref.current.addEventListener('mousemove', onMouseMove);
//   //   ref.current.addEventListener('mouseup', onMouseUp);
//   // }, []);

//   const [pos, setPos] = useState({ x: 1, y: 1 });
//   const trackPos = (data: {x: number, y: number}) => {
//     setPos({ x: data.x, y: data.y });
//   }

//   return <>
//     {/* <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}


//       <main className="flex-container">
//         {/* <div id="sidebar-eq" className="flex-container" draggable="true">
//           <EqSidebar style={{width: sidebarWT - 5}}/>
//           <Draggable onDrag={(e, data) => trackPos(data)}  axis='x'>
//             <div id="eq-graph-border" draggable="true"></div>
//           </Draggable>
//         </div>
//         <Graph style={{width: (window.innerWidth - sidebarWT) + 'vw'}}/> */}
//         <div className="resizable" ref={ref} style={{
//           resize: 'horizontal', 
//           backgroundColor: 'blue',
//           border: '2px solid',
//           padding: '20px',
//           width: '300px',
//           overflow: 'auto'}}>
//             Hello
//             <div style={{width: '5px'}}></div>
//           </div>
//       </main>
//     {/* </div> */}
//   </>;
// }

function App() {
  const sidebarRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(400);

  const startResizing = React.useCallback((mouseDownEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
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
        onMouseDown={(e) => e.preventDefault()}
      >
        <div className="app-sidebar-content" style={{backgroundColor: 'white'}}>
          <div id="expression-list-header" style={{height: '50px', backgroundColor: 'green'}}/>
          <Cell />
          <FadeCell />
        </div>
        <div className="app-sidebar-resizer" onMouseDown={startResizing} />
      </div>
      <div className="app-frame" >
        <Graph />
      </div>
    </div>
  );
}


export default App;
