"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Account from "../components/project/Account";
import Income from "../components/project/Income";
import Plan from "../components/project/Plan";
export default function Home() {
  const [date, setDate] = useState<Date>();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-[42vw] max-w-[1000px] min-w-[700px] flex flex-col justify-center items-end gap-4">
        <Textarea
          className="w-full"
          placeholder="AI：Input instruction"
          rows={5}
        />
        <Button className="w-[98px]">执行</Button>
        <Separator className="my-4" />
        <div className="w-[42vw] max-w-[1000px] min-w-[700px] flex flex-row items-center justify-start gap-4">
          <Select>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Year</SelectLabel>
                {["2024", "2025", "2026", "2027"].map((item, key) => {
                  return (
                    <SelectItem
                      key={key}
                      value={key + ""}
                    >{`${item}`}</SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[90px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Month</SelectLabel>
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sept",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((item, key) => {
                  return (
                    <SelectItem
                      key={key}
                      value={key + ""}
                    >{`${item}`}</SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[200px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                defaultMonth={new Date(2012, 2)}
                disableNavigation
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-[42vw] max-w-[1000px] min-w-[700px] flex flex-row items-center justify-start gap-4">
          <Tabs defaultValue="bill" className="w-full">
            <TabsList>
              <TabsTrigger value="bill">账单</TabsTrigger>
              <TabsTrigger value="tag">分类</TabsTrigger>
              <TabsTrigger value="account">账户</TabsTrigger>
              <TabsTrigger value="income">收入</TabsTrigger>
              <TabsTrigger value="plan">预算</TabsTrigger>
            </TabsList>
            <TabsContent value="bill">
              <Button variant={"outline"} size={"sm"}>
                记一笔
              </Button>
            </TabsContent>
            <TabsContent value="tag">
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
                  <Badge variant={"outline"}>三餐</Badge>
                  <Badge variant={"outline"}>水果饮品</Badge>
                  <Badge variant={"outline"}>房租</Badge>
                  <Badge variant={"outline"}>房贷</Badge>
                  <Badge variant={"outline"}>日常消费</Badge>
                  <Badge>交通</Badge>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="account">
              <div>
                <Account />
              </div>
            </TabsContent>
            <TabsContent value="income">
              <div>
                <Income />
              </div>
            </TabsContent>
            <TabsContent value="plan">
              <Plan />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
