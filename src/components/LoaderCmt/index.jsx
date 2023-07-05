import ContentLoader from "react-content-loader";
import styles from "./LoaderCmt.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);
function LoaderCmt() {
  return (
    <ContentLoader
      height={50}
      speed={1}
      width={"100%"}
      backgroundColor={"#ECEAEC"}
      foregroundColor={"#c2c2c2"}
    >
      {/* Only SVG shapes */}
      <rect x="0" y="0" rx="50" ry="50" width="40" height="40" />
      <rect x="60" y="6" rx="4" ry="4" width="70%" height="12" />
      <rect x="60" y="24" rx="3" ry="3" width="100%" height="10" />
    </ContentLoader>
  );
}

export default LoaderCmt;
