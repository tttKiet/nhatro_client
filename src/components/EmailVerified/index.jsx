import { Tooltip } from "react-tooltip";
import { BsPatchCheck } from "react-icons/bs";

function EmailVerified({ color = "hsl(214, 89%, 52%)", width = 22 }) {
  return (
    <a
      className="check d-inline-flex align-items-end"
      data-tooltip-content="Verified user!"
    >
      <BsPatchCheck className="ms-1" color={color} width={width} />
    </a>
  );
}

export default EmailVerified;
