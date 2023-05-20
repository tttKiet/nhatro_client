import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./router";
import Layout from "./components/Layout";

const route = createBrowserRouter(
  router.map((route) => {
    const Element = route.element;
    const MappingLayout = route.layout;
    if (MappingLayout) {
      if (MappingLayout === "None") {
        return {
          path: route.path,
          element: (
            <>
              <Element />
            </>
          ),
        };
      }
      return {
        path: route.path,
        element: (
          <MappingLayout>
            <Element />
          </MappingLayout>
        ),
      };
    } else {
      return {
        path: route.path,
        element: (
          <Layout>
            <Element />
          </Layout>
        ),
      };
    }
  })
);

function App() {
  return <RouterProvider router={route} />;
}

export default App;
