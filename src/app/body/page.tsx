import MainLayout from "@/components/layouts/MainLayout";
import BodyPartGrid from "@/components/body/BodyPartGrid";

export default function BodyPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-bold mb-2">Choose Your Body</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Select a part of the body to begin your reflection. Each part holds stories, memories, and feelings. What does yours have to say?
          </p>
        </div>
        <BodyPartGrid />
      </div>
    </MainLayout>
  );
}
