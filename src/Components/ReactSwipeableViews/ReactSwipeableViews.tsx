import { Box, Flex, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import React, { useMemo, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import {
  bindKeyboard,
  autoPlay,
  virtualize,
} from "react-swipeable-views-utils";
import {
  slideContainerStyle,
  getSlideStyles,
  getRandomColor,
} from "./ReactSwipeableViews.utils";

const SwipeableViewsKeyBoard = bindKeyboard(SwipeableViews);
const SwipeableViewsAutoPlay = autoPlay(SwipeableViews);
const SwipeableViewsVirtualize = virtualize(SwipeableViews);

export const ReactSwipeableViews = () => {
  const COLORS = useMemo(
    () =>
      Array(200)
        .fill(undefined)
        .map((item) => getRandomColor()),
    []
  );

  const [index, setIndex] = useState(0);

  return (
    <Flex gap={4} alignItems="center">
      <Flex>
        <IconButton
          aria-label="left"
          onClick={() => setIndex(index - 1)}
          colorScheme="whatsapp"
        >
          <ChevronLeftIcon />
        </IconButton>
      </Flex>
      <Flex>
        <SwipeableViewsVirtualize
          containerStyle={slideContainerStyle}
          index={index}
          onChangeIndex={(index) => setIndex(index)}
          slideCount={10000}
          slideRenderer={({ index, key }) => {
            return (
              <div key={key} style={getSlideStyles(COLORS[index])}>
                Slide No {index + 1}
              </div>
            );
          }}
          axis="y"
        />
      </Flex>
      <Flex>
        <IconButton
          aria-label="right"
          onClick={() => setIndex(index + 1)}
          colorScheme="whatsapp"
        >
          <ChevronRightIcon />
        </IconButton>
      </Flex>
    </Flex>
  );
};
