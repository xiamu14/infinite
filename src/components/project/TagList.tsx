"use client";
import { Tag } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { delTag } from "../../actions/tag";
import fetcher from "../../lib/fetcher";
import { apisRoute } from "../../utils/constant";
import DialogTag from "../common/Dialogs/DialogTag";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function TagList() {
  const [selected, setSelected] = useState<number>();
  const [tags, setTags] = useState<Tag[]>([]);
  const getStatus = useCallback(
    (value: number) => {
      if (selected === value) {
        return {};
      }
      return { variant: "outline" as "outline" };
    },
    [selected]
  );

  const { data, error, isLoading } = useSWR(apisRoute.GetTags, fetcher<Tag[]>);

  useEffect(() => {
    if (!isLoading && !error && data) {
      setTags(data.data);
      if (data.data.length > 0) {
        setSelected(data.data[0].id);
      }
    }
  }, [data, error, isLoading]);

  return (
    <div className="w-[42vw] max-w-[1000px] min-w-[700px] flex flex-col items-start justify-start gap-4">
      <div className="w-full flex flex-row items-center justify-start gap-2">
        <DialogTag />
        <form
          action={async (formData) => {
            if (!formData.get("id")) return;
            await delTag(formData);
            mutate(apisRoute.GetTags);
          }}
        >
          <input name="id" value={selected ?? ""} className="hidden" readOnly />
          <Button variant={"destructive"} size={"sm"} type="submit">
            删除
          </Button>
        </form>
      </div>

      <div className="w-full flex flex-row items-center justify-start gap-4">
        {tags.map((item) => {
          return (
            <Badge
              key={item.id}
              {...getStatus(item.id)}
              onClick={() => setSelected(item.id)}
            >
              {item.title}
            </Badge>
          );
        })}
      </div>
      {/* <div className="w-full border rounded-lg p-6">
        <p>月预算 ￥ xxx</p>
        <p>月余额 ￥ xxx</p>
        <p>月消费 ￥ xxx</p>
        <Separator className="my-4" />
        <p>今日消费 ￥ xxx</p>
      </div> */}
    </div>
  );
}
