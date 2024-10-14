import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Account as AccountType } from "@prisma/client";
import { Pipe } from "d-pipe";
import { useMemo, useRef, useState } from "react";
import useSWR, { mutate } from "swr";
import { stopAccount } from "../../actions/account";
import fetcher from "../../lib/fetcher";
import { apisRoute } from "../../utils/constant";
import DialogAccount, {
  DialogAccountRef,
  EditAccount,
} from "../common/Dialogs/DialogAccount";
import { Button } from "../ui/button";
export default function Account() {
  const { data, error, isLoading } = useSWR(
    apisRoute.GetAccounts,
    fetcher<AccountType[]>
  );
  const total = useMemo(() => {
    let money = 0;
    if (data?.data) {
      data.data.forEach((it) => (money += it.balance));
    }
    return money;
  }, [data]);
  const [editAccount, setEditAccount] = useState<EditAccount>();
  const dialogAccountRef = useRef<DialogAccountRef>(null);
  return (
    <div className="w-[42vw] max-w-[1000px] min-w-[700px] flex flex-col items-start justify-start gap-4">
      <div className="w-full flex flex-row items-center justify-start gap-2">
        <DialogAccount
          data={editAccount}
          ref={dialogAccountRef}
          onSave={() => {
            setEditAccount(undefined);
          }}
        />
      </div>
      <p>总资产：￥{total.toLocaleString()}</p>
      <div className="w-full flex flex-row justify-start gap-4 flex-wrap">
        {data?.data.map((item) => {
          return (
            <Card className="w-[200px] flex flex-col" key={item.id}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-1">
                <p>{`余额：${item.balance.toLocaleString()}`}</p>
                <p></p>
                <p className="text-sm text-muted-foreground mt-2">{`${item.note}`}</p>
              </CardContent>
              <div className="flex-1"></div>
              <CardFooter>
                <div className="w-full flex justify-start gap-2">
                  <form
                    action={async () => {
                      await stopAccount(item.id);
                      mutate(apisRoute.GetAccounts);
                    }}
                  >
                    <Button variant={"destructive"} size={"sm"} type="submit">
                      停用
                    </Button>
                  </form>
                  <Button
                    size={"sm"}
                    onClick={() => {
                      const pipe = new Pipe(item);
                      pipe.pick(["id", "title", "balance", "note"]);
                      setEditAccount(pipe.data);
                      dialogAccountRef?.current?.open();
                    }}
                  >
                    更新
                  </Button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
