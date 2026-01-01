export interface box {
    height: number;
    width: number;
    left: number;
    right: number;
    shape: shapeType
    selected: boolean;
}

export type shapeType = "square" | "circle";
