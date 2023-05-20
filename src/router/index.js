import { HomePage, AboutPage, LoginPage } from "../pages";

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
];

export default router;
