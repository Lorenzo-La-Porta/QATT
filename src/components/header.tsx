import Link from 'next/link';
import { User } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-auto">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-2xl font-headline font-bold text-foreground">QATT</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="User Profile">
            <User className="h-5 w-5" />
          </Button>
        </nav>
      </div>
    </header>
  );
}
