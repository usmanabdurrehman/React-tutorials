import { useState } from "react";

import {
  ColumnOrderState,
  ColumnPinningState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  Table,
  useReactTable,
} from "@tanstack/react-table";
import "./index.css";
import { User } from "../../types";
import { USERS } from "../../data";
import moment from "moment";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
  FaMapPin,
} from "react-icons/fa6";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const columnHelper = createColumnHelper<User>();

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const reorder = (
  list: string[],
  startIndex: number,
  endIndex: number
): string[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const columns = [
  columnHelper.accessor("id", {}),
  columnHelper.accessor("avatar", {
    cell: (info) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={info.getValue()}
          style={{ height: 30, width: 30, borderRadius: "50%" }}
        />
      </div>
    ),
  }),
  columnHelper.accessor("name", {}),
  columnHelper.accessor("email", {}),
  columnHelper.accessor("birthDate", {
    cell: (info) => moment(info.getValue()).format("MM/DD/YYYY"),
    // size: 400,
  }),
  columnHelper.accessor("registeredAt", {
    cell: (info) => moment(info.getValue()).format("MM/DD/YYYY"),
  }),
];

const columnOrderInitial = [
  "id",
  "avatar",
  "name",
  "email",
  "birthDate",
  "registeredAt",
].map((column, index) => ({ label: column, id: index }));

export default function BasicTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([
    "id",
    "avatar",
    "name",
    "email",
    "birthDate",
    "registeredAt",
  ]);

  const [columnPin, setColumnPin] = useState<ColumnPinningState>({
    left: ["id"],
    right: ["registeredAt"],
  });

  const { pageIndex, pageSize } = pagination;

  const table = useReactTable({
    data: USERS,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPin,
    state: {
      columnPinning: columnPin,
      columnOrder,
      columnVisibility: {
        firstName: false,
      },
      pagination: {
        pageSize,
        pageIndex,
      },
    },
  });

  console.log({ columnOrder });

  return (
    <Flex height="96vh" direction={"column"}>
      <Flex grow={1} overflow="auto">
        <table style={{ overflow: "auto" }}>
          <DragDropContext
            onDragEnd={({ destination, source }) => {
              if (!destination) {
                return;
              }

              console.log({ destination, source });

              const items = reorder(
                columnOrder,
                source.index,
                destination.index
              );

              setColumnOrder(items);
            }}
          >
            <Droppable droppableId="header" direction="horizontal">
              {/*@ts-ignore */}
              {(provided) => (
                <thead
                  style={{ position: "sticky", top: 0 }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {table.getHeaderGroups().map((headerGroup, index) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header, index) => {
                        return (
                          <Draggable
                            draggableId={header.id}
                            key={header.id}
                            index={index}
                            isDragDisabled={!!header.column.getIsPinned()}
                          >
                            {/*@ts-ignore */}
                            {(provided, snapshot) => (
                              <th
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                key={header.id}
                                colSpan={header.colSpan}
                                style={{
                                  width: header.getSize(),
                                  position: "relative",
                                  ...getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  ),
                                }}
                              >
                                <IconButton
                                  aria-label="Pin Column"
                                  icon={<FaMapPin />}
                                  onClick={() =>
                                    header.column.pin(
                                      header.column.getIsPinned() === "left"
                                        ? false
                                        : "left"
                                    )
                                  }
                                  colorScheme={
                                    header.column.getIsPinned() === "left"
                                      ? "red"
                                      : "whatsapp"
                                  }
                                  style={{
                                    position: "absolute",
                                    top: 14,
                                    left: 4,
                                  }}
                                  size="xs"
                                />
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                                <IconButton
                                  aria-label="Pin Column"
                                  icon={<FaMapPin />}
                                  onClick={() =>
                                    header.column.pin(
                                      header.column.getIsPinned() === "right"
                                        ? false
                                        : "right"
                                    )
                                  }
                                  colorScheme={
                                    header.column.getIsPinned() === "right"
                                      ? "red"
                                      : "whatsapp"
                                  }
                                  style={{
                                    position: "absolute",
                                    top: 14,
                                    right: 4,
                                  }}
                                  size="xs"
                                />
                              </th>
                            )}
                          </Draggable>
                        );
                      })}
                    </tr>
                  ))}
                  {provided.placeholder}
                </thead>
              )}
            </Droppable>
          </DragDropContext>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} style={{ width: "100%" }}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <td key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </Flex>
      <Box>
        <Flex gap={2} mt={4}>
          <IconButton
            aria-label="First Page"
            icon={<FaAnglesLeft />}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            size="xs"
          />
          <IconButton
            aria-label="Prev Page"
            icon={<FaAngleLeft />}
            onClick={() => table.setPageIndex(pageIndex - 1)}
            disabled={!table.getCanPreviousPage()}
            size="xs"
          />
          <IconButton
            aria-label="Next Page"
            icon={<FaAngleRight />}
            onClick={() => table.setPageIndex(pageIndex + 1)}
            disabled={!table.getCanNextPage()}
            size="xs"
          />
          <IconButton
            aria-label="Last Page"
            icon={<FaAnglesRight />}
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            size="xs"
          />
        </Flex>
      </Box>
    </Flex>
  );
}
