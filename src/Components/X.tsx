import Konva from "konva";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Star,
  Text,
  Rect,
  Image as KonvaImage,
  Circle,
  Line,
  Arrow,
  Transformer,
} from "react-konva";

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false,
  }));
}

const INITIAL_STATE = generateShapes();

let isPaint: boolean | undefined;

const image = new Image();
image.src = "./jigglypuff.png";

function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // delete link;
}

const onPrintClick = () => {
  var dataURL = stageRef?.current?.toDataURL({ pixelRatio: 3 });
  downloadURI(dataURL, "stage.png");
};

enum DrawType {
  Rectangle = "rectangle",
  Circle = "circle",
  FreeDraw = "freedraw",
  Arrow = "arrow",
}

export const DiagramEditor = () => {
  const stageRef = useRef<any>(null);
  const currentShapeRef = useRef(0);
  const isPaintRef = useRef(false);

  const [rectangles, setRectangles] = useState<any[]>([
    { id: 1, x: 0, y: 0, width: 100, height: 100, type: "rectangle" },
  ]);
  const [imageType, setImageType] = useState<DrawType | undefined>();

  const [freeDraws, setFreeDraws] = useState<any[]>([]);

  const [rects, circles] = useMemo(
    () =>
      rectangles.reduce(
        (acc, val) => {
          if (val.type === "circle") acc[1].push(val);
          if (val.type === "rectangle") acc[0].push(val);
          return acc;
        },
        [[], []]
      ),
    [rectangles]
  );

  const layerRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);

  useEffect(() => {
    if (transformerRef && stageRef) {
      var shapes = stageRef?.current?.find(".rect");
      // shapes?.forEach((shape) => {
      //   console.log({ shape });
      //   shape?.cache();
      // });
      // transformerRef?.current?.nodes(shapes);
    }
  }, [stageRef, transformerRef]);

  const [isShapeSelected, setIsShapeSelected] = useState(false);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === stageRef?.current?.find(".image")?.[0];
    console.log("s", e.target, e.target.getStage(), clickedOnEmpty);
    if (clickedOnEmpty) {
      transformerRef?.current?.nodes([]);
    }
  };

  return (
    <>
      <button onClick={onPrintClick}>Print Image</button>
      <button onClick={() => setImageType(DrawType.Circle)}>Circle</button>
      <button onClick={() => setImageType(DrawType.Rectangle)}>
        Rectangle
      </button>
      <button onClick={() => setImageType(undefined)}>Select</button>
      <button
        onClick={() => {
          // layerRef?.current?.clearCache();
          setImageType(DrawType.FreeDraw);
        }}
      >
        Free Draw
      </button>
      <button onClick={() => setImageType(DrawType.Arrow)}>Arrow</button>
      <button
        onClick={() => {
          console.log("called");
          // layerRef?.current?.cache();
          // // layerRef?.current?.filters([Konva.Filters.Blur]);
          // layerRef?.current?.blurRadius(40);
          // layerRef?.current?.cache();
          // layerRef?.current?.brightness(0.5);
          // layerRef?.current?.cache();

          var shapes = stageRef?.current?.find(".image");
          shapes?.forEach((shape) => {
            console.log({ shape });
            shape?.cache();
            shape?.blurRadius(40);
            // layerRef?.current?.cache();
            shape?.brightness(0.5);
          });

          var shapes = stageRef?.current?.find(".rect");
          shapes?.forEach((shape) => {
            console.log({ shape });
            shape?.cache();
            shape?.blurRadius(40);
            // layerRef?.current?.cache();
            shape?.brightness(0.5);
          });
        }}
      >
        Contrast 40
      </button>
      <button
        onClick={() => {
          console.log("called");
          // layerRef?.current?.cache();
          // layerRef?.current?.filters([Konva.Filters.Blur]);
          // layerRef?.current?.blurRadius(10);
          // layerRef?.current?.cache();
          // layerRef?.current?.brightness(-0.5);
          // layerRef?.current?.clearCache();

          var shapes = stageRef?.current?.find(".image");
          shapes?.forEach((shape) => {
            console.log({ shape });
            shape?.cache();
            shape?.blurRadius(10);
            // layerRef?.current?.cache();
            shape?.brightness(-0.5);
          });

          var shapes = stageRef?.current?.find(".rect");
          shapes?.forEach((shape) => {
            console.log({ shape });
            shape?.cache();
            shape?.blurRadius(10);
            // layerRef?.current?.cache();
            shape?.brightness(-0.5);
          });
        }}
      >
        Contrast 10
      </button>
      <Stage
        height={500}
        width={500}
        ref={stageRef}
        // filters={[Konva.Filters.Blur]}
        // blurRadius={10}
        onMouseUp={() => {
          // layerRef?.current?.cache();
          isPaintRef.current = false;
        }}
        onMouseDown={(e) => {
          checkDeselect(e);
          // layerRef?.current?.cache();
          const tranformerNodes = transformerRef?.current?.nodes();
          console.log("nodes", tranformerNodes);
          if (tranformerNodes?.length) return;
          if (!imageType) return;
          isPaintRef.current = true;
          const stage = stageRef?.current;
          var pos = stage.getPointerPosition();
          // console.log({ x: pos.x, y: pos.y });
          const id = Date.now();
          currentShapeRef.current = id;
          setFreeDraws((prevFreeDraws) => [
            ...prevFreeDraws,
            { id, points: [pos.x, pos.y] },
          ]);
          // setRectangles((prevRectangles) => [
          //   ...prevRectangles,
          //   { id, height: 1, width: 1, x: pos.x, y: pos.y, type: imageType },
          // ]);
        }}
        onMouseMove={() => {
          // layerRef?.current?.cache();
          const tranformerNodes = transformerRef?.current?.nodes();
          console.log("nodes", tranformerNodes);
          if (tranformerNodes?.length) return;
          if (!isPaintRef.current) {
            return;
          }
          if (!imageType) return;
          const stage = stageRef?.current;
          const id = currentShapeRef.current;
          var pos = stage.getPointerPosition();
          setFreeDraws((prevFreeDraws) =>
            prevFreeDraws.map((prevFreeDraw) =>
              prevFreeDraw.id == id
                ? {
                    ...prevFreeDraw,
                    points: [...prevFreeDraw.points, pos.x, pos.y],
                  }
                : prevFreeDraw
            )
          );

          // setRectangles((prevRectangles) =>
          //   prevRectangles.map((prevRectangle) =>
          //     prevRectangle.id == id
          //       ? {
          //           ...prevRectangle,
          //           height: pos.y - prevRectangle.y,
          //           width: pos.x - prevRectangle.x,
          //         }
          //       : prevRectangle
          //   )
          // );
        }}
      >
        <Layer
          ref={layerRef}
          filters={[Konva.Filters.Blur, Konva.Filters.Brighten]}
        >
          <KonvaImage
            image={image}
            x={0}
            y={0}
            height={500}
            width={500}
            name="image"
            filters={[Konva.Filters.Blur, Konva.Filters.Brighten]}
          />
          {rects?.map((rectangle, index) => (
            <Rect
              key={rectangle.id}
              x={rectangle?.x}
              y={rectangle?.y}
              onClick={() => {
                // setIsShapeSelected(true);
                const shapes = stageRef?.current?.find(".rect");
                transformerRef?.current?.node(shapes?.[index]);
              }}
              height={rectangle?.height}
              width={rectangle?.width}
              stroke="black"
              name="rect"
              filters={[Konva.Filters.Blur, Konva.Filters.Brighten]}
              strokeWidth={1}
              draggable
            />
          ))}
          {circles?.map((rectangle) => (
            <Circle
              key={rectangle.id}
              x={rectangle?.x}
              y={rectangle?.y}
              height={rectangle?.height}
              width={rectangle?.width}
              stroke="black"
              strokeWidth={1}
              draggable
            />
          ))}
          {freeDraws.map((freeDraw, index) => (
            <Line
              key={freeDraw.id}
              lineCap="round"
              lineJoin="round"
              stroke="black"
              strokeWidth={4}
              points={freeDraw.points}
              name="line"
              onClick={() => {
                // setIsShapeSelected(true);
                isPaintRef.current = false;
                const shapes = stageRef?.current?.find(".line");
                transformerRef?.current?.node(shapes?.[index]);
              }}
              draggable
            />
          ))}
          <Arrow
            points={[0, 0, 80, 1000]}
            fill="black"
            stroke="black"
            strokeWidth={4}
            draggable
          />
          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
    </>
  );
};
