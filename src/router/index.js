import {
  RootHomePage,
  AboutPage,
  LoginPage,
  RootAccount,
  AdminAddAccount,
  RootEditAccount,
} from "../pages";

const router = [
  {
    path: "/",
    element: RootHomePage,
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
    path: "/root/user/accounts",
    element: RootAccount,
  },
  {
    path: "/admin/user/accounts/create",
    element: AdminAddAccount,
  },
  {
    path: "/root/user/account/edit/:id",
    element: RootEditAccount,
  },
];

export default router;
