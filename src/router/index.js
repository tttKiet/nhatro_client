import {
  HomePage,
  AboutPage,
  LoginPage,
  RootAccount,
  RootAddAccount,
  RootEditAccount,
} from "../pages";

import { DefaultLayout, RootLayout } from "../components/Layouts";

const router = [
  {
    path: "/",
    isProtected: true,
    layout: "None",
    element: HomePage,
  },
  {
    path: "/about",
    isProtected: true,
    element: AboutPage,
    layout: DefaultLayout,
  },
  {
    path: "/login",
    element: LoginPage,
    isProtected: false,
    layout: "None",
  },
  {
    path: "/root/user/accounts",
    element: RootAccount,
    layout: RootLayout,
    isProtected: true,
  },
  {
    path: "/root/user/accounts/create",
    isProtected: true,
    layout: RootLayout,
    element: RootAddAccount,
  },
  {
    path: "/root/user/account/edit/:id",
    layout: RootLayout,
    element: RootEditAccount,
    isProtected: true,
  },
];

export default router;
