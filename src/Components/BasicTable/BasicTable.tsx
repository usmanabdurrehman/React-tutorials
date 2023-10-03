import { useMemo, useState } from "react";

import {
  ColumnOrderState,
  ColumnPinningState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Table,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import "./index.css";
import { User } from "../../types";
import { USERS } from "../../data";
import moment from "moment";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
  FaDiceFour,
  FaEllipsisVertical,
  FaMapPin,
  FaMinus,
  FaPlus,
} from "react-icons/fa6";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const columnHelper = createColumnHelper<User>();

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // change background colour if dragging
  background: isDragging ? "lightgray" : "white",

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
  columnHelper.display({
    id: "selection",
    header: ({ table }) => {
      return (
        <Checkbox
          isChecked={table.getIsAllRowsSelected()}
          isIndeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          isChecked={row.getIsSelected()}
          isIndeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      );
    },
  }),
  columnHelper.display({
    id: "expander",
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <IconButton
          aria-label="Expand Row"
          icon={row.getIsExpanded() ? <FaMinus /> : <FaPlus />}
          onClick={row.getToggleExpandedHandler()}
          size="xs"
        />
      ) : null;
    },
  }),
  columnHelper.accessor("id", {
    id: "id",
    header: "Id",
  }),
  columnHelper.accessor("avatar", {
    id: "avatar",
    header: "Avatar",
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
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",
  }),
  columnHelper.accessor("email", {
    id: "email",
    header: "Email",
  }),
  columnHelper.accessor("birthDate", {
    id: "birthDate",
    header: "Birth date",
    cell: (info) => moment(info.getValue()).format("MM/DD/YYYY"),
    // size: 400,
  }),
  columnHelper.accessor("registeredAt", {
    id: "registeredAt",
    header: "Registered at",
    cell: (info) => moment(info.getValue()).format("MM/DD/YYYY"),
  }),
];

const columnIds = columns.map((column) => column.id) as string[];

export default function BasicTable() {
  const table = useReactTable<User>({
    data: USERS,
    columns,
    enableRowSelection: true,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      columnVisibility: {
        id: true,
        avatar: true,
        name: true,
        email: true,
        birthDate: true,
        registeredAt: true,
      },
      columnOrder: columnIds,
    },
    // Controlled tutorial
    state: {},
  });

  const columnVisibilityCheckboxState = Object.entries(
    table.getState().columnVisibility
  )
    .filter(([key, value]) => value)
    .map(([key]) => key);

  console.log("columnOrder", table.getState().columnOrder);

  return (
    <Flex height="96vh" direction={"column"}>
      <Box>
        <Popover>
          <PopoverTrigger>
            <IconButton
              aria-label="Show Column Visibility"
              icon={<FaDiceFour />}
              size="xs"
              m={2}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <CheckboxGroup
                value={columnVisibilityCheckboxState}
                colorScheme="green"
                onChange={(selectedOptions) =>
                  table.setColumnVisibility(
                    columnIds.reduce((acc, val) => {
                      acc[val] = selectedOptions.includes(val);
                      return acc;
                    }, {} as any)
                  )
                }
              >
                <RadioGroup
                  onChange={(value) =>
                    table.setColumnVisibility(
                      columnIds.reduce((acc, val) => {
                        acc[val] = value === "all";
                        return acc;
                      }, {} as any)
                    )
                  }
                  mb={2}
                  defaultValue="all"
                >
                  <Stack direction="row">
                    <Radio value="all">Show All</Radio>
                    <Radio value="none">Show None</Radio>
                  </Stack>
                </RadioGroup>
                <Stack>
                  <Checkbox value="id">Id</Checkbox>
                  <Checkbox value="avatar">Avatar</Checkbox>
                  <Checkbox value="name">name</Checkbox>
                  <Checkbox value="email">Email</Checkbox>
                  <Checkbox value="birthDate">Birth Date</Checkbox>
                  <Checkbox value="registeredAt">Registered At</Checkbox>
                </Stack>
              </CheckboxGroup>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
      <Flex grow={1} overflow="auto">
        <table style={{ overflow: "auto" }}>
          <DragDropContext
            onDragEnd={({ destination, source }) => {
              if (!destination) {
                return;
              }

              console.log({ destination, source });

              const items = reorder(
                table.getState().columnOrder,
                source.index,
                destination.index
              );

              table.setColumnOrder(items);
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
                                <Menu>
                                  <MenuButton
                                    as={IconButton}
                                    aria-label="Options"
                                    icon={<FaEllipsisVertical />}
                                    style={{
                                      position: "absolute",
                                      right: 4,
                                      top: 10,
                                      color: "black",
                                    }}
                                    color="teal"
                                    variant="ghost"
                                    size="xs"
                                  />
                                  <MenuList color="black">
                                    {header.column.getIsPinned() !==
                                      "right" && (
                                      <MenuItem
                                        onClick={() =>
                                          header.column.pin("right")
                                        }
                                      >
                                        Pin to Right
                                      </MenuItem>
                                    )}
                                    {header.column.getIsPinned() !== "left" && (
                                      <MenuItem
                                        onClick={() =>
                                          header.column.pin("left")
                                        }
                                      >
                                        Pin to Left
                                      </MenuItem>
                                    )}
                                    {header.column.getIsPinned() && (
                                      <MenuItem
                                        onClick={() => header.column.pin(false)}
                                      >
                                        Unpin
                                      </MenuItem>
                                    )}

                                    <MenuItem
                                      onClick={header.column.getToggleSortingHandler()}
                                    >
                                      {header.column.getIsSorted() === "desc"
                                        ? "Sort Asc"
                                        : "Sort Desc"}
                                    </MenuItem>
                                  </MenuList>
                                </Menu>

                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
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
              <>
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
                <tr>
                  {row.getIsExpanded() && (
                    <td colSpan={row.getVisibleCells().length}>
                      <Flex height={150} gap={4} p={2}>
                        <Flex width={150}>
                          <img
                            src={row.original.avatar}
                            height="100%"
                            width="100%"
                          />
                        </Flex>
                        <Box width="50%">
                          <p>Name: {row.original.name}</p>
                          <p>Email: {row.original.email}</p>
                          <p>
                            DOB:{" "}
                            {moment(row.original.birthDate).format(
                              "MM/DD/YYYY"
                            )}
                          </p>
                        </Box>
                      </Flex>
                    </td>
                  )}
                </tr>
              </>
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
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            size="xs"
          />
          <IconButton
            aria-label="Next Page"
            icon={<FaAngleRight />}
            onClick={() => table.nextPage()}
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
