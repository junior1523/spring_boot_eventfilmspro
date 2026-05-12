import { useEffect, useState } from "react";

export function useTema() {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem("theme") ?? "sistema";

  });

  useEffect(() => {
    const html = document.documentElement;

    if (tema === "dark") {
      html.classList.add("dark");
      localStorage.theme = "dark";
    } else if (tema === "light") {
      html.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      localStorage.removeItem("theme");
      const prefiereDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      html.classList.toggle("dark", prefiereDark);
    }
  }, [tema]);

  return { tema, setTema };
}