import {
  ArrowsMove,
  ArrowUpLeft,
  ArrowUpLeftSquareFill,
  Circle,
  Pencil,
  Square,
} from "react-bootstrap-icons";

export enum DrawAction {
  Select = "select",
  Rectangle = "rectangle",
  Circle = "circle",
  Scribble = "freedraw",
  Arrow = "arrow",
  Undo = "Undo",
  Redo = "Redo",
  Clear = "Clear",
}

export enum CanvasAction {
  Add = "add",
  Delete = "delete",
  Resize = "resize",
  Drag = "drag",
}

export const PAINT_OPTIONS = [
  {
    id: DrawAction.Select,
    label: "Select Shapes",
    icon: <ArrowUpLeftSquareFill />,
  },
  { id: DrawAction.Rectangle, label: "Draw Rectangle Shape", icon: <Square /> },
  { id: DrawAction.Circle, label: "Draw Cirle Shape", icon: <Circle /> },
  { id: DrawAction.Arrow, label: "Draw Arrow Shape", icon: <ArrowUpLeft /> },
  { id: DrawAction.Scribble, label: "Scribble", icon: <Pencil /> },
];
