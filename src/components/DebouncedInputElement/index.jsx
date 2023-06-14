import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function DebouncedInputElement({
  input = "input",
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
      if (value !== initialValue) onChange(value.trim());
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, initialValue, onChange, value]);

  return (
    <>
      {input === "input" ? (
        <input
          {...props}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <textarea
          {...props}
          defaultValue={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
    </>
  );
}

DebouncedInputElement.propTypes = {
  value: PropTypes.string.isRequired,
  input: PropTypes.string,
  onChange: PropTypes.func,
  debounce: PropTypes.number,
};

export default DebouncedInputElement;
