import React, { useState } from 'react'
import type { box } from "../types";

const BorderComponent = ({
    width,
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
    isMouseDown,
    setIsMouseDown
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
        box: box[],
        setBox: (box: box[]) => void,
        isMouseDown: boolean,
        setIsMouseDown: (state: boolean) => void
    }
) => {
    const [initialx, setInitialx] = useState(0)
    const [initialy, setInitialy] = useState(0)
    const [differenceHeight, setDifferenceHeight] = useState(0)
    const [differenceWidth, setDifferenceWidth] = useState(0)

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsMouseDown(true)
        setInitialy(e.clientY)
        console.log(
            box.map((b) =>
                b.selected ? {
                    ...b, height: (b.height - differenceHeight),
                } : b
            )
        )
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMouseDown) {
            console.log(`initialy: ${initialy} finaly:${e.clientY}`)
            setDifferenceHeight((initialy + e.clientY));
            // console.log(differenceHeight)

        }
        // setDifferencey((e.clientY - initialy));
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {

        setBox(
            box.map((b) =>
                b.selected ? {
                    ...b, height: (b.height - differenceHeight),
                } : b
            )
        );
        console.log(
            box.map((b) =>
                b.selected ? {
                    ...b, height: (b.height - differenceHeight),
                } : b
            )
        )


        setInitialx(0)
        // setInitialy(0)
        setDifferenceHeight(0)
        // setDifferencey(0)



    }

    return (
        <div
            onClick={(e) => { e.stopPropagation(); setIsSelected(true); shape === 'click' && !isMoving && onBoxSelect(index); }}
            onMouseMove={(e) => { handleMouseMove(e) }}
            onMouseDown={(e) => { handleMouseDown(e); setIsSelected(true); onBoxSelect(index) }}
            onMouseUp={(e) => { handleMouseUp(e) }}
            className={`absolute ${width} ${height} ${position}`}
            style={{
                cursor: `${isSelected ? `${cursor}` : `crosshair`}`
            }}
        ></div>
    )
}

export default BorderComponent