import PropTypes from "prop-types";
import "./GlobalStyles.scss";
import { useEffect } from "react";

function GlobalStyles({ children }) {
  useEffect(() => {
    var windowHeight = window.innerHeight;
    var elemenbodyHeight = document.body.scrollHeight;

    if (windowHeight < elemenbodyHeight) {
      document.body.classList.add("scrollBarColor");
    }
  }, []);

  return <>{children}</>;
}

GlobalStyles.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalStyles;
