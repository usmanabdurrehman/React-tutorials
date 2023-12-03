export const getTodoStyles = ({ isSelected }: { isSelected: boolean }) => ({
  boxShadow: "lg",
  borderRadius: "lg",
  cursor: "pointer",
  p: 4,
  ...(isSelected
    ? {
        bg: "blue.600",
        color: "white",
      }
    : {}),
});
