"use client";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import PopoverMonth from "../components/common/Popover/PopoverMonth";
import Account from "../components/project/Account";
import BillList from "../components/project/BillList";
import Income from "../components/project/Income";
import Plan from "../components/project/Plan";
import TagList from "../components/project/TagList";
import { selectDateStore } from "../store/common";
export default function Home() {
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
          <PopoverMonth
            onMontChange={(value) => {
              selectDateStore.date = value;
            }}
          />
        </div>
        <div className="w-[42vw] max-w-[1000px] min-w-[700px] flex flex-row items-center justify-start gap-4">
          <Tabs defaultValue="bill" className="w-full">
            <TabsList>
              <TabsTrigger value="bill">账单</TabsTrigger>
              <TabsTrigger value="tag">分类</TabsTrigger>
              <TabsTrigger value="account">账户</TabsTrigger>
              <TabsTrigger value="income">收入</TabsTrigger>
              <TabsTrigger value="plan">预算</TabsTrigger>
              <TabsTrigger value="lend">借出</TabsTrigger>
              <TabsTrigger value="grant">贷款</TabsTrigger>
              <TabsTrigger value="statistic">统计</TabsTrigger>
            </TabsList>
            <TabsContent value="bill">
              <BillList />
            </TabsContent>
            <TabsContent value="tag">
              <TagList />
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
