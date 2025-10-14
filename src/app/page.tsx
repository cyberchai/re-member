import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Archive, Map } from 'lucide-react';

const BodyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-body"><path d="M11 2a3 3 0 1 1-3 3 3 3 0 0 1 3-3"/><path d="M4 8h16l-3 7H7Z"/><path d="M12 15v7"/><path d="m9 22 3-3 3 3"/><path d="m7 15-2 7h14l-2-7"/></svg>
)

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/50 p-8">
      <div className="text-center">
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-4">
          Re-membering (MS)
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12">
          A platform to map your embodied memories and narratives.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" variant="default" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Link href="/body">
              <BodyIcon />
              Body
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-background/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Link href="/map">
              <Map className="mr-2 h-5 w-5" />
              Map
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-background/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Link href="/archive">
              <Archive className="mr-2 h-5 w-5" />
              Archive
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
