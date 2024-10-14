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
import { forwardRef, useImperativeHandle, useState } from "react";
import { mutate } from "swr";
import { createAccount, updateAccount } from "../../../actions/account";
import { apisRoute } from "../../../utils/constant";
import { Textarea } from "../../ui/textarea";

export interface EditAccount {
  id: number;
  title: string;
  balance: number;
  note: string;
}

interface Props {
  data?: EditAccount;
  onSave?: () => void;
}

export interface DialogAccountRef {
  open: () => void;
  hide: () => void;
}

const DialogAccountComponent = forwardRef<DialogAccountRef, Props>(
  function DialogAccount(props, ref) {
    const [open, setOpen] = useState(false);
    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      hide: () => setOpen(false),
    }));
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size={"sm"}>
            新建
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form
            action={async (formData) => {
              if (!formData.get("title") || !formData.get("balance")) return;
              if (props.data != undefined) {
                await updateAccount(formData);
              } else {
                await createAccount(formData);
              }
              setOpen(false);
              mutate(apisRoute.GetAccounts);
              props.onSave?.();
            }}
          >
            <DialogHeader>
              <DialogTitle>新建</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <input
              name="id"
              value={props.data?.id ?? ""}
              className="hidden"
              readOnly
            />
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  账户名
                </Label>
                <Input
                  name="title"
                  defaultValue={props.data?.title}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="balance" className="text-right">
                  余额
                </Label>
                <Input
                  name="balance"
                  type="number"
                  defaultValue={props.data?.balance}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="balance" className="text-right">
                  备注
                </Label>
                <Textarea
                  name="note"
                  defaultValue={props.data?.note}
                  className="col-span-3"
                />
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
);
export default DialogAccountComponent;
