import { useEffect, useRef } from "react";

const MyCanvasComponent = () => {

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "green";
        ctx.fillRect(10, 10, 150, 100);
    }, []);

    return (
        <canvas ref={canvasRef} width={300} height={150} />
    );
};

export default MyCanvasComponent;