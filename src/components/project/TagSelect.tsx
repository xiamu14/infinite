"use client";

import { Tag as TagType } from "@prisma/client";
import { useState } from "react";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import { apisRoute } from "../../utils/constant";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
interface Props {
  onValueChange?: (value: string) => void;
}
export default function TagSelect(props: Props) {
  const { data, error, isLoading } = useSWR(
    apisRoute.GetTags,
    fetcher<TagType[]>
  );
  const [value, setValue] = useState("");
  return (
    <>
      <Input
        name="tagId"
        value={value}
        readOnly
        className="col-span-3 hidden"
      />
      <Select
        value={value}
        onValueChange={(value) => {
          setValue(value);
          props.onValueChange?.(value);
        }}
      >
        <SelectTrigger className="w-full" value={value}>
          <SelectValue placeholder="选择类目" />
        </SelectTrigger>
        <SelectContent>
          {data?.data.map((item) => {
            return (
              <SelectItem key={item.id} value={String(item.id)}>
                {item.title}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
}
