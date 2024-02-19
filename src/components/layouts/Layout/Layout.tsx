import { Header } from "@/components/ui";

export interface LayoutProps {
  children: React.ReactNode;
  colorScheme?: "light" | "dark";
}

export default function Layout({
  children,
  colorScheme = "light",
}: LayoutProps) {
  return (
    <div>
      <Header colorScheme={colorScheme} />
      <main>{children}</main>
    </div>
  );
}
