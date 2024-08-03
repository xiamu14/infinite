import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-[42vw] max-w-[1000px] min-w-[700px] flex flex-col justify-center items-end gap-4">
        <Textarea className="w-full" placeholder="AI：Input instruction" rows={5} />
        <Button className="w-[98px]">Action</Button>
      </div>
    </main>
  );
}
