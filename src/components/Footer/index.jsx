import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";
import classNames from "classNames/bind";
import {
  FaReact,
  FaNodeJs,
  FaFacebookF,
  FaEnvelope,
  FaUser,
  FaGithub,
} from "react-icons/fa";
import { DiMongodb } from "react-icons/di";
import { SiExpress } from "react-icons/si";

const cx = classNames.bind(styles);
function Footer() {
  return (
    <div className={cx("wrap")}>
      <div className="container py-3">
        <div className="row p-4">
          <div className={cx("col-left", "col-md-4")}>
            <div className="row">
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                  width={30}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                  ></path>
                </svg>{" "}
                <p className="m-0 fs-l fw-bold ms-2">Future Motel</p>
              </div>
              <p className="fs-s mt-3 fw-light text-break">
                Welcome to the Future Motel
                <br></br>
                Affordable, comfortable rooms with modern amenities.
                Conveniently located near attractions, our friendly staff
                ensures a memorable stay. Unwind and enjoy genuine hospitality
                with us.
              </p>
            </div>
          </div>
          <div className={cx("col-right", "col-md-8 d-flex")}>
            <div className="row">
              {" "}
              {/* Links */}
              <div className="col-xl-2 col-6">
                <p className="fs-l fw-medium">Links</p>
                <Link to="/post" className={cx("link-footer", "fs-s")}>
                  <p>Post</p>
                </Link>

                <Link to="/motel" className={cx("link-footer", "fs-s")}>
                  <p>Motel</p>
                </Link>

                <Link to="/message" className={cx("link-footer", "fs-s")}>
                  <p>Message</p>
                </Link>

                <Link to="/profile" className={cx("link-footer", "fs-s")}>
                  <p>Personal Page</p>
                </Link>

                <Link to="/notification" className={cx("link-footer", "fs-s")}>
                  <p>Notification</p>
                </Link>
              </div>
              {/* technologies */}
              <div className="col-xl-2 col-6">
                <p className="fw-medium fs-l">Technologies</p>
                <p className="fs-s">
                  ReactJS <FaReact className="fs-m"></FaReact>
                </p>
                <p className="fs-s">
                  NodeJs <FaNodeJs className="fs-m"></FaNodeJs>
                </p>

                <p className="fs-s">
                  MongoDb <DiMongodb className="fs-m"></DiMongodb>
                </p>

                <p className="fs-s">
                  ExpressJS <SiExpress className="fs-m"></SiExpress>
                </p>

                <p className="fs-s">Etc...</p>
              </div>
              {/* Developers */}
              <div className="col-xl-8 col-12">
                <p className="fw-medium fs-l text-center">Developers</p>
                <div className="row">
                  <div className="col-xl-6 col-6">
                    <p className="fs-s">
                      <FaUser className="fs-m me-2"></FaUser>Lai The Van
                    </p>
                    <p>
                      <a
                        href="https://www.facebook.com/ltv.1805/"
                        className={cx(
                          "link-footer",
                          "fs-s d-flex align-items-center text-break"
                        )}
                      >
                        <FaFacebookF className="fs-m me-2"></FaFacebookF>
                        https://www.facebook.com/ltv.1805/
                      </a>
                    </p>

                    <p>
                      <a
                        href="#"
                        className={cx(
                          "link-footer",
                          "fs-s d-flex align-items-center  text-break"
                        )}
                      >
                        <FaEnvelope className="fs-m me-2"></FaEnvelope>
                        fcthevan123@gmail.com
                      </a>
                    </p>
                    <p>
                      <a
                        href="https://github.com/fcthevan123-vn"
                        className={cx(
                          "link-footer",
                          "fs-s d-flex align-items-center text-break"
                        )}
                      >
                        <FaGithub className="fs-m me-2 "></FaGithub>
                        https://github.com/fcthevan123-vn
                      </a>
                    </p>
                  </div>

                  <div className="col-xl-6 col-6">
                    <p className="fs-s">
                      <FaUser className="fs-m me-2"></FaUser>Lai The Van
                    </p>
                    <p>
                      <a
                        href="https://www.facebook.com/ltv.1805/"
                        className={cx(
                          "link-footer",
                          "fs-s d-flex align-items-center text-break"
                        )}
                      >
                        <FaFacebookF className="fs-m me-2"></FaFacebookF>
                        https://www.facebook.com/ltv.1805/
                      </a>
                    </p>

                    <p>
                      <a
                        href="#"
                        className={cx(
                          "link-footer",
                          "fs-s d-flex align-items-center text-break"
                        )}
                      >
                        <FaEnvelope className="fs-m me-2"></FaEnvelope>
                        fcthevan123@gmail.com
                      </a>
                    </p>

                    <p>
                      <a
                        href="https://github.com/fcthevan123-vn"
                        className={cx(
                          "link-footer",
                          "fs-s d-flex align-items-center  text-break"
                        )}
                      >
                        <FaGithub className="fs-m me-2 "></FaGithub>
                        https://github.com/fcthevan123-vn
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
