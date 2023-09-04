import { useEffect, useState } from "react";
import { useColors } from "./useColors";

const initailState: any[] = [];

export const ColorSelect = () => {
  const { data } = useColors();
  const [formattedOptions, setFormattedOptions] = useState<
    { id: number; label: string }[]
  >([]);

  useEffect(() => {
    setFormattedOptions(
      (data || []).map(({ id, name }) => ({ id, label: name }))
    );
  }, [data]);

  console.log("Select rerenders");

  return (
    <select placeholder="Select Color">
      {formattedOptions?.map(({ id, label }) => (
        <option value={id}>{label}</option>
      ))}
    </select>
  );
};
