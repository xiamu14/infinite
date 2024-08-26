"use client";
import { useCallback, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function TagList() {
  const [selected, setSelected] = useState("tag1");
  const getStatus = useCallback(
    (value: string) => {
      if (selected === value) {
        return {};
      }
      return { variant: "outline" as "outline" };
    },
    [selected]
  );
  return (
    <div className="w-[42vw] max-w-[1000px] min-w-[700px] flex flex-col items-start justify-start gap-4">
      <div className="w-full flex flex-row items-center justify-start gap-2">
        <Button variant={"outline"} size={"sm"}>
          新建
        </Button>
        <Button variant={"destructive"} size={"sm"}>
          删除
        </Button>
      </div>

      <div className="w-full flex flex-row items-center justify-start gap-4">
        <Badge {...getStatus("tag1")} onClick={() => setSelected("tag1")}>
          三餐
        </Badge>
        <Badge {...getStatus("tag2")} onClick={() => setSelected("tag2")}>
          水果饮品
        </Badge>
        <Badge {...getStatus("tag3")} onClick={() => setSelected("tag3")}>
          房租
        </Badge>
        <Badge {...getStatus("tag4")} onClick={() => setSelected("tag4")}>
          房贷
        </Badge>
        <Badge {...getStatus("tag5")} onClick={() => setSelected("tag5")}>
          日常消费
        </Badge>
        <Badge {...getStatus("tag6")} onClick={() => setSelected("tag6")}>
          交通
        </Badge>
      </div>
      <div className="w-full border rounded-lg p-6">
        <p>月预算 ￥ xxx</p>
        <p>月余额 ￥ xxx</p>
        <p>月消费 ￥ xxx</p>
        <Separator className="my-4" />
        <p>今日消费 ￥ xxx</p>
      </div>
    </div>
  );
}
