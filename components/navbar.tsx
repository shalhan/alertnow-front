import { Button } from '@/components/ui/button';
import { Logo } from './ui/logo';
import Link from "next/link"

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-lg font-bold">AlertNow</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </a>
            <a href="#use-cases" className="text-sm font-medium hover:text-primary">
              Use Cases
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </a>
            <a href="/documentations" className="text-sm font-medium hover:text-primary">
              Documentation
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 dark:text-slate-300">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
  );
};

export default Navbar;