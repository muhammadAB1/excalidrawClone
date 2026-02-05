import React, { useState } from 'react'
import type { box } from "../types";

const BorderComponent = ({ width,
    height,
    position,
    cursor,
    setIsSelected,
    shape,
    isMoving,
    onBoxSelect,
    index,
    setIsMoving,
    isSelected,
    setBox,
    box,
    isMouseDown
}
    :
    {
        width: string,
        height: string,
        position: string,
        cursor: string,
        setIsSelected: (state: boolean) => void,
        shape: string,
        isMoving: boolean
        onBoxSelect: (state: number) => void,
        index: number,
        setIsMoving: (state: boolean) => void,
        isSelected: boolean,
        setBox: (state: box[]) => void,
        box: box[]
        isMouseDown: boolean

    }
) => {
    const [initialx, setInitialx] = useState(0)
    const [initialy, setInitialy] = useState(0)
    const [differenceHeight, setDifferenceHeight] = useState(0)
    const [differenceWidth, setDifferenceWidth] = useState(0)

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setDifferenceHeight(0)
        // setDifferencey(0)
        setInitialy(e.clientY)
        // console.log('initial position', initialy)
        // setInitialy(e.clientY)
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMouseDown) {
            setDifferenceHeight((initialy - e.clientY));
            // console.log(differenceHeight)
            console.log(box)

        }
        // setDifferencey((e.clientY - initialy));
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {

        setBox(
            box.map((b) =>
                b.selected ? {
                    ...b, height: (b.height + differenceHeight),
                } : b
            )
        );


        setInitialx(0)
        // setInitialy(0)
        setDifferenceHeight(0)
        // setDifferencey(0)



    }

    return (
        <div
            onClick={(e) => { e.stopPropagation(); setIsSelected(true); shape === 'click' && !isMoving && onBoxSelect(index); shape === 'click' && setIsMoving(true) }}
            onMouseMove={(e) => { handleMouseMove(e) }}
            onMouseDown={(e) => { handleMouseDown(e) }}
            onMouseUp={(e) => { handleMouseUp(e) }}
            className={`absolute w-${width} h-${height} ${position} bg-transparent hover:cursor-crosshair ${isSelected && `hover:${cursor}`}`}></div>
    )
}

export default BorderComponent