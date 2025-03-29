import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#F6851B]/20 bg-background py-6 relative">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-[#F6851B]" />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MetaWill. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
