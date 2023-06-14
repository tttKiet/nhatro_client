import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./router";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import GlobalStyles from "./components/GlobalStyles";
import ProtectedRoute from "./components/ProtectedRoute";
import ProviderGetUserLogin from "./components/ProviderGetUserLogin";
import "bootstrap/dist/css/bootstrap.min.css";
import "moment-timezone";
import moment from "moment";
moment().format("MMM Do YY");
// react alert2 animation
import "animate.css";
import { ToastContext } from "./untils/context";

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
      <ToastContext.Provider value={toast}>
        <Toaster>
          {(t) => (
            <ToastBar toast={t}>
              {({ icon, message }) => (
                <>
                  {icon}
                  {message}
                  {t.type !== "loading" && (
                    <button
                      className={"icon-x"}
                      onClick={() => toast.dismiss(t.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </>
              )}
            </ToastBar>
          )}
        </Toaster>
        <RouterProvider router={route} />
      </ToastContext.Provider>
    </GlobalStyles>
  );
}

export default App;
