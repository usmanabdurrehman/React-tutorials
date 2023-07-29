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
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.display({
    id: "select-person",
    cell: () => <input type="checkbox" />,
    header: "Lmao",
    footer: "xd",
  }),
  columnHelper.group({
    id: "name",
    header: "Name",
    columns: [
      columnHelper.accessor("firstName", {
        cell: (info) => info.getValue(),
        header: "First Name",
      }),
      columnHelper.accessor("lastName", {
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Last Name</span>,
      }),
    ],
  }),
  columnHelper.group({
    id: "meta",
    header: "Meta",
    columns: [
      columnHelper.accessor("age", {
        header: () => "Age",
        cell: (info) => {
          console.log({ info });
          return info.renderValue();
        },
      }),
      columnHelper.accessor("visits", {
        header: () => <span>Visits</span>,
        footer: ({ column }) => {
          // console.log({
          //   getAllColumns: column.getAggregationFn()?.(
          //     "visits",
          //     column.getLeafColumns(),
          //     "sum"
          //   ),
          // });
          return <p>s</p>;
        },
      }),
      columnHelper.accessor("status", {
        header: "Status",
      }),
      columnHelper.accessor("progress", {
        header: "Profile Progress",
        cell: (info) => <progress value={info.getValue()} max="100" />,
      }),
    ],
  }),
];

export default function BasicTable() {
  const [data, setData] = React.useState(() => [...defaultData]);

  const table = useReactTable({
    data,
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
