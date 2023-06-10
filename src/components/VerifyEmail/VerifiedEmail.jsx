// scss
import { CgArrowsExchange } from "react-icons/cg";
import styles from "./VerifyEmail.module.scss";
import classNames from "classNames/bind";
import { useAuth } from "../../hooks";
const cx = classNames.bind(styles);

function VerifiedEmail({ setChangeInterface }) {
  const [, , user] = useAuth();
  return (
    <div className={cx("verified")}>
      <h3 className={cx("title")}>Your email has been verified!</h3>
      <ul className={cx("content", "mt-3")}>
        <li>You can use this email to log in into the system.</li>
        <li>You can also request to become a room admin owner.</li>
        <li>
          In the future, you can use many functions if the system is updated.
        </li>
      </ul>
      <h4 className={cx("title_4", "mt-4")}>Email infomation</h4>
      <div className={cx("email", "mt-3")}>
        <span className={cx("email_doc")}>{user?.email}</span>
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
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
          />
        </svg>
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={() => {
            setChangeInterface(true);
          }}
          className={cx("btn-default center", "transparent", {
            disabled: false,
          })}
        >
          <CgArrowsExchange />
          Change Email
        </button>
      </div>
    </div>
  );
}

export default VerifiedEmail;
