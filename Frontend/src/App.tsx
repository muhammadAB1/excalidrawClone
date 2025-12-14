import { useState } from 'react';
import MyCanvasComponent from './components/CanvasComponent'

function App() {

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [initialx, setInitialx] = useState(0)
  const [initialy, setInitialy] = useState(0)
  const [endx, setEndx] = useState(0)
  const [endy, setEndy] = useState(0)
  const [differencex, setDifferencex] = useState(0)
  const [differencey, setDifferencey] = useState(0)
  const [isMouseDown, setIsMouseDown] = useState(false)


  // const handleClick = (e) => {

  //   // console.log("Clicked at:", e.clientX, e.clientY);
  // };

  // const handleMouseDown = (e) => {

  //   // console.log('mouse down:', initialx, initialy)
  //   console.log('mouse down:', differencex, differencey)
  // }
  const handleMouseUp = (e) => {
    // setX(0)
    // setY(0)
    // setInitialx(0)
    // setInitialy(0)
    console.log('when mouse is up',isMouseDown)
    setIsMouseDown(false)
    setEndx(0)
    setEndy(0)
    // setEndx(e.clientX)
    // setEndy(e.clientY)

    // console.log('mouse up:', endx, endy)
  }
  // const handleMouseMove = (e) => {
  //   setX(e.clientX)
  //   setY(e.clientY)
  //   // console.log('mouse up:', x, y)
  // }

  return (
    <>
      {/* <MyCanvasComponent /> */}

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
          setInitialx(e.clientX)
          setInitialy(e.clientY)
          // handleMouseDown(e)
        }}
        onMouseUp={handleMouseUp}
        onMouseMove={(e) => {
          if (isMouseDown) {
            setDifferencex(x - initialx)
            setDifferencey(y - initialy)
            console.log('difference', differencex)
            setX(e.clientX)
            setY(e.clientY)
          }
        }}
        style={{ width: "100vw", height: "100vh", background: "#eee" }}
      >
        {/* Click anywhere */}
        <div style={{ width: `${differencex}px`, height: `${differencey}px`, background: "transparemt", border: '5px solid black', borderRadius: '10px', position: 'absolute', left: initialx, top: initialy }} />
      </div>
    </>
  )
}

export default App
