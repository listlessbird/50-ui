import { CommentSection } from "@/app/nested-comments-recursive/comment";

export default function Page() {
  return (
    <main className="grid place-items-center place-content-center min-h-screen">
      <CommentSection />
    </main>
  );
}
