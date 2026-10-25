export interface Sheet {
  n: string;
  name: string;
  path: string;
}

export const sheets: Sheet[] = [
  { n: "01", name: "COVER",   path: "/"         },
  { n: "02", name: "ABOUT",   path: "/about"    },
  { n: "03", name: "SYSTEMS", path: "/systems"  },
  { n: "04", name: "LAB",     path: "/lab"      },
  { n: "05", name: "WORK",    path: "/projects" },
  { n: "06", name: "CONTACT", path: "/contact"  },
];

export function isSheetActive(pathname: string, sheetPath: string): boolean {
  if (sheetPath === "/") return pathname === "/";
  if (sheetPath === "/lab") return pathname.startsWith("/lab") || pathname.startsWith("/notes");
  return pathname.startsWith(sheetPath);
}
