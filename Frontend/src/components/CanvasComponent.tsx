import { useEffect, useRef, useState } from "react";
import type { box } from "../types";

const MyCanvasComponent = ({ box, setBox, setIsDrawing }:
    { box: box[], setBox: (box: box[]) => void, setIsDrawing: (state: boolean) => void }) => {

    // const canvasRef = useRef(null);

    // useEffect(() => {
    //     const canvas = canvasRef.current;
    //     if (!canvas) return;

    //     const ctx = (canvas as HTMLCanvasElement).getContext("2d");
    //     if (!ctx) return;

    //     ctx.fillStyle = "green";
    //     ctx.fillRect(10, 10, 150, 100);
    // }, []);
    const [isMouseDown, setIsMouseDown] = useState(false)
    const [initialx, setInitialx] = useState(0)
    const [initialy, setInitialy] = useState(0)
    const [differencex, setDifferencex] = useState(0)
    const [differencey, setDifferencey] = useState(0)

    const onBoxSelect = (index: number) => {
        setBox(box.map((b, i) => ({ ...b, selected: i === index })))
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setDifferencex(0)
        setDifferencey(0)
        setIsMouseDown(true)
        setInitialx(e.clientX)
        setInitialy(e.clientY)
        setIsDrawing(true)
    }
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMouseDown) {
            setDifferencex((e.clientX - initialx));
            setDifferey((e.clientY - initialy));
            // setBox(
            //     box.map((b) =>
            //         b.selected ? {
            //             ...b, left: (differencex), right: (differencey)
            //         } : b
            //     )
            // );
        }
    }


    const handleMouseUp = () => {
        setIsMouseDown(false)
        setInitialx(0)
        setInitialy(0)
        setDifferencex(0)
        setDifferencey(0)
        setIsDrawing(false)
        // if (isMouseDown) {
            setBox(
                box.map((b) =>
                    b.selected ? {
                        ...b, left: (b.left + differencex), right: (b.right + differencey)
                    } : b
                )
            );
        // }

    }

    return (
        <>
            {
                box.map((box, index) => {
                    return (
                        <div
                            onMouseMove={(e) => handleMouseMove(e)}
                            onMouseDown={(e) => handleMouseDown(e)}
                            onMouseUp={handleMouseUp}
                            onClick={(e) => { e.stopPropagation(); onBoxSelect(index); setIsDrawing(true) }}
                            style={{
                                borderRadius: `${box.shape === 'square' ? '10px' : '100%'}`,
                                width: `${box.width}px`,
                                height: `${box.height}px`,
                                background: "transparemt", position: 'absolute',
                                left: `${box.selected ? box.left + differencex : box.left}px`, top: `${box.selected ? box.right + differencey : box.right}px`,
                                zIndex: 1,
                                color: 'black',
                                border: `${box.selected ? '5px solid blue' : '5px solid black'}`

                            }}
                            key={index}>
                            {box.selected ? 'selected' : 'hello'}
                        </div>
                    )
                })
            }
        </>
    );
};

export default MyCanvasComponent;