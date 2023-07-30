import * as React from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "./index.css";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  progress: number;
  visits: number;
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    progress: 50,
    visits: 10,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    progress: 80,
    visits: 18,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    progress: 10,
    visits: 20,
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.display({
    id: "select-person",
    cell: () => <input type="checkbox" />,
  }),
  columnHelper.group({
    id: "name",
    header: "Name",
    columns: [
      columnHelper.accessor((person) => person.firstName, {
        header: "First Name",
        cell: (info) => <p style={{ color: "blue" }}>{info.renderValue()}</p>,
      }),
      columnHelper.accessor((person) => person.lastName, {
        header: "Last Name",
      }),
    ],
  }),
  columnHelper.group({
    id: "meta",
    header: "Meta",
    columns: [
      columnHelper.accessor((person) => person.age, {
        header: "Age",
      }),
      columnHelper.accessor("visits", {
        header: "Visits",
        footer: ({ table }) =>
          table
            .getFilteredRowModel()
            .rows.reduce(
              (total, row) => total + Number(row.getValue("visits")),
              0
            ),
      }),
      columnHelper.accessor((person) => person.progress, {
        header: "Progress",
        cell: (info) => <progress value={info.getValue()} max="100" />,
      }),
    ],
  }),
];

export default function BasicTable() {
  const table = useReactTable({
    data: defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup, index) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
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
    </div>
  );
}
