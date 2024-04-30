import { KonvaEventObject } from "konva/lib/Node";
import React, { useCallback, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Rect as KonvaRect,
  Image as KonvaImage,
  Circle as KonvaCircle,
  Line as KonvaLine,
  Arrow as KonvaArrow,
  Transformer,
} from "react-konva";
import { v4 as uuidv4 } from "uuid";
import { Arrow, Circle, Rectangle, Scribble } from "./Paint.types";
import { CanvasAction, DrawAction, PAINT_OPTIONS } from "./Paint.constants";
import { SketchPicker } from "react-color";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { Download, Upload, XLg } from "react-bootstrap-icons";

interface PaintProps {}

const downloadURI = (uri: string | undefined, name: string) => {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri || "";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const SIZE = 500;

export const Paint: React.FC<PaintProps> = React.memo(function Paint({}) {
  const [color, setColor] = useState("#000");
  const [drawAction, setDrawAction] = useState<DrawAction>(DrawAction.Select);
  const [scribbles, setScribbles] = useState<Scribble[]>([]);
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [arrows, setArrows] = useState<Arrow[]>([]);
  const [image, setImage] = useState<HTMLImageElement>();

  const onImportImageSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        const imageUrl = URL.createObjectURL(e.target.files?.[0]);
        const image = new Image(SIZE / 2, SIZE / 2);
        image.src = imageUrl;
        setImage(image);
      }
      e.target.files = null;
    },
    []
  );

  const fileRef = useRef<HTMLInputElement>(null);
  const onImportImageClick = useCallback(() => {
    fileRef?.current && fileRef?.current?.click();
  }, []);

  const stageRef = useRef<any>(null);

  const onExportClick = useCallback(() => {
    const dataUri = stageRef?.current?.toDataURL({ pixelRatio: 3 });
    downloadURI(dataUri, "image.png");
  }, []);

  const onClear = useCallback(() => {
    setRectangles([]);
    setCircles([]);
    setScribbles([]);
    setArrows([]);
    setImage(undefined);
  }, []);

  const isPaintRef = useRef(false);

  const onStageMouseUp = useCallback(() => {
    isPaintRef.current = false;
  }, []);

  const currentShapeRef = useRef<string>();

  const onStageMouseDown = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (drawAction === DrawAction.Select) return;
      isPaintRef.current = true;
      const stage = stageRef?.current;
      const pos = stage?.getPointerPosition();
      const x = pos?.x || 0;
      const y = pos?.y || 0;
      const id = uuidv4();
      currentShapeRef.current = id;

      switch (drawAction) {
        case DrawAction.Scribble: {
          setScribbles((prevScribbles) => [
            ...prevScribbles,
            {
              id,
              points: [x, y],
              color,
            },
          ]);
          break;
        }
        case DrawAction.Circle: {
          setCircles((prevCircles) => [
            ...prevCircles,
            {
              id,
              radius: 1,
              x,
              y,
              color,
            },
          ]);
          break;
        }
        case DrawAction.Rectangle: {
          setRectangles((prevRectangles) => [
            ...prevRectangles,
            {
              id,
              height: 1,
              width: 1,
              x,
              y,
              color,
            },
          ]);
          break;
        }
        case DrawAction.Arrow: {
          setArrows((prevArrows) => [
            ...prevArrows,
            {
              id,
              points: [x, y, x, y],
              color,
            },
          ]);
          break;
        }
      }
    },
    [drawAction, color]
  );

  const onStageMouseMove = useCallback(() => {
    if (drawAction === DrawAction.Select || !isPaintRef.current) return;

    const stage = stageRef?.current;
    const id = currentShapeRef.current;
    const pos = stage?.getPointerPosition();
    const x = pos?.x || 0;
    const y = pos?.y || 0;

    switch (drawAction) {
      case DrawAction.Scribble: {
        setScribbles((prevScribbles) =>
          prevScribbles?.map((prevScribble) =>
            prevScribble.id === id
              ? {
                  ...prevScribble,
                  points: [...prevScribble.points, x, y],
                }
              : prevScribble
          )
        );
        break;
      }
      case DrawAction.Circle: {
        setCircles((prevCircles) =>
          prevCircles?.map((prevCircle) =>
            prevCircle.id === id
              ? {
                  ...prevCircle,
                  radius:
                    ((x - prevCircle.x) ** 2 + (y - prevCircle.y) ** 2) ** 0.5,
                }
              : prevCircle
          )
        );
        break;
      }
      case DrawAction.Rectangle: {
        setRectangles((prevRectangles) =>
          prevRectangles?.map((prevRectangle) =>
            prevRectangle.id === id
              ? {
                  ...prevRectangle,
                  height: y - prevRectangle.y,
                  width: x - prevRectangle.x,
                }
              : prevRectangle
          )
        );
        break;
      }
      case DrawAction.Arrow: {
        setArrows((prevArrows) =>
          prevArrows.map((prevArrow) =>
            prevArrow.id === id
              ? {
                  ...prevArrow,
                  points: [prevArrow.points[0], prevArrow.points[1], x, y],
                }
              : prevArrow
          )
        );
        break;
      }
    }
  }, [drawAction]);

  const transformerRef = useRef<any>(null);

  const onShapeClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (drawAction !== DrawAction.Select) return;
      const currentTarget = e.currentTarget;
      transformerRef?.current?.node(currentTarget);
    },
    [drawAction]
  );

  const isDraggable = drawAction === DrawAction.Select;

  const onBgClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      transformerRef?.current?.nodes([]);
    },
    [drawAction]
  );

  const getSetterByType = useCallback((type: DrawAction | undefined) => {
    let setter: React.Dispatch<React.SetStateAction<any[]>> | undefined;
    switch (type) {
      case DrawAction.Rectangle:
        setter = setRectangles;
        break;
      case DrawAction.Circle:
        setter = setCircles;
        break;
      case DrawAction.Arrow:
        setter = setArrows;
        break;
      case DrawAction.Scribble:
        setter = setScribbles;
        break;
      case DrawAction.Text:
        setter = setTexts;
        break;
    }
    return setter;
  }, []);

  const getRecordsByType = useCallback(
    (type: DrawAction | undefined) => {
      let records: any[] | undefined;
      switch (type) {
        case DrawAction.Rectangle:
          records = rectangles;
          break;
        case DrawAction.Circle:
          records = circles;
          break;
        case DrawAction.Arrow:
          records = arrows;
          break;
        case DrawAction.Scribble:
          records = scribbles;
          break;
        case DrawAction.Text:
          records = texts;
          break;
      }
      return records;
    },
    [arrows, circles, rectangles, scribbles]
  );

  const onTransformShapeStart = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      setCanvasHistory((prevCanvasHistory) => [
        ...prevCanvasHistory,
        {
          type: CanvasAction.Resize,
          drawAction: e.target.attrs.name,
          payload: {
            id: e.target.attrs.id,
            scaleX: e.target.attrs.scaleX,
            scaleY: e.target.attrs.scaleY,
          },
        },
      ]);
    },
    []
  );

  const onDragShapeStart = useCallback((e: KonvaEventObject<MouseEvent>) => {
    setCanvasHistory((prevCanvasHistory) => [
      ...prevCanvasHistory,
      {
        type: CanvasAction.Drag,
        drawAction: e.target.attrs.name,
        payload: {
          id: e.target.attrs.id,
          x: e.target.attrs.x,
          y: e.target.attrs.y,
        },
      },
    ]);
  }, []);

  const onUndoClick = useCallback(() => {
    const canvasHistoryPayload = [...canvasHistory];
    const lastAction = canvasHistoryPayload.pop();
    setCanvasHistory(canvasHistoryPayload);

    const setter = getSetterByType(lastAction?.drawAction);
    const id = lastAction?.payload?.id;
    if (!setter) return;
    switch (lastAction?.type) {
      case CanvasAction.Add: {
        transformerRef?.current?.nodes([]);
        setter((prevRecords) =>
          prevRecords.filter((prevRecord) => prevRecord.id !== id)
        );
        break;
      }
      case CanvasAction.Delete: {
        setter((prevRecords) => [...prevRecords, lastAction?.payload?.record]);
        break;
      }
      case CanvasAction.Resize: {
        setter((prevRecords) =>
          prevRecords.map((prevRecord) =>
            prevRecord.id === id
              ? { ...prevRecord, ...lastAction?.payload }
              : prevRecord
          )
        );
        break;
      }
      case CanvasAction.Drag: {
        setter((prevRecords) =>
          prevRecords.map((prevRecord) =>
            prevRecord.id === id
              ? { ...prevRecord, ...lastAction?.payload }
              : prevRecord
          )
        );
        break;
      }
    }
  }, [canvasHistory, getSetterByType]);

  return (
    <Box m={4} width={`${SIZE}px`}>
      <Flex justifyContent={"space-between"} alignItems="center">
        <ButtonGroup size="sm" isAttached variant="solid">
          {PAINT_OPTIONS.map(({ id, label, icon }) => (
            <IconButton
              aria-label={label}
              icon={icon}
              onClick={() => setDrawAction(id)}
              colorScheme={id === drawAction ? "whatsapp" : undefined}
            />
          ))}
          <Popover>
            <PopoverTrigger>
              <Box
                bg={color}
                h={"32px"}
                w={"32px"}
                borderRadius="sm"
                cursor="pointer"
              ></Box>
            </PopoverTrigger>
            <PopoverContent width="300">
              <PopoverArrow />
              <PopoverCloseButton />
              {/*@ts-ignore*/}
              <SketchPicker
                color={color}
                onChangeComplete={(selectedColor) =>
                  setColor(selectedColor.hex)
                }
              />
            </PopoverContent>
          </Popover>
          <IconButton aria-label={"Clear"} icon={<XLg />} onClick={onClear} />
        </ButtonGroup>
        <Flex gap={4} alignItems="center" height="100%">
          <input
            type="file"
            ref={fileRef}
            onChange={onImportImageSelect}
            style={{ display: "none" }}
            accept="image/*"
          />
          <Button
            leftIcon={<Upload />}
            variant="solid"
            onClick={onImportImageClick}
            size="sm"
          >
            Import Image
          </Button>
          <Button
            leftIcon={<Download />}
            colorScheme="whatsapp"
            variant="solid"
            onClick={onExportClick}
            size="sm"
          >
            Export
          </Button>
        </Flex>
      </Flex>

      <Box
        width={`${SIZE}px`}
        height={`${SIZE}px`}
        border="1px solid black"
        mt={4}
        overflow="hidden"
      >
        <Stage
          height={SIZE}
          width={SIZE}
          ref={stageRef}
          onMouseUp={onStageMouseUp}
          onMouseDown={onStageMouseDown}
          onMouseMove={onStageMouseMove}
        >
          <Layer>
            <KonvaRect
              x={0}
              y={0}
              height={SIZE}
              width={SIZE}
              fill="white"
              id="bg"
              onClick={onBgClick}
            />
            {image && (
              <KonvaImage
                image={image}
                x={0}
                y={0}
                height={SIZE / 2}
                width={SIZE / 2}
                draggable={isDraggable}
              />
            )}
            {arrows.map((arrow) => (
              <KonvaArrow
                key={arrow.id}
                id={arrow.id}
                points={arrow.points}
                fill={arrow.color}
                stroke={arrow.color}
                strokeWidth={4}
                onClick={onShapeClick}
                draggable={isDraggable}
              />
            ))}
            {rectangles.map((rectangle) => (
              <KonvaRect
                key={rectangle.id}
                x={rectangle?.x}
                y={rectangle?.y}
                height={rectangle?.height}
                width={rectangle?.width}
                stroke={rectangle?.color}
                id={rectangle?.id}
                strokeWidth={4}
                onClick={onShapeClick}
                draggable={isDraggable}
              />
            ))}
            {circles.map((circle) => (
              <KonvaCircle
                key={circle.id}
                id={circle.id}
                x={circle?.x}
                y={circle?.y}
                radius={circle?.radius}
                stroke={circle?.color}
                strokeWidth={4}
                onClick={onShapeClick}
                draggable={isDraggable}
              />
            ))}
            {scribbles.map((scribble) => (
              <KonvaLine
                key={scribble.id}
                id={scribble.id}
                lineCap="round"
                lineJoin="round"
                stroke={scribble?.color}
                strokeWidth={4}
                points={scribble.points}
                onClick={onShapeClick}
                draggable={isDraggable}
              />
            ))}
            <Transformer ref={transformerRef} />
          </Layer>
        </Stage>
      </Box>
    </Box>
  );
});
