"use client";

import { Account as AccountType } from "@prisma/client";
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

export default function AccountSelect() {
  const { data, error, isLoading } = useSWR(
    apisRoute.GetAccounts,
    fetcher<AccountType[]>
  );
  const [value, setValue] = useState("");
  return (
    <>
      <Input
        name="accountId"
        defaultValue=""
        value={value}
        className="col-span-3 hidden"
        readOnly
      />
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-full" value={value}>
          <SelectValue placeholder="选择账户" />
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
