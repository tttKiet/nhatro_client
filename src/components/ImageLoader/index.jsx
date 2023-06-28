import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const ImageLoader = ({ image }) => (
  <LazyLoadImage effect="opacity" src={image.src} {...image} />
);
export default ImageLoader;
