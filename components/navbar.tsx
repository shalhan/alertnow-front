import { Button } from '@/components/ui/button';
import { Logo } from './ui/logo';
import Link from "next/link"

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
    <div className="container flex h-16 items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <Logo />
        <span className="text-xl font-bold">AlertNow</span>
      </div>
      <nav className="hidden md:flex gap-6">
        <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
          Features
        </Link>
        <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
          How It Works
        </Link>
        <Link href="#who-is-this-for" className="text-sm font-medium hover:underline underline-offset-4">
          Who Is This For
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
          Login
        </Link>
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  </header>
  );
};

export default Navbar;