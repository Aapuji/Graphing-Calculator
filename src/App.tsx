import React, { MutableRefObject, useEffect, useRef, useState, useCallback, CSSProperties } from 'react';
import logo from './logo.svg';
import Graph  from './graph/Graph';
import EqSidebar from './sidebar/EqSidebar';
import './App.css';

// function Resizeable({ children }: any) {
//   let width = (props: any) => props.width;

//   const [size, setSize] = useState({ x: 400, y: 300 });
//   const ref = useRef() as MutableRefObject<HTMLDivElement>;

//   const handler = useCallback(() => {
//     function onMouseMove(e: MouseEvent) {
//       setSize(currentSize => ({ 
//         x: currentSize.x + e.movementX, 
//         y: currentSize.y + e.movementY 
//       }));
//     }
//     function onMouseUp() {
//       ref.current.removeEventListener("mousemove", onMouseMove);
//       ref.current.removeEventListener("mouseup", onMouseUp);
//     }
//     ref.current.addEventListener("mousemove", onMouseMove);
//     ref.current.addEventListener("mouseup", onMouseUp);
//   }, []);

//   return (
//     <div width={size.x} height={size.y}>
//       <button ref={ref} onMouseDown={handler} pos={1} />
//       {children}
//     </div>
//   );
// }




function App(props: any){
  let sidebarWT = window.innerWidth / 3, sidebarHT;

  const [size, setSize] = useState({ width: sidebarWT, height: sidebarHT });
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  
  // Sidebar
  useEffect(() => {
    console.log(
      'width', `: ${ref.current.getBoundingClientRect().x}`,
      'height',  `: ${ref.current.getBoundingClientRect().y}`
      );
      sidebarWT = 1
  }, []);

  // Mouse Drag Handler
  const handler = useCallback(() => {
    function onMouseMove(e: MouseEvent) {
      setSize((currentSize: any) => ({
        width: currentSize.width + e.movementX,
        height: currentSize.height
      }));
    }

    function onMouseUp() {
      ref.current.removeEventListener('mousemove', onMouseMove);
      ref.current.removeEventListener('mouseup', onMouseUp);
    }

    ref.current.addEventListener('mousemove', onMouseMove);
    ref.current.addEventListener('mouseup', onMouseUp);
  }, []);


  return <>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>


      <main className="flex-container">
        <div id="sidebar-eq" className="flex-container">
          <EqSidebar style={{width: sidebarWT - 5}}/>
          <div id="eq-graph-border" ref={ref} onMouseDown={handler} draggable="true"></div>
        </div>
        <Graph style={{width: (window.innerWidth - sidebarWT) + 'vw'}}/>
      </main>
    </div>
  </>;
}

export default App;
