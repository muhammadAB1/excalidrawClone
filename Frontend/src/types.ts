export interface box {
    height: number;
    width: number;
    left: number;
    right: number;
    shape: operation
    selected: boolean;
}

export type operation = "square" | "circle" | 'click';
