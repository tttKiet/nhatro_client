import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

import { Suspense, useRef, useState } from "react";
// scss
import styles from "./StarsCanvas.module.scss";
import classNames from "classNames/bind";
const cx = classNames.bind(styles);

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => {
    let positions = random.inSphere(new Float32Array(6000), { radius: 1.2 });
    return positions;
  });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  // console.log(random.inSphere(new Float32Array(5000), { radius: 1.2 }));
  return (
    // eslint-disable-next-line react/no-unknown-property
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#353535"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};
function StarsCanvas() {
  return (
    <div className={cx("wrap")}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
}

export default StarsCanvas;
