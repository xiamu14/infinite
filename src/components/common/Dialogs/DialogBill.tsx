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
import { useState } from "react";
import { mutate } from "swr";
import { createBill } from "../../../actions/bill";
import { apisRoute } from "../../../utils/constant";
import AccountSelect from "../../project/AccountSelect";
import TagSelect from "../../project/TagSelect";
import PopoverDate from "../Popover/PopoverDate";

export default function DialogBill() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size={"sm"}>
          记一笔
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          action={async (formData) => {
            if (
              !formData.get("money") ||
              !formData.get("accountId") ||
              !formData.get("tagId") ||
              !formData.get("date")
            )
              return;
            createBill(formData);
            setOpen(false);
            mutate(apisRoute.GetBills);
          }}
        >
          <DialogHeader>
            <DialogTitle>账单明细</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                金额
              </Label>
              <Input name="money" defaultValue="" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                分类
              </Label>
              <div className="col-span-3">
                <TagSelect />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                账户
              </Label>
              <div className="col-span-3">
                <AccountSelect />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                日期
              </Label>
              <div className="col-span-3">
                <PopoverDate />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">保存</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
