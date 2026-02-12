import { useState } from "react";
import type { box, operation } from "../types";
import BorderComponent from "./BorderComponent";

const MyCanvasComponent = ({
    box,
    setBox,
    setIsMoving,
    shape,
    setShape,
    isMoving,
    isSelected,
    setIsSelected,
    setIsActive,
    differencex,
    differencey,
    setDifferencex,
    setDifferencey,
    handleMouseMove,
    isMouseDown,
    setIsMouseDown,
    initialx,
    initialy,
    setInitialx,
    setInitialy
}:
    {
        box: box[],
        setBox: (box: box[]) => void,
        setIsMoving: (state: boolean) => void,
        shape: operation,
        setShape: (state: operation) => void,
        isMoving: boolean,
        isSelected: boolean,
        setIsSelected: (state: boolean) => void,
        setIsActive: (state: boolean) => void,
        differencex: number,
        differencey: number,
        setDifferencex: (state: number) => void,
        setDifferencey: (state: number) => void,
        isMouseDown: boolean,
        setIsMouseDown: (state: boolean) => void,
        initialx: number,
        setInitialx: (state: number) => void,
        initialy: number,
        setInitialy: (state: number) => void,
        handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void
    }) => {

    // const canvasRef = useRef(null);

    // useEffect(() => {
    //     const canvas = canvasRef.current;
    //     if (!canvas) return;

    //     const ctx = (canvas as HTMLCanvasElement).getContext("2d");
    //     if (!ctx) return;

    //     ctx.fillStyle = "green";
    //     ctx.fillRect(10, 10, 150, 100);
    // }, []);)

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
    const handleBoxMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        handleMouseMove(e)
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
                box.map((b, index) => {
                    return (
                        <div
                            onMouseMove={(e) => { handleBoxMove(e, index) }}
                            onMouseDown={(e) => { handleMouseDown(e) }}
                            onMouseUp={(e) => { handleMouseUp(index) }}

                            style={{
                                borderRadius: `${b.shape === 'square' ? '10px' : '100%'}`,
                                width: `${b.width}px`,
                                height: `${b.height}px`,
                                background: "transparent", position: 'absolute',
                                left: `${b.selected ? b.left + differencex : b.left}px`, top: `${b.selected ? b.right + differencey : b.right}px`,

                                color: 'black',
                                border: `${b.selected ? '5px solid blue' : '5px solid black'}`,
                                cursor: `${isSelected ? 'crosshair' : 'default'}`

                            }}
                            key={index}>
                            <BorderComponent width={'w-full'} height={'h-8'} position={'-top-4'} cursor={'n-resize'}
                                isMoving={isMoving} index={index} isSelected={isSelected} onBoxSelect={onBoxSelect} setIsMoving={setIsMoving}
                                setIsSelected={setIsSelected} shape={shape} setBox={setBox} box={box} isMouseDown={isMouseDown} setIsMouseDown={setIsMouseDown} />

                            <BorderComponent width={'w-full'} height={'h-8'} position={'-bottom-4'} cursor={'n-resize'}
                                isMoving={isMoving} index={index} isSelected={isSelected} onBoxSelect={onBoxSelect} setIsMoving={setIsMoving}
                                setIsSelected={setIsSelected} shape={shape} setBox={setBox} box={box} isMouseDown={isMouseDown} setIsMouseDown={setIsMouseDown} />

                            <BorderComponent width={'w-8'} height={'h-full'} position={'-left-4 top-0'} cursor={'e-resize'}
                                isMoving={isMoving} index={index} isSelected={isSelected} onBoxSelect={onBoxSelect} setIsMoving={setIsMoving}
                                setIsSelected={setIsSelected} shape={shape} setBox={setBox} box={box} isMouseDown={isMouseDown} setIsMouseDown={setIsMouseDown} />

                            <BorderComponent width={'w-8'} height={'h-full'} position={'-right-4 top-0'} cursor={'e-resize'}
                                isMoving={isMoving} index={index} isSelected={isSelected} onBoxSelect={onBoxSelect} setIsMoving={setIsMoving}
                                setIsSelected={setIsSelected} shape={shape} setBox={setBox} box={box} isMouseDown={isMouseDown} setIsMouseDown={setIsMouseDown} />

                        </div >
                    )
                })
            }
        </>
    );
};

export default MyCanvasComponent;