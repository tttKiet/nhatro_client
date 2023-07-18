import Select from "react-select";
import { BiSend } from "react-icons/bi";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import styles from "./SearchMotel.module.scss";
import classNames from "classNames/bind";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function SearchMotel() {
  const [options, setOptions] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const position = [10.030136944598407, 105.76775186033446];
  const handleChangeProvince = (e) => {
    setSelectedProvince(e);
    setSelectedDistrict(null);
  };

  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/p/")
      .then((res) => {
        const data = res?.data.map((p) => ({
          label: p.name,
          value: p.code,
        }));
        setOptions(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div className={cx("wrap")}>
      <div className={cx("d-flex justify-content-center")}>
        <div className={cx("search")}>
          <div className={cx("contai")}>
            <div className={cx("search_location")}>
              <h4>Province:</h4>
              <Select
                className={cx("select")}
                value={selectedProvince}
                onChange={handleChangeProvince}
                placeholder="Choose province"
                options={options}
              />
              <BiSend size={22} />
            </div>
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={true}
              className={cx("map")}
            >
              <TileLayer
                // zIndex={10000}
                className={cx("map_c")}
                crossOrigin={true}
                url="https://api.maptiler.com/maps/backdrop/256/{z}/{x}/{y}.png?key=AmdWRYOjlbYKSBcuCHul"
              />

              <Marker position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          <div className={cx("gr")}>
            <div className={cx("title")}>Location</div>
            <span className={cx("description")}>Check in</span>
          </div>
          <div className={cx("gr")}>
            <div className={cx("title")}>Received date</div>
            <div className={cx("description")}>Add date</div>
          </div>
          <div className={cx("gr")}>
            <div className={cx("title")}>Price</div>
            <div className={cx("description")}>Choose price</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchMotel;
