import { Button } from "../ui/button";
import { CardDescription, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function Plan() {
  return (
    <div className="w-full flex flex-col gap-4 border rounded-lg p-6">
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-col gap-2 my-2">
          <CardTitle>2024,4月 预算</CardTitle>
          <CardDescription>总预算 8,900。 剩余 2,000</CardDescription>
        </div>
        <div className="flex flex-row gap-2">
          <Button variant={"outline"} size={"sm"}>
            新建
          </Button>
          <Button size={"sm"}>保存</Button>
        </div>
      </div>
      <div className="w-full flex flex-row justify-start items-center gap-4">
        <Label>三餐</Label>
        <Input
          value={2100}
          placeholder="一日三餐"
          className="w-[200px]"
        ></Input>
        <p className="text-sm text-muted-foreground">已消费 1200，剩余 900</p>
      </div>
      <div className="w-full flex flex-row justify-start items-center gap-4">
        <Label>交通</Label>
        <Input value={400} placeholder="一日三餐" className="w-[200px]"></Input>
        <p className="text-sm text-muted-foreground">已消费 200，剩余 200</p>
      </div>
    </div>
  );
}
