import MainLayout from "@/components/layouts/MainLayout";
import { Archive } from "lucide-react";

export default function ArchivePage() {
  return (
    <MainLayout>
      <div className="container mx-auto flex h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
        <Archive className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="font-headline text-4xl font-bold mb-2">Archive</h1>
        <p className="text-xl text-muted-foreground">This section is coming soon.</p>
      </div>
    </MainLayout>
  );
}
