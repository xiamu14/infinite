import { Plan as PlanType, Tag } from "@prisma/client";
import { format } from "date-fns";
import { useMemo } from "react";
import useSWR from "swr";
import { useSnapshot } from "valtio";
import fetcher from "../../lib/fetcher";
import { selectDateStore } from "../../store/common";
import { apisRoute, dateLocalFormatYm } from "../../utils/constant";
import DialogPlan from "../common/Dialogs/DialogPlan";
import { CardDescription, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
export default function Plan() {
  const { data, error, isLoading } = useSWR(
    apisRoute.GetPlans,
    fetcher<(PlanType & { tag: Tag })[]>
  );
  const total = useMemo(() => {
    let money = 0;
    if (data?.data) {
      data.data.forEach((it) => (money += it.money));
    }
    return money;
  }, [data]);
  const selectDateSnap = useSnapshot(selectDateStore);

  return (
    <div className="w-full flex flex-col gap-4 border rounded-lg p-6">
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-col gap-2 my-2">
          <CardTitle>
            {format(selectDateSnap.date!, dateLocalFormatYm)} 预算
          </CardTitle>
          <CardDescription>总预算 ￥{total}</CardDescription>
        </div>
        <div className="flex flex-row gap-2">
          <DialogPlan />
        </div>
      </div>
      {data?.data.map((item) => {
        return (
          <div
            key={item.id}
            className="w-full flex flex-row justify-start items-center gap-4"
          >
            <Label>{item.tag.title}</Label>
            <p>{item.money}</p>
            <p className="text-sm text-muted-foreground">已消费 - 剩余 -</p>
          </div>
        );
      })}
    </div>
  );
}
