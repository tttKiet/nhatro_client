import PropTypes from "prop-types";
import { toast, Toaster, ToastBar } from "react-hot-toast";

import { Button, Accordion, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useAuth } from "../../hooks";
import { userServices } from "../../services";
import Snipper from "../Snipper";
import { reloadInfo } from "../../redux/reducers/userSlice";
import { useDispatch } from "react-redux";

// css
import styles from "./ModelUpdateInfo.module.scss";
import classNames from "classNames/bind";
const cx = classNames.bind(styles);
function ModelUpdateInfo({ show, handleClose, getUser }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [, , user] = useAuth();
  const [personality, setPersonality] = useState("");
  let ref;

  const handleClickBtnEnter = () => {
    ref.focus();
    if (personality) {
      formik.setValues({
        ...formik.values,
        personalities: [...formik.values.personalities, personality],
      });
    }

    setPersonality("");
  };

  const handleCloseModel = () => {
    handleClose();
  };

  const validate = (values) => {
    const errors = {};

    if (!values.fullName) {
      errors.fullName = "Please enter your full name!";
    }

    if (!values.email) {
      errors.email = "Please enter your email!";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email format!";
    }

    if (!values.phone) {
      errors.phone = "Please enter your phone number!";
    } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(values.phone)) {
      errors.phone = "Invalid phone number format!";
    }

    if (!values.address) {
      errors.address = "Please enter your address!";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      bio: "",
      personalities: [],
      email: "",
      phone: "",
      address: "",
      school: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validate: validate,
  });
  const handleCLickXPerson = (index) => {
    formik.values.personalities.splice(index, 1);
    formik.setValues({
      ...formik.values,
      personalities: [...formik.values.personalities],
    });
  };

  useEffect(() => {
    function getUserById() {
      if (user) {
        const _id = user._id;
        userServices.getUserById(_id).then((res) => {
          if (res.err === 0)
            formik.setValues({
              fullName: res.dataUser.fullName || "",
              bio: res.dataUser.bio || "",
              personalities: res.dataUser.personalities || [],
              email: res.dataUser.email || "",
              phone: res.dataUser.phone || "",
              address: res.dataUser.address || "",
              school: res.dataUser.school || "",
            });
          else {
            toast.error("Get infomation failed. Please try again!");
          }
        });
      }
    }
    getUserById();
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    const res = await userServices.updateProfile(user._id, values);
    if (res.status === 200) {
      if (res.data.err === 0) {
        toast.success("Updated sucess!");
        dispatch(reloadInfo());
        getUser();
        handleClose();
      } else {
        toast.error(res.data.message);
      }
    } else {
      toast.error("Failed to update profile!");
    }
    setLoading(false);
  };

  return (
    <>
      <Toaster>
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== "loading" && (
                  <button
                    className={cx("icon-x")}
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
      <Modal show={show} centered onHide={handleCloseModel}>
        <Modal.Header closeButton>
          <Modal.Title>Update information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Changes name
                {formik.touched.fullName && formik.errors.fullName && (
                  <span className={cx("icon", "err")}>
                    <VscError />
                  </span>
                )}
              </Accordion.Header>
              <Accordion.Body>
                <div>
                  <input
                    id="fullName"
                    spellCheck={false}
                    type="text"
                    className={cx("input", {
                      err: formik.touched.fullName && formik.errors.fullName,
                    })}
                    placeholder="Enter new name!"
                    name="fullName"
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                  />
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                Bio
                {formik.touched.bio && formik.errors.bio && (
                  <span className={cx("icon", "err")}>
                    <VscError />
                  </span>
                )}
              </Accordion.Header>
              <Accordion.Body>
                <textarea
                  id="bio"
                  name="bio"
                  onChange={formik.handleChange}
                  value={formik.values.bio}
                  spellCheck={false}
                  cols="30"
                  rows="4"
                  placeholder="Enter bio"
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Personality</Accordion.Header>
              <Accordion.Body>
                <div className={cx("personality", "mb-3")}>
                  <input
                    type="text"
                    name="personality"
                    className={cx("input")}
                    placeholder="Enter new personality!"
                    onChange={(e) => setPersonality(e.target.value)}
                    value={personality}
                    ref={(e) => (ref = e)}
                    onKeyDown={(e) => {
                      if (e.code === "Enter" && personality.trim() !== "") {
                        handleClickBtnEnter();
                      } else if (personality.trim() === "") {
                        setPersonality("");
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      if (personality.trim() !== "") handleClickBtnEnter();
                      else {
                        setPersonality("");
                      }
                    }}
                    className={cx("enter")}
                  >
                    Enter
                  </button>
                </div>
                {formik.values.personalities.length > 0 ? (
                  <ul className={cx("list-personality")}>
                    {formik.values.personalities.map((personality, index) => (
                      <li key={index} onClick={() => handleCLickXPerson(index)}>
                        {personality}
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
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span>No personality added</span>
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                Changes contacts
                {formik.touched.email &&
                  (formik.errors.email ||
                    formik.errors.phone ||
                    formik.errors.address) && (
                    <span className={cx("icon", "err")}>
                      <VscError />
                    </span>
                  )}
              </Accordion.Header>
              <Accordion.Body>
                <div>
                  <div className="mb-3">
                    <label htmlFor="email" className="fs-s mx-2">
                      <i>Email</i>
                    </label>
                    <input
                      type="text"
                      spellCheck={false}
                      id="email"
                      className={cx("input", {
                        err: formik.touched.email && formik.errors.email,
                      })}
                      placeholder="Enter email!"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="fs-s mx-2 c">
                      <i>Phone</i>
                    </label>
                    <input
                      type="text"
                      spellCheck={false}
                      id="phone"
                      className={cx("input", {
                        err: formik.touched.phone && formik.errors.phone,
                      })}
                      placeholder="Enter new phone!"
                      name="phone"
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address" className="fs-s mx-2 c">
                      <i>Address</i>
                    </label>
                    <textarea
                      type="text"
                      spellCheck={false}
                      id="address"
                      rows={2}
                      className={cx("input", {
                        err: formik.touched.address && formik.errors.address,
                      })}
                      placeholder="Enter new address !"
                      name="address"
                      onChange={formik.handleChange}
                      defaultValue={formik.values.address}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="school" className="fs-s mx-2 c">
                      <i>School</i>
                    </label>
                    <input
                      type="text"
                      spellCheck={false}
                      id="school"
                      className={cx("input")}
                      placeholder="Enter change school!"
                      name="school"
                      onChange={formik.handleChange}
                      value={formik.values.school}
                    />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => formik.handleSubmit()}>
            {loading ? <Snipper /> : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ModelUpdateInfo.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
};

export default ModelUpdateInfo;
