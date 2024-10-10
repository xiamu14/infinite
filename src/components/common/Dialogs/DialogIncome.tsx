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
import { createIncome } from "../../../actions/income";
import AccountSelect from "../../project/AccountSelect";
import { Textarea } from "../../ui/textarea";

export default function DialogIncome() {
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
            if (!formData.get("money") || !formData.get("accountId")) return;
            createIncome(formData);
            setOpen(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>收入明细</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accountId" className="text-right">
                账户
              </Label>
              <div className="col-span-3">
                <AccountSelect />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                金额
              </Label>
              <Input
                name="money"
                type="number"
                defaultValue=""
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="balance" className="text-right">
                备注
              </Label>
              <Textarea name="note" defaultValue="" className="col-span-3" />
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
