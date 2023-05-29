import {
  HomePage,
  AboutPage,
  LoginPage,
  RootAccount,
  RootAddAccount,
  RootEditAccount,
  AdminProfilePage,
  RegisterPage,
  RootViewAccountPermissions,
  AdminAllMembersPage,
  AdminAllRoomsPage,
  PostPage,
  ErrorPage,
} from "../pages";

import { DefaultLayout, RootLayout, AdminLayout } from "../components/Layouts";

const router = [
  {
    path: "/",
    isProtected: true,
    layout: "None",
    element: HomePage,
  },
  {
    path: "/post",
    isProtected: true,
    layout: DefaultLayout,
    element: PostPage,
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
    path: "/register",
    element: RegisterPage,
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
  {
    path: "/root/permissions",
    layout: RootLayout,
    element: RootViewAccountPermissions,
    isProtected: true,
  },

  // Admin router [The Van]
  {
    path: "/admin/profile/:id",
    isProtected: true,
    layout: AdminLayout,
    element: AdminProfilePage,
  },
  {
    path: "/admin/:id/all-members",
    isProtected: true,
    layout: AdminLayout,
    element: AdminAllMembersPage,
  },
  {
    path: "/admin/:id/all-rooms",
    isProtected: true,
    layout: AdminLayout,
    element: AdminAllRoomsPage,
  },

  // Error page
  {
    path: "/error/404",
    isProtected: false,
    layout: "none",
    element: ErrorPage,
  },
];

export default router;
