import {
  HomePage,
  AboutPage,
  LoginPage,
  AdminAccount,
  AdminAddAccount,
} from "../pages";

const router = [
  {
    path: "/",
    element: HomePage,
  },
  {
    path: "/about",
    element: AboutPage,
  },
  {
    path: "/login",
    element: LoginPage,
    layout: "None",
  },
  {
    path: "/admin/user/accounts",
    element: AdminAccount,
  },
  {
    path: "/admin/user/accounts/create",
    element: AdminAddAccount,
  },
];

export default router;
