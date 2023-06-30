import React from "react";

import "./index.css";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { makeData, Person } from "./makeData";
import { useVirtual } from "react-virtual";

const data = makeData(100000);

export const TanstackTableVirtualized = () => {
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
      },
      {
        accessorKey: "firstName",
        header: "First Name",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        accessorKey: "age",
        header: "Age",
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
  });

  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

  const paddingTop = virtualRows?.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows?.length > 0 ? totalSize - (virtualRows?.at(-1)?.end || 0) : 0;

  return (
    <div className="p-2">
      <div ref={tableContainerRef} className="container">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: header.getSize() }}
                    >
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: paddingTop }} />
              </tr>
            )}
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<Person>;
              return (
                <tr key={row.id}>
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
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: paddingBottom }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
