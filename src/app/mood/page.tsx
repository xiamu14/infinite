import Editor from "@/components/editor";
export default function Mood() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-[42vw] max-w-[780px] min-w-[640px] flex flex-col justify-center items-end gap-4">
        <Editor />
      </div>
    </main>
  );
}
