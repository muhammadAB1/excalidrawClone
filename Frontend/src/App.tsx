import React, { useEffect, useState } from 'react';
// import MyCanvasComponent from './components/CanvasComponent'
import type { box, operation } from './types';
import ShapeComponent from './components/ShapeComponent';
import MyCanvasComponent from './components/CanvasComponent';
import HighlightComponent from './components/HighlightComponent';

function App() {

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [initialx, setInitialx] = useState(0)
  const [initialy, setInitialy] = useState(0)
  const [differencex, setDifferencex] = useState(0)
  const [differencey, setDifferencey] = useState(0)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [shape, setShape] = useState<operation>('click')
  const [box, setBox] = useState<box[]>([])
  const [isDrawing, setIsDrawing] = useState(false)



  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shape !== 'click') {
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
  }

  const handleMouseUp = () => { //e: React.MouseEvent<HTMLDivElement>
    setIsMouseDown(false)
    if (shape !== 'click' && !isDrawing) {
      setBox(prev => [
        ...prev,
        {
          height: differencey,
          width: differencex,
          left: Math.min(initialx, x),
          right: Math.min(initialy, y),
          shape: shape,
          selected: false
        }])
      setX(0)
      setY(0)
      setInitialx(0)
      setInitialy(0)
      setDifferencex(0)
      setDifferencey(0)
    }

  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMouseDown && shape !== 'click') {
      setDifferencex(Math.abs(e.clientX - initialx));
      setDifferencey(Math.abs(e.clientY - initialy));
      // Update x and y for position calculations
      setX(e.clientX);
      setY(e.clientY);

    }
  }

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  //   if (e.key === '2') {
  //     setShape('square')
  //   } else if (e.key === '3') {
  //     setShape('circle')
  //   }
  // }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '2') {
        setShape('square')
      } else if (e.key === '3') {
        setShape('circle')
      } else if (e.key === '1') {
        setShape('click')
      }

    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);


  return (
    <>
      {/* <MyCanvasComponent /> */}
      <div onClick={() => { setBox(prev => prev.map(b => ({ ...b, selected: false }))); setIsDrawing(false) }}
        className='absolute w-full h-screen flex justify-center bg-[#eee] z-0'>

        < ShapeComponent shape={shape} setShape={setShape} />

        <div className='absolute w-full h-screen bg-[#eee]'
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseUp={handleMouseUp}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <HighlightComponent
            shape={shape} differencex={differencex} differencey={differencey} initialx={initialx} initialy={initialy} x={x} y={y} isDrawing={isDrawing} isMouseDown={isMouseDown}
          />
          <MyCanvasComponent box={box} setBox={setBox} setIsDrawing={setIsDrawing} />
        </div>
      </div>
    </>
  )
}

export default App
