import NavLeft from "../../components/navs/NavLeft";
import { Tab, Tabs } from "react-bootstrap";
import { Container } from "react-bootstrap";
import MyProfile from "../../components/MyProfile";
import { useEffect, useRef, useState } from "react";
import VerifyEmail from "../../components/VerifyEmail";
import { useSearchParams } from "react-router-dom";
import ReqUpOwner from "../../components/ReqUpOwner";

// scss
import styles from "./UserProfilePage.module.scss";
import classNames from "classNames/bind";
import AllFeedback from "../../components/AllFeedback";
import { HiMenu } from "react-icons/hi";
import ChangePassword from "../../components/ChangePassword";
const cx = classNames.bind(styles);

const tagName = [
  "my-profile",
  "verify-email",
  "req-owner-broad-house",
  "my-feedback",
  "change-password",
];

function UserProfilePage() {
  const navBarRef = useRef(null);
  const [searchParams] = useSearchParams();
  const [active, setActive] = useState(
    tagName.includes(searchParams.get("tag"))
      ? searchParams.get("tag")
      : "my-profile"
  );

  const [show, setShow] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (show === true) {
      navBarRef.current.style.display = "block";
    }
  }, [show]);

  useEffect(() => {
    if (tagName.includes(searchParams.get("tag"))) {
      setActive(searchParams.get("tag"));
    }
  }, [searchParams]);

  return (
    <div className={cx("min-vh-100", "wrap", "position-relative")}>
      <div
        className={cx(`${show ? "blur" : ""}`)}
        onClick={() => handleClose()}
      ></div>

      {/* <StarsCanvas /> */}
      <div
        className={cx("nav-reponsive", `${!show ? "nav-exit" : ""}`)}
        ref={navBarRef}
      >
        <NavLeft setActive={setActive} active={active} onHide={handleClose} />
      </div>
      <div
        className={cx(
          "header-responsive",
          `${show ? "header-responsive-exit" : ""}`
        )}
      >
        <HiMenu className={cx("icon-menu")} onClick={handleShow}></HiMenu>
      </div>

      <div style={{ padding: "60px 0" }}>
        <Container fluid="xl">
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

                <Tab eventKey="change-password" title="change-password">
                  <ChangePassword />
                </Tab>
              </Tabs>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default UserProfilePage;
