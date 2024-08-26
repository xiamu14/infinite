import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DialogBill() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"sm"}>
          记一笔
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>账单明细</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              金额
            </Label>
            <Input id="name" defaultValue="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              分类
            </Label>
            <Input id="username" defaultValue="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              账户
            </Label>
            <Input id="username" defaultValue="" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
