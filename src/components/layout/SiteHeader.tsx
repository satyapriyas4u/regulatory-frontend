import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function SiteHeader() {
  return (
    <header className="border-b bg-background text-foreground">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold text-blue-600">Regulatory AI</h1>
        <div className="hidden md:flex gap-6 items-center text-sm">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/playground" className="hover:underline">
            Playground
          </Link>
          <Button variant="outline" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
