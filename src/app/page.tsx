import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className=" flex flex-col justify-center items-end gap-4">
        <Textarea className="w-[36vw]" placeholder="AI：Input instruction" rows={5} />
        <Button>Submit</Button>
      </div>
    </main>
  );
}
