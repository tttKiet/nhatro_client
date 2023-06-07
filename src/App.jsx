import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./router";

import GlobalStyles from "./components/GlobalStyles";
import ProtectedRoute from "./components/ProtectedRoute";
import ProviderGetUserLogin from "./components/ProviderGetUserLogin";
import "bootstrap/dist/css/bootstrap.min.css";
import "moment-timezone";
import moment from "moment";
moment().format("MMM Do YY");
// react alert2 animation
import "animate.css";

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
            <ProviderGetUserLogin>
              <ProtectedRoute>
                <Element />
              </ProtectedRoute>
            </ProviderGetUserLogin>
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
          <ProviderGetUserLogin>
            <ProtectedRoute>
              <MappingLayout>
                <Element />
              </MappingLayout>
            </ProtectedRoute>
          </ProviderGetUserLogin>
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
          <ProviderGetUserLogin>
            <ProtectedRoute>
              <Element />
            </ProtectedRoute>
          </ProviderGetUserLogin>
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
