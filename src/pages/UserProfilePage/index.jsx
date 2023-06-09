import NavLeft from "../../components/navs/NavLeft";
import { Tab, Tabs } from "react-bootstrap";
import { Container } from "react-bootstrap";
import StarsCanvas from "../../components/StarsCanvas";
import MyProfile from "../../components/MyProfile";
import { useEffect, useState } from "react";
import VerifyEmail from "../../components/VerifyEmail";
import { useSearchParams } from "react-router-dom";
import ReqUpOwner from "../../components/ReqUpOwner";

// scss
import styles from "./UserProfilePage.module.scss";
import classNames from "classNames/bind";
import AllFeedback from "../../components/AllFeedback";
const cx = classNames.bind(styles);

const tagName = [
  "my-profile",
  "verify-email",
  "req-owner-broad-house",
  "my-feedback",
];

function UserProfilePage() {
  const [searchParams] = useSearchParams();
  const [active, setActive] = useState(
    tagName.includes(searchParams.get("tag"))
      ? searchParams.get("tag")
      : "my-profile"
  );

  useEffect(() => {
    if (tagName.includes(searchParams.get("tag"))) {
      setActive(searchParams.get("tag"));
    }
  }, [searchParams]);

  return (
    <div className={cx("min-vh-100", "wrap", "position-relative")}>
      <StarsCanvas />
      <Container fluid="sm">
        <div className={cx("contai")}>
          <div className={cx("nav", "d-lg-block", "d-none")}>
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
                <VerifyEmail />
              </Tab>
              <Tab
                eventKey="req-owner-broad-house"
                title="req-owner-broad-house"
              >
                <ReqUpOwner />
              </Tab>
              <Tab eventKey="my-feedback" title="my-feedback">
                <AllFeedback />
              </Tab>
            </Tabs>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default UserProfilePage;
