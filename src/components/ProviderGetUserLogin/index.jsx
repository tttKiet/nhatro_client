import { useEffect, useState } from "react";
import { userServices } from "../../services";
import { useDispatch } from "react-redux";
import { userSlice } from "../../redux/reducers";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Snipper from "../Snipper";

function ProviderGetUserLogin({ children }) {
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      const res = await userServices.getProfile();
      if (res.err === 0) {
        const { token } = res;
        dispatch(
          userSlice.actions.handleLogin({
            _id: token.id,
            email: token.email,
            type: token.type,
            fullName: token.fullName,
            avatar: token.avatar,
          })
        );
        setLogin(true);
      } else {
        navigate("/login");
      }
    };
    getProfile();
  }, [dispatch, navigate]);

  if (!login) {
    return (
      <div className="d-flex min-vh-100 w-100 justify-content-center align-items-center">
        <Snipper color="black" size={40} />
      </div>
    );
  } else {
    return <>{children}</>;
  }
}

ProviderGetUserLogin.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderGetUserLogin;
