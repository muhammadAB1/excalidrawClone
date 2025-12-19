export interface box {
    height: number;
    width: number;
    left: number;
    right: number;
    shape: shapeType
}

export type shapeType = "square" | "circle";
