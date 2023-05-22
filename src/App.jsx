import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./router";
import Layout from "./components/Layout";
import GlobalStyles from "./components/GlobalStyles";

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
  return (
    <GlobalStyles>
      <RouterProvider router={route} />
    </GlobalStyles>
  );
}

export default App;
