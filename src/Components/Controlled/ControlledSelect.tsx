import { Select, SelectProps } from "@chakra-ui/react";
import React from "react";
import { ControllerProps, useController, useWatch } from "react-hook-form";

type ControlledSelectProps<T> = Omit<ControllerProps<any>, "render"> &
  SelectProps & {
    shouldWatchForFieldChange?: boolean;
  };

const genericForwardRef: <T>(component: T) => T = React.forwardRef as any;

const ControlledSelect = genericForwardRef(function ControlledSelect<T>(
  {
    name,
    control,
    shouldWatchForFieldChange,
    ...props
  }: ControlledSelectProps<T>,
  ref: React.Ref<HTMLSelectElement>
) {
  const { field } = useController({
    control: control,
    name: name,
    defaultValue: "",
  });

  const value = useWatch({
    name,
    disabled: !shouldWatchForFieldChange,
  });

  const selectValue = shouldWatchForFieldChange ? value : field.value;
  console.log({ selectValue, fieldValue: field.value, value });

  return <Select {...field} value={selectValue} {...props} {...{ ref }} />;
});

export default ControlledSelect;
