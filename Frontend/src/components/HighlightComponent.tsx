import type { operation } from "../types"

const HighlightComponent = ({ shape, differencex, differencey, initialx, initialy, x, y, isDrawing, isMouseDown }:
    { shape: operation, differencex: number, differencey: number, initialx: number, initialy: number, x: number, y: number, isDrawing: boolean, isMouseDown: boolean }) => {
    return (
        <>
            {
                shape !== 'click' && !isDrawing && isMouseDown &&
                <div style={{
                    borderRadius: `${shape === 'square' ? '10px' : '100%'}`,
                    width: `${differencex}px`,
                    height: `${differencey}px`,
                    background: 'transparemt',
                    border: '5px solid black',
                    position: 'absolute',
                    left: `${Math.min(initialx, x)}px`,
                    top: `${Math.min(initialy, y)}px`
                }}
                />
            }
        </>
    )
}

export default HighlightComponent