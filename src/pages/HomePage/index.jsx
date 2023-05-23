import UserHomePage from "../UserHomePage";
import AdminHomePage from "../AdminHomePage";
import RootHomePage from "../RootHomePage";
import AdminLayout from "../../components/Layouts/AdminLayout";
import { useAuth } from "../../hooks";
import { RootLayout, DefaultLayout } from "../../components/Layouts";

// import styles from "./HomePage.module.scss";
// import classNames from "classNames/bind";
// const cx = classNames.bind(styles);

function HomePage() {
  const [, type] = useAuth();

  console.log("type:", type);

  return (
    <>
      {type === "root" ? (
        <RootLayout>
          <RootHomePage />
        </RootLayout>
      ) : (
        <>
          {type === "admin" ? (
            <AdminLayout>
              <AdminHomePage />
            </AdminLayout>
          ) : (
            <DefaultLayout>
              <UserHomePage />
            </DefaultLayout>
          )}
        </>
      )}
    </>
  );
}

export default HomePage;
