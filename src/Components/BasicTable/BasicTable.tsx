import { useState } from "react";

import {
  ColumnOrderState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import "./index.css";
import { User } from "../../types";
import { USERS } from "../../data";
import moment from "moment";

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.display({
    id: "display",
  }),
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
    size: 400,
  }),
  columnHelper.accessor("registeredAt", {
    cell: (info) => moment(info.getValue()).format("MM/DD/YYYY"),
  }),
];

export default function BasicTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([
    "avatar",
    "name",
    "email",
    "birthDate",
    "registeredAt",
  ]);

  const { pageIndex, pageSize } = pagination;

  const table = useReactTable({
    data: USERS,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnOrderChange: setColumnOrder,
    state: {
      columnPinning: { left: ["firstName"], right: ["visits"] },
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

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup, index) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                console.log({ header: header.isPlaceholder });
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize(), position: "relative" }}
                  >
                    <button
                      style={{ position: "absolute", left: 0 }}
                      onClick={() => {
                        const columnOrderArr = [...columnOrder];
                        [columnOrderArr[index], columnOrderArr[index - 1]] = [
                          columnOrderArr[index - 1],
                          columnOrderArr[index],
                        ];
                        table.setColumnOrder(columnOrderArr);
                      }}
                    >
                      {"<"}
                    </button>
                    <button
                      style={{ position: "absolute", right: 0 }}
                      onClick={() => {
                        const columnOrderArr = [...columnOrder];
                        [columnOrderArr[index + 1], columnOrderArr[index]] = [
                          columnOrderArr[index],
                          columnOrderArr[index + 1],
                        ];
                        table.setColumnOrder(columnOrderArr);
                      }}
                    >
                      {">"}
                    </button>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                // console.log({ cell });
                return (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
      <div>
        <button onClick={() => table.setPageIndex(pageIndex - 1)}>{"<"}</button>
        <button onClick={() => table.setPageIndex(pageIndex + 1)}>{">"}</button>
      </div>
    </div>
  );
}
