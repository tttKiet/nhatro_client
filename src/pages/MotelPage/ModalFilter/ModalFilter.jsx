import Modal from "react-bootstrap/Modal";
import styles from "./ModalFilter.module.scss";
import classNames from "classNames/bind";
const cx = classNames.bind(styles);
import Select from "react-select";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BiSearch } from "react-icons/bi";
import { boardHouseServices } from "../../../services";
import { MdOutlineClearAll } from "react-icons/md";

function ModalFilter({ onHide, show, setBoaHouseData, setIsFilter }) {
  const [options, setOptions] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [optionsDistrict, setOptionsDistrict] = useState([]);
  const [optionsWard, setOptionsWard] = useState([]);
  const [priceFilter, setPriceFilter] = useState({
    min: null,
    max: null,
  });
  const [addressFilter, setAddressFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "20px",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    }),
  };

  async function handleSubmit() {
    const dataFilter = {
      ...addressFilter,
      ...priceFilter,
    };
    toast.dismiss();

    if (dataFilter.min == null && dataFilter.province == null) {
      toast.dismiss();
      return toast.warning("Please enter information you want to filter");
    }

    const size = Object.keys(dataFilter).length;
    if (size <= 2) {
      if (parseInt(priceFilter.min) >= parseInt(priceFilter.max)) {
        return toast.warning(
          "The after price must greater than the before price"
        );
      }
    }

    try {
      toast.loading("Loading...");
      const res = await boardHouseServices.filterBoardHouse(dataFilter);
      if (res.err === 0) {
        toast.dismiss();
        setBoaHouseData(res.data);
        setIsFilter(true);
        onHide();
        setIsLoading(false);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error filtering");
    }
  }

  const handleCombineAddress = (e, from) => {
    let data = {};
    if (from == "district") {
      data = {
        province: selectedProvince,
        district: e,
      };
    } else if (from == "province") {
      data = {
        province: e,
      };
    } else {
      data = {
        province: selectedProvince,
        district: selectedDistrict,
        ward: e,
      };
    }

    setAddressFilter(data);
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

  const setDefaultStates = () => {
    setSelectedProvince(null);
    setSelectedWard(null);
    setSelectedDistrict(null);
    setPriceFilter({
      min: null,
      max: null,
    });
    setAddressFilter(null);
    setIsLoading(false);
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
        toast.error("Error fetching data...Please or F5 reload page!");
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Modal
      onExited={() => setDefaultStates()}
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className={cx("wrap")}>
        <p className="fs-xl fw-medium text-center" style={{ color: "#FF6666" }}>
          Filter motel
        </p>
        <p className="fs-m fw-normal fst-italic" style={{ color: "#FF6666" }}>
          Choose address:
        </p>
        <div className={cx("filter-address")}>
          <Select
            styles={customStyles}
            className={cx("select-filter")}
            placeholder="Choose province"
            value={selectedProvince}
            options={options}
            // onChange={handleChangeProvince}
            onChange={(e) => {
              handleChangeProvince(e);
              handleCombineAddress(e, "province");
            }}
          />
          <Select
            styles={customStyles}
            className={cx("select-filter")}
            placeholder="Choose district"
            value={selectedDistrict}
            // onChange={handleChangeDistrict}
            onChange={(e) => {
              handleChangeDistrict(e);
              handleCombineAddress(e, "district");
            }}
            options={optionsDistrict}
          />
          <Select
            styles={customStyles}
            value={selectedWard}
            onChange={(e) => {
              setSelectedWard(e);
              handleCombineAddress(e, "ward");
            }}
            options={optionsWard}
            className={cx("select-filter")}
            placeholder="Choose ward"
          />
        </div>

        <p
          className="fs-m fw-normal fst-italic pt-5"
          style={{ color: "#FF6666" }}
        >
          Choose price:
        </p>
        <div className={cx("filter-price", "pb-3")}>
          <input
            min={"0"}
            type="number"
            className={cx("select-filter", "form-control")}
            id="from"
            placeholder="From (VND)"
            value={priceFilter.min ? priceFilter.min : ""}
            onChange={(e) =>
              setPriceFilter({
                ...priceFilter,
                min: e.target.value,
              })
            }
          />

          <input
            min={"0"}
            type="number"
            className={cx("select-filter", "form-control")}
            id="to"
            placeholder="To (VND)"
            value={priceFilter.max ? priceFilter.max : ""}
            onChange={(e) =>
              setPriceFilter({
                ...priceFilter,
                max: e.target.value,
              })
            }
          />
        </div>

        <button
          onClick={() => setDefaultStates()}
          className={cx("btn-apply", "shadow my-2 ms-2")}
          style={{ background: "#847171" }}
        >
          Clear <MdOutlineClearAll></MdOutlineClearAll>
        </button>

        <button
          onClick={() => handleSubmit()}
          className={cx("btn-apply", "shadow my-2")}
          disabled={isLoading}
          // disabled={
          //   priceFilter.min != null && priceFilter.min >= priceFilter.max
          //     ? true
          //     : false
          // }
        >
          Search <BiSearch></BiSearch>
        </button>
      </div>
    </Modal>
  );
}

export default ModalFilter;
