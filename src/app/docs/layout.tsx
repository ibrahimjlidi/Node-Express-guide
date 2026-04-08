import { DocLayout } from "@/components";
import { navigationItems } from "@/data/navigation";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocLayout navItems={navigationItems}>
      {children}
    </DocLayout>
  );
}
