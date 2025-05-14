import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import NavLink from "./nav-link";

export default function Header() {
  const isLoggedIn = false;
  return (
    <nav className="container mx-auto flex items-center justify-between px-2 py-4 lg:px-8">
      <div className="flex lg:flex-1">
        <NavLink href="/" className="flex shrink-0 items-center gap-1 lg:gap-2">
          <FileText className="h-5 w-5 transform text-gray-900 transition duration-200 ease-in-out hover:rotate-12 lg:h-8 lg:w-8" />
          <span className="font-extrabold text-gray-900 lg:text-xl">
            ConsiceAI
          </span>
        </NavLink>
      </div>

      <div className="flex gap-4 lg:items-center lg:justify-center lg:gap-12">
        <NavLink href="/#pricing">Pricing</NavLink>
        {isLoggedIn && <NavLink href="/dashboard">Your Summaries</NavLink>}
      </div>

      <div className="flex justify-end lg:flex-1">
        {isLoggedIn ? (
          <div className="flex items-center gap-2">
            <NavLink href="/upload">Upload a PDF</NavLink>
            <div>Pro</div>
            <Button>User</Button>
          </div>
        ) : (
          <div>
            <NavLink href="/sign-in">Sign In</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
