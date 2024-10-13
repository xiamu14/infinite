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
import { createPlan } from "../../../actions/plan";
import { apisRoute } from "../../../utils/constant";
import TagSelect from "../../project/TagSelect";

export default function DialogPlan() {
  const [open, setOpen] = useState(false);

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
            if (!formData.get("money") || !formData.get("tagId")) return;
            await createPlan(formData);
            setOpen(false);
            mutate(apisRoute.GetPlans);
          }}
        >
          <DialogHeader>
            <DialogTitle>预算</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accountId" className="text-right">
                类目
              </Label>
              <div className="col-span-3">
                <TagSelect />
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
          </div>
          <DialogFooter>
            <Button type="submit">保存</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
