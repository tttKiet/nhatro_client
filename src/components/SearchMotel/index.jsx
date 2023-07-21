import Select from "react-select";
import { BiSend } from "react-icons/bi";
import { ToastContext } from "../../untils/context";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import styles from "./SearchMotel.module.scss";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import moment from "moment";
import classNames from "classNames/bind";
import CalendarDate from "../Calendar";

const cx = classNames.bind(styles);

function SearchMotel() {
  const [showLocation, setShowLocation] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [textLocation, setTextLocation] = useState("");
  const [textDate, setTextDate] = useState("");
  const toast = useContext(ToastContext);
  const locationRef = useRef(null);
  const dateRef = useRef(null);
  const searchRef = useRef(null);
  const [options, setOptions] = useState([]);
  const [optionsDistrict, setOptionsDistrict] = useState([]);
  const [optionsWard, setOptionsWard] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const position = useMemo(() => [16.522677034140713, 107.16528901370049], []);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleChangeDate = (event) => {
    setSelectionRange({ ...event.selection });
    console.log(event.selection);
    setTextDate(
      `From ${moment(event.selection.startDate).calendar()} to ${moment(
        event.selection.endDate
      ).calendar()}`
    );
  };

  const toggleOpenLocation = () => {
    setShowLocation((o) => !o);
  };

  const toggleShowDate = () => {
    setShowDate((o) => !o);
  };

  const handleSearchToSelect = () => {
    const data = {
      province: selectedProvince,
      district: selectedDistrict,
      ward: selectedWard,
    };

    setTextLocation(
      `${selectedWard?.label ? `${selectedWard?.label}, ` : ""}
        ${selectedDistrict?.label ? `${selectedDistrict?.label}, ` : ""}
        ${selectedProvince?.label ? `${selectedProvince?.label}` : ""}
      `
    );
    console.log(data);
    setShowLocation(false);
    setShowDate(true);
  };

  const handleChangeProvince = (e) => {
    setSelectedProvince(e);
    axios
      .get(`https://provinces.open-api.vn/api/p/${e.value}?depth=2`)
      .then((res) => {
        const data = res?.data.districts.map((d) => ({
          label: d.name,
          value: d.code,
        }));
        setOptionsDistrict(data);
      })
      .catch((error) => {
        toast.error("Error fetching data. Please try again or F5 reload page!");
        console.error("Error fetching data:", error);
      });
    setSelectedDistrict(null);
    setSelectedWard(null);
  };

  const handleChangeDistrict = (e) => {
    setSelectedDistrict(e);
    axios
      .get(`https://provinces.open-api.vn/api/d/${e.value}?depth=2`)
      .then((res) => {
        const data = res?.data.wards.map((d) => ({
          label: d.name,
          value: d.code,
        }));
        setOptionsWard(data);
      })
      .catch((error) => {
        toast.error("Error fetching data...Please or F5 reload page!");
        console.error("Error fetching data:", error);
      });
    setSelectedWard(null);
  };

  useEffect(() => {
    const handleClickWindow = (e) => {
      if (locationRef?.current && !locationRef.current.contains(e.target)) {
        setShowLocation(false);
      }

      if (dateRef?.current && !dateRef.current.contains(e.target)) {
        setShowDate(false);
      }
    };

    window.addEventListener("click", handleClickWindow, true);

    return () => {
      window.removeEventListener("click", handleClickWindow, true);
    };
  }, []);

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
        toast.error("Error fetching data...Please or F5 reload page!");
        console.error("Error fetching data:", error);
      });
  }, [toast]);
  return (
    <div className={cx("wrap")}>
      <div className={cx("d-flex justify-content-center")}>
        <div className={cx("search")} ref={searchRef}>
          {/* location */}
          <div
            className={cx("contai", { open: showLocation })}
            ref={locationRef}
          >
            <div className={cx("search_location")}>
              <div className={cx("select")}>
                <h4>Province:</h4>
                <Select
                  className={cx("d_slect")}
                  value={selectedProvince}
                  onChange={handleChangeProvince}
                  placeholder="Choose province"
                  options={options}
                />
              </div>
              <div className={cx("select")}>
                <h4>District:</h4>
                <Select
                  className={cx("d_slect")}
                  value={selectedDistrict}
                  onChange={handleChangeDistrict}
                  placeholder="Choose district"
                  options={optionsDistrict}
                />
              </div>
              <div className={cx("select")}>
                <h4>Ward:</h4>
                <Select
                  className={cx("d_slect")}
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e)}
                  placeholder="Choose ward"
                  options={optionsWard}
                />
              </div>
              <div className={cx("send")} onClick={handleSearchToSelect}>
                <span className="fs-m pe-2">Continues</span>
                <BiSend size={22} />
              </div>
            </div>
            <MapContainer
              dragging={false}
              center={position}
              zoom={5}
              scrollWheelZoom={false}
              className={cx("map")}
            >
              <TileLayer
                className={cx("map_c")}
                crossOrigin={true}
                url="https://api.maptiler.com/maps/backdrop/256/{z}/{x}/{y}.png?key=AmdWRYOjlbYKSBcuCHul"
              />

              <Marker position={position}>
                <Popup>
                  We are living in VietNam <br /> I love it so much!!!
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* rent date */}
          <div className={cx("contai", { open: showDate })} ref={dateRef}>
            <div className={cx("date_slect")}>
              <div>Select check-in date</div>
              <div className={cx("send")}>
                <span className="fs-m pe-2">Continues</span>
                <BiSend size={22} />
              </div>
            </div>
            <CalendarDate
              selectionRange={selectionRange}
              onChange={handleChangeDate}
            />
          </div>
          <div className={cx("gr")}>
            <div className={cx("title")}>Location</div>
            <span
              className={cx("description")}
              onClick={() => toggleOpenLocation()}
            >
              {textLocation ? textLocation : "Add check in"}
            </span>
          </div>
          <div className={cx("gr")}>
            <div className={cx("title")}>Received date</div>
            <div className={cx("description")} onClick={toggleShowDate}>
              {textDate ? textDate : "Add date "}
            </div>
          </div>
          {/* <div className={cx("gr")}>
            <div className={cx("title")}>Price</div>
            <div className={cx("description")}>Choose price</div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default SearchMotel;
