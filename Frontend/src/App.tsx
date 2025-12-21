import { useState } from 'react';
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


  // const handleClick = (e) => {

  //   // console.log("Clicked at:", e.clientX, e.clientY);
  // };

  // const handleMouseDown = (e) => {

  //   // console.log('mouse down:', initialx, initialy)
  //   console.log('mouse down:', differencex, differencey)
  // }
  const handleMouseUp = () => { //e: React.MouseEvent<HTMLDivElement>
    setBox(prev => [
      ...prev,
      {
        height: differencex,
        width: differencey,
        left: initialx,
        right: initialy,
        shape: shape
      }])
    console.log(box)
    setX(0)
    setY(0)
    setInitialx(0)
    setInitialy(0)
    setDifferencex(0)
    setDifferencey(0)
    setIsMouseDown(false)

  }
  // const handleMouseMove = (e) => {
  //   setX(e.clientX)
  //   setY(e.clientY)
  //   // console.log('mouse up:', x, y)
  // }

  return (
    <>
      {/* <MyCanvasComponent /> */}
      <div style={{ position: 'absolute', width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', gap: '4px', backgroundColor: '#eee' }}>

        <div style={{ cursor: 'pointer', position: 'absolute', width: '25%', backgroundColor: 'white', zIndex: 1, display: 'flex', justifyContent: 'space-around' }}>
          <p onClick={() => setShape('square')}>Square</p>
          <p onClick={() => {
            setShape('circle')
            console.log('circle')
          }}>Circle</p>
        </div>
        <div
          // onClick={() => {
          //   setX(0)
          //   setY(0)
          //   console.log(x)
          //   setInitialx(0)
          //   setInitialy(0)
          //   setDifferencex(0)
          //   setDifferencex(0)
          // }}
          onMouseDown={(e) => {
            setIsMouseDown(true)

            if (isMouseDown) {
              setDifferencex(0)
              setDifferencey(0)
            }
            setDifferencex(0)
            setDifferencey(0)
            setInitialx(e.clientX)
            setInitialy(e.clientY)
            // handleMouseDown(e)
          }}
          onMouseUp={handleMouseUp}
          onMouseMove={(e) => {
            if (isMouseDown) {
              setDifferencex(x - initialx)
              setDifferencey(y - initialy)
              setX(e.clientX)
              setY(e.clientY)
            }
          }}
          style={{ position: 'absolute', width: "100%", height: "100vh", background: "#eee" }}
        >
          {/* Click anywhere */}
          <div style={{ borderRadius: `${shape === 'square' ? '10px' : '100%'}`, width: `${differencex}px`, height: `${differencey}px`, background: "transparemt", border: '5px solid black', position: 'absolute', left: `${initialx}px`, top: `${initialy}px` }} />
          {
            box.map(box => {
              return (
                <div style={{ borderRadius: `${box.shape === 'square' ? '10px' : '100%'}`, width: `${box.height}px`, height: `${box.width}px`, background: "transparemt", border: '5px solid black', position: 'absolute', left: `${box.left}px`, top: `${box.right}px` }}></div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
