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
  );
}
