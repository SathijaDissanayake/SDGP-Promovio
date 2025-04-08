import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuLogOut,
  LuSquareUserRound,
  LuCalendarClock,
} from "react-icons/lu";


export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "07",
    label: "CRM",
    icon: LuSquareUserRound,
    path: "/crm",
  },
  {
    id: "03",
    label: "Expense",
    icon: LuHandCoins,
    path: "/expense",
  },
  {
    id: "08",
    label: "Schedule",
    icon: LuCalendarClock,
    path: "/schedule",
  },
  {
    id: "06",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },
];
