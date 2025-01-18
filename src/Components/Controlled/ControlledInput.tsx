import React from "react";
import { ControllerProps, useController } from "react-hook-form";
import { Input, InputProps } from "@chakra-ui/react";

type ControlledInputProps = Omit<ControllerProps<any>, "render"> & InputProps;

const ControlledInput = React.forwardRef(function ControlledSelect(
  { name, control, ...props }: ControlledInputProps,
  ref: React.Ref<HTMLInputElement>
) {
  const { field } = useController({
    control: control,
    name: name,
  });

  return <Input {...field} {...props} {...{ ref }} />;
});

export default ControlledInput;
