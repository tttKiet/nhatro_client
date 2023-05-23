import { userSelector } from "../redux/selectors";
import { useSelector } from "react-redux";

export default function () {
  const isLogged = useSelector(userSelector.isLoginSelector);
  const curUser = useSelector(userSelector.curUserLogin);
  const type = curUser.type;

  return [isLogged, type, curUser];
}
