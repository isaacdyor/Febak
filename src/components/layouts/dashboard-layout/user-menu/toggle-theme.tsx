import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      onClick={toggleTheme}
      className="flex gap-2 rounded-md px-2 py-1 hover:cursor-pointer hover:bg-muted"
    >
      <Sun className="h-5 w-5 text-muted-foreground dark:hidden" />
      <Moon className="hidden h-5 w-5 text-muted-foreground dark:block" />

      <p className="text-sm text-muted-foreground">Toggle Theme</p>
    </div>
  );
};
