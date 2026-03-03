import React from "react";

export interface DataTableProps {
  columns: string[];
  data: Record<string, unknown>[];
  /** Optional search bar above the table (same styling as users management) */
  search?: {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
  };
  /** Optional content on the right of the search row (e.g. Create button) */
  toolbarRight?: React.ReactNode;
}

const NO_COLUMN_WIDTH = "3.5rem"; // narrow width for No. column, with a little space after

export const DataTable = ({
  columns,
  data,
  search,
  toolbarRight,
}: DataTableProps) => {
  const gridStyle =
    columns.length > 1
      ? {
          gridTemplateColumns: `${NO_COLUMN_WIDTH} repeat(${columns.length - 1}, minmax(0, 1fr))`,
        }
      : { gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` };

  return (
    <div className="w-full space-y-4">
      {search && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full min-w-[180px] max-w-xs group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-slate-400 group-focus-within:text-[#1692b3] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder={search.placeholder}
              value={search.value}
              onChange={(e) => search.onChange(e.target.value)}
              className="w-full bg-white border border-slate-100 rounded-lg py-2 pl-10 pr-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1692b3]/10 transition-all h-[40px]"
            />
          </div>
          {toolbarRight}
        </div>
      )}

      {/* Header */}
      <div className="bg-[#1692b3] rounded-lg overflow-hidden shadow-sm mb-4">
        <div className="grid px-8 py-5" style={gridStyle}>
          {columns.map((col, idx) => (
            <div
              key={idx}
              className={`text-white font-bold text-sm tracking-wide ${idx === 0 ? "pr-3" : ""}`}
            >
              {col}
            </div>
          ))}
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-3">
        {data.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={`rounded-lg px-6 py-3 shadow-sm border border-slate-100 flex items-center hover:shadow-md transition-all duration-300 group ${
              rowIdx % 2 === 1 ? "bg-slate-100" : "bg-white"
            }`}
          >
            <div className="grid w-full items-center px-2" style={gridStyle}>
              {Object.values(row).map((val: unknown, colIdx) => (
                <div
                  key={colIdx}
                  className={`text-sm font-medium text-slate-600 ${colIdx === 0 ? "pr-3" : ""} ${colIdx === Object.values(row).length - 1 ? "cursor-pointer" : ""}`}
                >
                  {val !== null && val !== undefined ? String(val) : "—"}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
