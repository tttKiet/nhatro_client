import NavLeft from "../../components/navs/NavLeft";
import styles from "./UserProfilePage.module.scss";
import classNames from "classNames/bind";
import { Tab, Tabs } from "react-bootstrap";
import { Container } from "react-bootstrap";
import StarsCanvas from "../../components/StarsCanvas";
import MyProfile from "../../components/MyProfile";
import { useState } from "react";

const cx = classNames.bind(styles);

function UserProfilePage() {
  const [active, setActive] = useState("my-profile");
  return (
    <div className={cx("min-vh-100", "wrap", "position-relative")}>
      <StarsCanvas />
      <Container fluid="sm">
        <div className={cx("contai")}>
          <div className={cx("nav")}>
            <NavLeft setActive={setActive} active={active} />
          </div>
          <div className={cx("child")}>
            <Tabs
              defaultActiveKey={"my-profile"}
              activeKey={active}
              className="mb-3"
              style={{ display: "none" }}
            >
              <Tab eventKey="my-profile" title="my-profile">
                <MyProfile />
              </Tab>
              <Tab eventKey="verify-email" title="verify-email">
                Tab content for verify-email
              </Tab>
              <Tab eventKey="contact" title="Contact" disabled>
                Tab content for Contact
              </Tab>
            </Tabs>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default UserProfilePage;
