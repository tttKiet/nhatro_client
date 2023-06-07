import { RingLoader } from "react-spinners";
import PropTypes from "prop-types";

function Snipper({ color = "#fff", size = 20 }) {
  return (
    <div>
      <RingLoader size={size} color={color} speedMultiplier={1} />
    </div>
  );
}

Snipper.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default Snipper;
