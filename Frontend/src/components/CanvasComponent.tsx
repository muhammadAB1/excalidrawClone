import { useEffect, useRef } from "react";

const MyCanvasComponent = () => {

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = (canvas as HTMLCanvasElement).getContext("2d");
        if (!ctx) return;

        ctx.fillStyle = "green";
        ctx.fillRect(10, 10, 150, 100);
    }, []);

    return (
        <canvas ref={canvasRef} width={300} height={150} />
    );
};

export default MyCanvasComponent;