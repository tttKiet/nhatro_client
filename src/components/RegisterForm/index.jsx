import { useState } from "react";
import { userServices } from "../../services";

import styles from "./RegisterForm.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setmessage] = useState("");

  const [fullNameErr, setFullNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [passwordRepeatErr, setPasswordRepeatErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [addressErr, setAddressErr] = useState("");

  const validateForm = () => {
    let isErr = false;
    if (!fullName) {
      setFullNameErr("Bạn phải điền Họ & Tên!");
      isErr = true;
    } else {
      setFullNameErr("");
    }
    if (!email) {
      setEmailErr("Bạn phải điền Email!");
      isErr = true;
    } else {
      setEmailErr("");
    }

    if (!passwordRepeat) {
      setPasswordErr("Bạn phải điền Mật khẩu!");
      isErr = true;
    } else if (passwordRepeat !== password) {
      setPasswordErr();
      setPasswordRepeatErr("Nhập lại mật khẩu không chính xác!");
      isErr = true;
    } else {
      setPasswordRepeatErr("");
      setPasswordErr();
    }

    if (!phone) {
      setPhoneErr("Bạn phải điền Số điện thoại!");
      isErr = true;
    } else {
      setPhoneErr("");
    }

    if (!address) {
      setAddressErr("Bạn phải điền địa chỉ!");
      isErr = true;
    } else {
      setAddressErr("");
    }
    if (!isErr) {
      setDefaultErr();
    }

    return isErr;
  };

  const setDefaultErr = () => {
    setFullNameErr("");
    setEmailErr("");
    setPasswordErr("");
    setPasswordRepeatErr("");
    setPhoneErr("");
    setAddressErr("");
  };

  async function register() {
    const data = {
      fullName: fullName,
      email: email,
      password: password,
      sdt: phone,
      address: address,
    };

    if (!validateForm()) {
      const res = await userServices.createUser(data);
      if (res.err === 0) {
        setmessage(res.message);
      }
    } else {
      return;
    }
  }

  return (
    <div className={cx("wrap")}>
      <form className={cx("form")}>
        <div>
          <div className={cx("form-group")}>
            <label className={cx("form-group-label")}>Full name:</label>
            <input
              type="text"
              value={fullName}
              placeholder="Full Name"
              onChange={(ev) => setFullName(ev.target.value)}
            />
            <span className={cx("err")}>{fullNameErr}</span>
          </div>

          <div className={cx("form-group")}>
            <label className={cx("form-group-label")}>email:</label>
            <input
              type="text"
              value={email}
              placeholder="Input your Full Name.."
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <span className={cx("err")}>{emailErr}</span>
          </div>
          <div className={cx("form-group")}>
            <label className={cx("form-group-label")}>Phone:</label>
            <input
              type="text"
              value={phone}
              placeholder="Input your Phone.."
              onChange={(ev) => setPhone(ev.target.value)}
            />
            <span className={cx("err")}>{phoneErr}</span>
          </div>
          <div className={cx("form-group")}>
            <label className={cx("form-group-label")}>Password:</label>
            <input
              type="text"
              value={password}
              placeholder="Input your Password.."
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <span className={cx("err")}>{passwordErr}</span>
          </div>

          <div className={cx("form-group")}>
            <label className={cx("form-group-label")}> Password Repeat :</label>
            <input
              type="text"
              value={passwordRepeat}
              placeholder="Repeat your Password.."
              onChange={(ev) => setPasswordRepeat(ev.target.value)}
            />
            <span className={cx("err")}>{passwordRepeatErr}</span>
          </div>

          <div className={cx("form-group")}>
            <label className={cx("form-group-label")}>Address:</label>
            <input
              type="text"
              value={address}
              placeholder="Input your Address.."
              onChange={(ev) => setAddress(ev.target.value)}
            />
            <span className={cx("err")}>{addressErr}</span>
          </div>
          <p>{message}</p>

          <button
            className={cx("btn", "btn-primary")}
            type="button"
            onClick={register}
          >
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
