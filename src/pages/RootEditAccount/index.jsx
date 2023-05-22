import { useSelector } from "react-redux";
import styles from "./RootEditAccount.module.scss";
import classNames from "classNames/bind";
import { userSelector } from "../../redux/selectors";
import RegisterForm from "../../components/RegisterForm";
import { useParams } from "react-router-dom";

const cx = classNames.bind(styles);

function RootEditAccount() {
  const { id } = useParams();
  const currUser = useSelector(userSelector.curUserLogin);
  console.log(currUser);

  return (
    <div className={cx("wrap")}>
      <h2 className={cx("header")}>Edit account have id &quot;{id}&quot;</h2>
      <RegisterForm _id={id} />
    </div>
  );
}

export default RootEditAccount;
