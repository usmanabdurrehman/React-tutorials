import { Card, CardProps } from "@chakra-ui/react";

// Extending/Pick/Omit/Partial/Required

enum NiceCardType {
  Business = "business",
  Birthday = "birthday",
  NewYear = "newYear",
}

export const NiceCard = ({
  type,
  ...rest
}: CardProps & { type?: NiceCardType }) => {
  let width = "100%";
  switch (type) {
    case NiceCardType.Business: {
      width = "100px";
      break;
    }
    case NiceCardType.Birthday: {
      width = "200px";
      break;
    }
    case NiceCardType.NewYear: {
      width = "300px";
      break;
    }
  }

  return <Card width={width} {...rest} />;
};

<NiceCard type={NiceCardType.NewYear} />;
