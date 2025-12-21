import React, { useState } from 'react';
// import MyCanvasComponent from './components/CanvasComponent'
import type { box, shapeType } from './types';

function App() {

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [initialx, setInitialx] = useState(0)
  const [initialy, setInitialy] = useState(0)
  const [differencex, setDifferencex] = useState(0)
  const [differencey, setDifferencey] = useState(0)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [box, setBox] = useState<box[]>([])
  const [shape, setShape] = useState<shapeType>('square')



  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseDown(true)

    if (isMouseDown) {
      setDifferencex(0)
      setDifferencey(0)
    }
    setDifferencex(0)
    setDifferencey(0)
    setInitialx(e.clientX)
    setInitialy(e.clientY)
  }

  const handleMouseUp = () => { //e: React.MouseEvent<HTMLDivElement>
    setBox(prev => [
      ...prev,
      {
        height: differencex,
        width: differencey,
        left: Math.min(initialx, x),
        right: Math.min(initialy, y),
        shape: shape
      }])
    setX(0)
    setY(0)
    setInitialx(0)
    setInitialy(0)
    setDifferencex(0)
    setDifferencey(0)
    setIsMouseDown(false)

  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMouseDown) {
      setDifferencex(Math.abs(e.clientX - initialx));
      setDifferencey(Math.abs(e.clientY - initialy));
      // Update x and y for position calculations
      setX(e.clientX);
      setY(e.clientY);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === '2') {
      setShape('square')
    } else if (e.key === '3') {
      setShape('circle')
    }
  }


  return (
    <>
      {/* <MyCanvasComponent /> */}
      <div onKeyDown={handleKeyDown}
        tabIndex={0}
        style={{ position: 'absolute', width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', backgroundColor: '#eee' }}>

        <div style={{ cursor: 'pointer', position: 'absolute', width: '25%', backgroundColor: 'white', zIndex: 1, display: 'flex', justifyContent: 'space-around' }}>
          <p onClick={() => setShape('square')}>Square</p>
          <p onClick={() => { setShape('circle') }}>Circle</p>
        </div>
        <div
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseUp={handleMouseUp}
          onMouseMove={(e) => handleMouseMove(e)}
          style={{ position: 'absolute', width: "100%", height: "100vh", background: "#eee" }}
        >
          {/* Click anywhere */}
          <div
            style={{
              borderRadius: `${shape === 'square' ? '10px' : '100%'}`,
              width: `${differencex}px`,
              height: `${differencey}px`,
              background: "transparemt",
              border: '5px solid black',
              position: 'absolute',
              left: `${Math.min(initialx, x)}px`,
              top: `${Math.min(initialy, y)}px`
            }}
          />
          {
            box.map((box, index) => {
              return (
                <div key={index} style={{ borderRadius: `${box.shape === 'square' ? '10px' : '100%'}`, width: `${box.height}px`, height: `${box.width}px`, background: "transparemt", border: '5px solid black', position: 'absolute', left: `${box.left}px`, top: `${box.right}px` }}></div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
