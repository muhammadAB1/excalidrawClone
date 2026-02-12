import React, { useEffect, useState } from 'react';
// import MyCanvasComponent from './components/CanvasComponent'
import type { box, operation } from './types';
import ShapeComponent from './components/ShapeComponent';
import MyCanvasComponent from './components/MovementComponent';
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
  const [isMoving, setIsMoving] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const [isActive, setIsActive] = useState(false)



  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shape !== 'click' && !isMoving) {
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
    if (shape !== 'click' && !isMoving) {
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
      setShape('click')
    }

  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMoving && isMouseDown && shape !== 'click' && e != null) {

      setDifferencex(Math.abs(e.clientX - initialx));
      setDifferencey(Math.abs(e.clientY - initialy));
      // Update x and y for position calculations
      setX(e.clientX);
      setY(e.clientY);

    }
    if (isMoving && isMouseDown) {
      if (box.filter(b => b.selected === true)[0].selected) {
        setDifferencex((e.clientX - initialx));
        setDifferencey((e.clientY - initialy));
      }
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '2') {
        setIsMoving(false)
        setBox(prev => prev.map(b => ({ ...b, selected: false })))
        setShape('square')
      } else if (e.key === '3') {
        setIsMoving(false)
        setBox(prev => prev.map(b => ({ ...b, selected: false })))
        setShape('circle')
      } else if (e.key === '1') {
        setIsMoving(false)
        setBox(prev => prev.map(b => ({ ...b, selected: false })))
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
      <div onClick={() => {
        if (!isMoving) {
          !isActive && setBox(prev => prev.map(b => ({ ...b, selected: false }))); setIsMoving(false); !isActive && setIsSelected(false); setIsActive(false);
        }
      }
      }
        className='absolute w-full h-screen flex justify-center bg-[#eee] z-0'>

        <ShapeComponent shape={shape} setShape={setShape} />

        <div className='absolute w-full h-screen bg-[#eee]'
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseUp={handleMouseUp}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <HighlightComponent
            shape={shape} differencex={differencex} differencey={differencey} initialx={initialx} initialy={initialy} x={x} y={y} isMoving={isMoving} isMouseDown={isMouseDown}
          />
          <MyCanvasComponent
            box={box}
            setBox={setBox}
            setIsMoving={setIsMoving}
            shape={shape}
            setShape={setShape}
            isMoving={isMoving}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            setIsActive={setIsActive}
            differencex={differencex}
            differencey={differencey}
            setDifferencex={setDifferencex}
            setDifferencey={setDifferencey}
            handleMouseMove={handleMouseMove}
            isMouseDown={isMouseDown}
            setIsMouseDown={setIsMouseDown}
            initialx={initialx}
            initialy={initialy}
            setInitialx={setInitialx}
            setInitialy={setInitialy}
          />
        </div>
      </div>
    </>
  )
}

export default App
