import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Account, Bill as BillType, Tag } from "@prisma/client";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import { useSnapshot } from "valtio";
import { delBill } from "../../actions/bill";
import fetcher from "../../lib/fetcher";
import { selectDateStore } from "../../store/common";
import { apisRoute, dateFormatYm } from "../../utils/constant";
import DialogBill from "../common/Dialogs/DialogBill";
import { Button } from "../ui/button";

export type Payment = {
  id: number;
  money: number;
  tagName: string;
  date: string;
  accountName: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "date",
    header: "日期",
    cell: ({ row }) => (
      <div className="capitalize">
        {dayjs(row.getValue("date")).format("YYYY/MM/DD")}
      </div>
    ),
  },
  {
    accessorKey: "money",
    header: "金额",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("money"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("zh-CN", {
        style: "currency",
        currency: "CNY",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "tagName",
    header: "分类",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("tagName")}</div>
    ),
  },
  {
    accessorKey: "accountName",
    header: "账户",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("accountName")}</div>
    ),
  },
  {
    accessorKey: "actions",
    header: "操作",
    cell: ({ row }) => (
      <div>
        <form
          action={async (formData) => {
            await delBill(formData);
            mutate(apisRoute.GetBills);
          }}
        >
          <input name="id" value={row.getValue("id")} className="hidden" />
          <Button variant={"destructive"} size={"sm"}>
            删除
          </Button>
        </form>
      </div>
    ),
  },
];

export default function BillList() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const selectDateSnap = useSnapshot(selectDateStore);
  const searchParams = useMemo(() => {
    if (!selectDateSnap.date) return "";
    const search = new URLSearchParams();
    search.append("month", format(selectDateSnap.date, dateFormatYm));
    return search.toString();
  }, [selectDateSnap.date]);
  const { data, error, isLoading } = useSWR(
    searchParams ? apisRoute.GetBills + `?${searchParams}` : apisRoute.GetBills,
    fetcher<(BillType & { account: Account; tag: Tag })[]>
  );

  const bills = useMemo(() => {
    if (data?.data) {
      return data.data.map((item) => {
        return {
          id: item.id,
          money: item.money,
          date: item.date,
          accountName: item.account.title,
          tagName: item.tag.title,
        };
      }) as unknown as Payment[];
    }
    return [] as Payment[];
  }, [data]);
  const total = useMemo(() => {
    let money = 0;
    if (data?.data) {
      data.data.map((it) => (money += it.money));
    }
    return money;
  }, [data]);
  const table = useReactTable({
    data: bills,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-[42vw] max-w-[1000px] min-w-[700px] flex flex-col items-start justify-start gap-4">
      <div className="flex justify-start items-center gap-2">
        <p>消费总额：￥{total}</p>
        <DialogBill />
      </div>
      <div className="w-full">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {bills.length > 0 && table.getRowModel()?.rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (bills.length > 0) {
                  table?.nextPage();
                }
              }}
              disabled={bills.length > 0 && table?.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
