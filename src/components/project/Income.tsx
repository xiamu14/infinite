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
import DialogIncome from "../common/Dialogs/DialogIncome";
const invoices = [
  {
    account: "平安银行卡",
    totalAmount: "25000",
    description: "工资",
  },
];
export default function Income() {
  return (
    <div className="w-[42vw] max-w-[1000px] min-w-[700px] flex flex-col items-start justify-start gap-4">
      <DialogIncome />
      <div className="w-full border rounded-lg p-6">
        <Table>
          <TableCaption>收入明细</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">账户</TableHead>
              <TableHead>金额</TableHead>
              <TableHead className="text-right">备注</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.account}>
                <TableCell className="font-medium">{invoice.account}</TableCell>
                <TableCell>{invoice.totalAmount}</TableCell>
                <TableCell className="text-right">
                  {invoice.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>总收入</TableCell>
              <TableCell className="text-right">25000</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
