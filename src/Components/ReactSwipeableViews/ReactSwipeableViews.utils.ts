export const SIZE = 400;

export const getRandomColor = () =>
  "#" + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0");

export const getSlideStyles = (color: string) => ({
  height: SIZE,
  width: SIZE,
  background: color,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 28,
});

export const slideContainerStyle = { height: SIZE, width: SIZE };
