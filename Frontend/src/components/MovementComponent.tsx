import { useState } from "react";
import type { box, operation } from "../types";
import BorderComponent from "./BorderComponent";

const MyCanvasComponent = ({ box, setBox, setIsMoving, shape, setShape, isMoving, isSelected, setIsSelected, setIsActive }:
    { box: box[], setBox: (box: box[]) => void, setIsMoving: (state: boolean) => void, shape: operation, setShape: (state: operation) => void, isMoving: boolean, isSelected: boolean, setIsSelected: (state: boolean) => void, setIsActive: (state: boolean) => void }) => {

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
        if (shape === 'click') {
            setIsActive(true)
            setDifferencex(0)
            setDifferencey(0)
            setIsMouseDown(true)
            setInitialx(e.clientX)
            setInitialy(e.clientY)
            setIsMoving(true)
        }
    }
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMouseDown) {
            setDifferencex((e.clientX - initialx));
            setDifferencey((e.clientY - initialy));
        }
    }


    const handleMouseUp = (index: number) => {
        setIsMouseDown(false)
        setIsActive(true)
        setBox(
            box.map((b) =>
                b.selected ? {
                    ...b, left: (b.left + differencex), right: (b.right + differencey)
                } : b
            )
        );

        setInitialx(0)
        setInitialy(0)
        setDifferencex(0)
        setDifferencey(0)
        setIsMoving(false)
        setShape('click')

    }

    return (
        <>
            {
                box.map((box, index) => {
                    return (
                        <div
                            // onClick={}
                            onMouseMove={(e) => { handleMouseMove(e) }}
                            onMouseDown={(e) => { handleMouseDown(e) }}
                            onMouseUp={(e) => { handleMouseUp(index) }}

                            style={{
                                borderRadius: `${box.shape === 'square' ? '10px' : '100%'}`,
                                width: `${box.width}px`,
                                height: `${box.height}px`,
                                background: "transparent", position: 'absolute',
                                left: `${box.selected ? box.left + differencex : box.left}px`, top: `${box.selected ? box.right + differencey : box.right}px`,

                                color: 'black',
                                border: `${box.selected ? '5px solid blue' : '5px solid black'}`,
                                cursor: `${isSelected ? 'crosshair' : 'default'}`

                            }}
                            key={index}>
                            <BorderComponent width={'full'} height={'8'} position={'-top-4'} cursor={'cursor-n-resize'} isMoving={isMoving} index={index} isSelected={isSelected} onBoxSelect={onBoxSelect} setIsMoving={setIsMoving} setIsSelected={setIsSelected} shape={shape} setBox={setBox} box={box} isMouseDown={isMouseDown} />
                            <BorderComponent width={'full'} height={'8'} position={'-bottom-4'} cursor={'cursor-n-resize'} isMoving={isMoving} index={index} isSelected={isSelected} onBoxSelect={onBoxSelect} setIsMoving={setIsMoving} setIsSelected={setIsSelected} shape={shape} setBox={setBox} box={box} isMouseDown={isMouseDown} />
                            <BorderComponent width={'8'} height={'full'} position={'-left-4 top-0'} cursor={'cursor-e-resize'} isMoving={isMoving} index={index} isSelected={isSelected} onBoxSelect={onBoxSelect} setIsMoving={setIsMoving} setIsSelected={setIsSelected} shape={shape} setBox={setBox} box={box} isMouseDown={isMouseDown} />
                            <BorderComponent width={'8'} height={'full'} position={'-right-4 top-0'} cursor={'cursor-e-resize'} isMoving={isMoving} index={index} isSelected={isSelected} onBoxSelect={onBoxSelect} setIsMoving={setIsMoving} setIsSelected={setIsSelected} shape={shape} setBox={setBox} box={box} isMouseDown={isMouseDown} />
                        </div >
                    )
                })
            }
        </>
    );
};

export default MyCanvasComponent;