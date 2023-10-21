import { useMemo, useState } from "react";

/**
 * TODO: Number Pagination, Delete Button at the end maybe, Search/Filter
 */

import {
  ColumnOrderState,
  ColumnPinningState,
  createColumnHelper,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
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
  Input,
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
import { rankItem } from "@tanstack/match-sorter-utils";

const columnHelper = createColumnHelper<User>();

const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
  return {
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging
    background: isDragging ? "gray" : "black",

    // styles we need to apply on draggables
    ...draggableStyle,
  };
};

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

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
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      columnVisibility: {
        selection: true,
        expander: true,
        id: true,
        avatar: true,
        name: true,
        email: true,
        birthDate: true,
        registeredAt: true,
      },
      columnOrder: columnIds,
      globalFilter: "",
    },
    // Controlled tutorial
    state: {},
  });

  const columnVisibilityCheckboxState = Object.entries(
    table.getState().columnVisibility
  )
    .filter(([key, value]) => value)
    .map(([key]) => key);

  const showTable = Object.values(table.getState().columnVisibility).filter(
    (isVisible) => isVisible
  ).length;

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
                  <Checkbox value="selection">Selection</Checkbox>
                  <Checkbox value="expander">Expander</Checkbox>
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
        <Input onChange={(e) => table.setGlobalFilter(e.target.value)} />
      </Box>

      <Flex grow={1} overflow="auto" pb={4} mt={4}>
        {!!showTable && (
          <table style={{ overflow: "auto" }}>
            <DragDropContext
              onDragEnd={({ destination, source }) => {
                if (!destination) {
                  return;
                }

                const items = reorder(
                  table.getState().columnOrder,
                  source.index,
                  destination.index
                );

                table.setColumnOrder(items);
              }}
            >
              <thead style={{ position: "sticky", top: 0 }}>
                {table.getHeaderGroups().map((headerGroup, index) => (
                  <Droppable
                    droppableId="header"
                    direction="horizontal"
                    type="column"
                  >
                    {/*@ts-ignore */}
                    {(provided) => (
                      <tr
                        key={headerGroup.id}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        // style={{ display: "flex" }}
                      >
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
                                      className="menu"
                                      size="xs"
                                      colorScheme={"whiteAlpha"}
                                      // variant={"outline"}
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
                                      {header.column.getIsPinned() !==
                                        "left" && (
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
                                          onClick={() =>
                                            header.column.pin(false)
                                          }
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
                        {provided.placeholder}
                      </tr>
                    )}
                  </Droppable>
                ))}
              </thead>
            </DragDropContext>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <>
                  <tr
                    key={row.id}
                    style={{
                      width: "100%",
                      background: row.getIsSelected() ? "#161654" : "white",
                      color: row.getIsSelected() ? "white" : "black",
                    }}
                  >
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

                  {row.getIsExpanded() && (
                    <tr>
                      <td colSpan={row.getVisibleCells().length}>
                        <Flex height={150} gap={4} p={2}>
                          <Flex width={150}>
                            <img
                              src={row.original.avatar}
                              height="100%"
                              width="100%"
                            />
                          </Flex>
                          <Box
                            width="50%"
                            textAlign={"left"}
                            alignSelf="center"
                          >
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
                    </tr>
                  )}
                </>
              ))}
            </tbody>

            {false && (
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
            )}
          </table>
        )}
      </Flex>

      <Box mt={4}>
        <Flex gap={2}>
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
