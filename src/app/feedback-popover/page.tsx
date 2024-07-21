import { FeedbackPopover } from "@/app/feedback-popover/feedback";

export default function Page() {
  return (
    <main className="grid min-h-screen place-items-center">
      <div className="container flex items-center justify-center">
        <FeedbackPopover />
      </div>
    </main>
  );
}
