import { BarLoader } from "react-spinners";
import styles from "./BarLoader.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);
function BarLoading({ color = "rgb(24, 24, 199)" }) {
  return <BarLoader width={"100%"} color={color} />;
}

export default BarLoading;
