import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
export default function Account() {
  return (
    <div className="w-[42vw] max-w-[1000px] min-w-[700px] flex flex-col items-start justify-start gap-4">
      <div className="w-full flex flex-row items-center justify-start gap-2">
        <Button variant={"outline"} size={"sm"}>
          新建
        </Button>
      </div>
      <div className="w-full flex flex-row items-center justify-start gap-4">
        <Card className="w-[250px]">
          <CardHeader>
            <CardTitle>平安银行信用卡</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            本期账单 -1,000元，可用额度 5,000元。消费记录 4 笔
          </CardContent>
          <CardFooter>
            <Button>删除</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
