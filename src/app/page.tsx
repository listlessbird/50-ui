import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex pt-[12rem] px-4">
      <div className="space-y-3 max-w-7xl">
        <div>
          <h1 className="text-3xl lg:text-5xl font-bold">
            50 Days Of Interactive UI
          </h1>
          <p className="pt-2 text-lg">
            This is a project to create 50 interactive UI components in 50 days.
            <br />
            I'll make 50 cool ui within next 50 days.
          </p>
        </div>
        <Button>Get Started</Button>
      </div>
    </main>
  );
}
