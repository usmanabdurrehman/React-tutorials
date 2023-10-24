export {};

declare global {
  namespace Shape {
    interface Circle {
      id: number;
      radius: number;
    }
    interface Rectangle {
      id: number;
      width: number;
      height: number;
    }
  }
}
