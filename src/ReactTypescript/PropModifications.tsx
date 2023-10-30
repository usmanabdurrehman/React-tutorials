import { Card, CardProps } from "@chakra-ui/react";

// Extending/Pick/Omit/Partial/Required

// Required
export const FullControlCard = (props: Required<CardProps>) => {
  return <Card {...props} />;
};

<FullControlCard />;

// Partial
export const DefaultCard = (props: Partial<CardProps>) => {
  return <Card {...props} />;
};

<DefaultCard />;

// Pick
export const CardWrapper = (props: Pick<CardProps, "children">) => {
  return <Card background="yellow.100" p={4} m={4} {...props} />;
};

<CardWrapper children={2} />;

// Omit
export const FixedWidthCard = (props: Omit<CardProps, "width">) => {
  return <Card width="100px" {...props} />;
};

<FixedWidthCard />;

export const NiceCard = ({
  isBusinessCard,
  ...rest
}: CardProps & { isBusinessCard?: boolean }) => {
  if (isBusinessCard)
    return (
      <Card
        p={2}
        background="blue.300"
        m={2}
        borderRadius="4px"
        boxShadow={"xl"}
        {...rest}
      />
    );

  return <Card {...rest} />;
};

<NiceCard />;
