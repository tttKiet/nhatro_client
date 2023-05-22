import {
  RootHomePage,
  AboutPage,
  LoginPage,
  RootAccount,
  RootAddAccount,
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
    path: "/root/user/accounts/create",
    element: RootAddAccount,
  },
  {
    path: "/root/user/account/edit/:id",
    element: RootEditAccount,
  },
];

export default router;
