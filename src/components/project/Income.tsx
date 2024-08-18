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
const invoices = [
  {
    account: "平安银行卡",
    paymentStatus: "Paid",
    totalAmount: "25000",
    description: "工资",
  },
];
export default function Income() {
  return (
    <div className="border rounded-lg p-6">
      <Table>
        <TableCaption>收入明细</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">账户</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>金额</TableHead>
            <TableHead className="text-right">备注</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.account}>
              <TableCell className="font-medium">{invoice.account}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
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
  );
}
