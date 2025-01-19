import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

export const useFormUtils = () => {
  const form = useFormContext();
  const { setValue } = form;

  const setValuesThroughObject = useCallback(
    (values: { [id: string]: any }) => {
      Object.entries(values).forEach(([key, value]) => {
        setValue(key, value);
      });
    },
    [setValue]
  );

  return { ...form, setValuesThroughObject };
};
