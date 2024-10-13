import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Account, Income as IncomeType } from "@prisma/client";
import { useMemo } from "react";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import { apisRoute } from "../../utils/constant";
import DialogIncome from "../common/Dialogs/DialogIncome";
import { Button } from "../ui/button";

export default function Income() {
  const { data, error, isLoading } = useSWR(
    apisRoute.GetIncomes,
    fetcher<(IncomeType & { account: Account })[]>
  );
  const total = useMemo(() => {
    let money = 0;
    if (data?.data) {
      data.data.forEach((it) => (money += it.money));
    }
    return money;
  }, [data]);
  return (
    <div className="w-[42vw] max-w-[1000px] min-w-[700px] flex flex-col items-start justify-start gap-4">
      <DialogIncome />
      <div className="w-full border rounded-lg p-6">
        <Table>
          <TableCaption>收入明细</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">账户</TableHead>
              <TableHead className="text-center">金额</TableHead>
              <TableHead className="text-center">备注</TableHead>
              <TableHead className="text-center">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">
                  {invoice.account.title}
                </TableCell>
                <TableCell className="text-center">￥{invoice.money}</TableCell>
                <TableCell className="text-center">{invoice.note}</TableCell>
                <TableCell className="text-center">
                  <Button variant={"destructive"} size={"sm"} type="submit">
                    删除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>总收入</TableCell>
              <TableCell className="text-center">￥{total}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
