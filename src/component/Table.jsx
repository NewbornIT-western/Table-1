import { useState, useEffect } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import CallAPI from "./CallAPI";
import CallAPIbyTQ from "./CallAPIbyTQ";

function Table() {
  const { data, isPending, isError, error, refetch } = CallAPIbyTQ();

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      header: () => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() =>
            table.setSorting((old) => {
              if (!old.length) return [{ id: "id", desc: false }];
              const isDesc = old[0].desc;
              return [{ id: "id", desc: !isDesc }];
            })
          }
        >
          ID ⬍
        </span>
      ),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("name", {
      header: () => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() =>
            table.setSorting((old) => {
              if (!old.length) return [{ id: "name", desc: false }];
              const isDesc = old[0].desc;
              return [{ id: "name", desc: !isDesc }];
            })
          }
        >
          Name ⬍
        </span>
      ),
      cell: (info) => info.getValue(),
      sortingFn: "alphanumeric",
    }),

    columnHelper.accessor("data", {
      header: () => <span>Data</span>,
      cell: (info) => {
        const value = info.getValue();
        if (value !== null) {
          return Object.entries(value).map(([k, v]) => (
            <div key={k}>
              <b>{k}:</b> <span>{v}</span>
            </div>
          ));
        }
        return null;
      },
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });

  if (isPending) {
    return (
      <div className="table-container">
        <h2>Tech Goods Data</h2>
        <div
          style={{
            textAlign: "center",
            padding: "60px",
            fontSize: "1.2rem",
            color: "#667eea",
          }}
        >
          ⏳ Loading data...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="table-container">
        <h2>Tech Goods Data</h2>
        <div style={{ textAlign: "center", padding: "60px" }}>
          <div style={{ fontSize: "1.2rem", color: "red" }}>
            Error 
          </div>
          <div style={{ marginTop: "10px", fontSize: "0.9rem", color: "#666" }}>
            {error?.message || "Something went wrong"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <h2>Tech Goods Data</h2>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
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
      </table>

      <div className="pagination">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          ⬅ Prev
        </button>
        <button onClick={() => refetch()}>
          Refetch
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

export default Table;
