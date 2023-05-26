import styles from "./SearchBar.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);
function SearchBar() {
  return (
    <div className={cx("wrap")}>
      <div className={cx("search-filter", "mx-auto")}>
        <div className={cx("filter")}>
          <div className="btn-group">
            <button
              type="button"
              className={cx("btn-dropdown", "dropdown-toggle ", "fs-m")}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Choose filter
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Filter 1
                </a>
              </li>

              <li>
                <a className="dropdown-item" href="#">
                  Filter 2
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Filter 3
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="vr"></div>
        <div className={cx("search-box")}>
          <input
            className={cx("input-search")}
            type="search"
            placeholder="Type here to search..."
          />
          <button className={cx("search-btn", "btn btn-primary")}>
            <svg
              width={22 + "px"}
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
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
