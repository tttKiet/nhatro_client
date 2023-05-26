import { useEffect, useState } from "react";
import PropTypes from "prop-types";

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
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

DebouncedInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  debounce: PropTypes.number,
};

export default DebouncedInput;
