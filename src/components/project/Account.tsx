import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Account as AccountType } from "@prisma/client";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import { apisRoute } from "../../utils/constant";
import DialogAccount from "../common/Dialogs/DialogAccount";
import { Button } from "../ui/button";
export default function Account() {
  const { data, error, isLoading } = useSWR(
    apisRoute.GetAccounts,
    fetcher<AccountType[]>
  );

  return (
    <div className="w-[42vw] max-w-[1000px] min-w-[700px] flex flex-col items-start justify-start gap-4">
      <div className="w-full flex flex-row items-center justify-start gap-2">
        <DialogAccount />
      </div>
      <div className="w-full flex flex-row justify-start gap-4">
        {data?.data.map((item) => {
          return (
            <Card className="w-[250px]" key={item.id}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-1">
                <p>{`余额：${item.balance}`}</p>
                <p>消费记录 4 笔。</p>
                <p className="text-sm text-muted-foreground mt-2">{`${item.note}`}</p>
              </CardContent>
              <CardFooter>
                <Button variant={"destructive"} size={"sm"}>
                  删除
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
