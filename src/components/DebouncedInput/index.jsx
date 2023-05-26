import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classNames/bind";
import styles from "./DebouncedInput.module.scss";
const cx = classNames.bind(styles);

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className={cx("wrap")}>
      <input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className={cx("search")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
    </div>
  );
}

DebouncedInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  debounce: PropTypes.number,
};

export default DebouncedInput;
