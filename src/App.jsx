import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./router";
import RegisterForm from "./components/RegisterForm";

console.log(router);

const route = createBrowserRouter(
  router.map((route) => {
    const Element = route.element;
    return {
      path: route.path,
      element: <Element />,
    };
  })
);

function App() {
  return <RouterProvider router={route} />;
}

export default App;
