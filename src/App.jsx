import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./router";

import GlobalStyles from "./components/GlobalStyles";
import ProtectedRoute from "./components/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";

const route = createBrowserRouter(
  router.map((route) => {
    const Element = route.element;
    const MappingLayout = route.layout;
    const isProtected = route.isProtected;
    if (MappingLayout) {
      if (MappingLayout === "None") {
        return {
          path: route.path,
          element: isProtected ? (
            <ProtectedRoute>
              <Element />
            </ProtectedRoute>
          ) : (
            <>
              <Element />
            </>
          ),
        };
      }
      return {
        path: route.path,
        element: isProtected ? (
          <ProtectedRoute>
            <MappingLayout>
              <Element />
            </MappingLayout>
          </ProtectedRoute>
        ) : (
          <MappingLayout>
            <Element />
          </MappingLayout>
        ),
      };
    } else {
      return {
        path: route.path,
        element: isProtected ? (
          <ProtectedRoute>
            <Element />
          </ProtectedRoute>
        ) : (
          <Element />
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
