import React, { useEffect, useState } from 'react';
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
      <div className='absolute w-full h-screen flex justify-center bg-[#eee]'>

        <div className='cursor-pointer absolute w-1/4 bg-white z-1 flex justify-around'>
          <p className={`${shape === 'square' ? 'border-2 border-blue-700' : ''}`}
            onClick={() => setShape('square')}>Square</p>
          <p className={`${shape === 'circle' ? 'border-2 border-blue-700' : ''}`}
            onClick={() => setShape('circle')}> Circle</p>
        </div>

        <div className='absolute w-full h-screen bg-[#eee]'
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseUp={handleMouseUp}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          {/* Click anywhere */}
          <div className={`${shape === 'square' ? 'rounded-[10px]' : 'rounded-[100%]'} w-[${differencex}px] h-[${differencey}px] bg-transparent
          border-[5px] border-black absolute left-[${Math.min(initialx, x)}px] right-[${Math.min(initialy, y)}px]`}
          />
          {
            box.map((box, index) => {
              return (
                <div
                  style={{
                    borderRadius: `${box.shape === 'square' ? '10px' : '100%'}`,
                    width: `${box.height}px`,
                    height: `${box.width}px`,
                    background: "transparemt", border: '5px solid black', position: 'absolute',
                    left: `${box.left}px`, top: ` ${box.right}px`

                  }}
                  key={index} />
              )
            })
          }
        </div>
      </div >
    </>
  )
}

export default App
