import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./router";
import GlobalStyles from "./components/GlobalStyles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import ProviderGetUserLogin from "./components/ProviderGetUserLogin";
import "bootstrap/dist/css/bootstrap.min.css";
import "moment-timezone";
import { Tooltip } from "react-tooltip";
import moment from "moment";
moment().format("MMM Do YY");
// react alert2 animation
import "animate.css";
import { ToastContext } from "./untils/context";
import { Suspense } from "react";
import PreSnipperLoader from "./components/PreSnipperLoader";

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
                <Suspense fallback={<PreSnipperLoader />}>
                  <Element />
                </Suspense>
              </ProtectedRoute>
            </ProviderGetUserLogin>
          ) : (
            <>
              <Suspense fallback={<PreSnipperLoader />}>
                <Element />
              </Suspense>
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
                <Suspense fallback={<PreSnipperLoader />}>
                  <Element />
                </Suspense>
              </MappingLayout>
            </ProtectedRoute>
          </ProviderGetUserLogin>
        ) : (
          <MappingLayout>
            <Suspense fallback={<PreSnipperLoader />}>
              <Element />
            </Suspense>
          </MappingLayout>
        ),
      };
    } else {
      return {
        path: route.path,
        element: isProtected ? (
          <ProviderGetUserLogin>
            <ProtectedRoute>
              <Suspense fallback={<PreSnipperLoader />}>
                <Element />
              </Suspense>
            </ProtectedRoute>
          </ProviderGetUserLogin>
        ) : (
          <Suspense fallback={<PreSnipperLoader />}>
            <Element />
          </Suspense>
        ),
      };
    }
  })
);

function App() {
  return (
    <>
      <GlobalStyles>
        <ToastContext.Provider value={toast}>
          <ToastContainer
            limit={1}
            newestOnTop={true}
            autoClose={3000}
            theme="light"
            position="top-center"
          />
          <Tooltip style={{ zIndex: 1000 }} anchorSelect=".check" />
          <RouterProvider router={route} />
        </ToastContext.Provider>
      </GlobalStyles>
    </>
  );
}

export default App;
