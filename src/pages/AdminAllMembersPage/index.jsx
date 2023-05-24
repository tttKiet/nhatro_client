import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks";
import styles from "./AdminAllMembersPage.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function AdminAllMembersPage() {
  const [, , dataAdmin] = useAuth();
  const { id } = useParams();
  if (dataAdmin.type != "admin" || dataAdmin._id != id) {
    return <h1>Loi roi</h1>;
  }

  return (
    <div className={cx("wrap")}>
      <div className="container">
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
        <div className="row mt-5">
          <div className={cx("table-wrap", "col-md-12")}>
            <table className="table align-middle mb-0 bg-white">
              <thead className="bg-light">
                <tr className="fs-m">
                  <th>Information</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Room's number</th>
                  <th>Start date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://catscanman.net/wp-content/uploads/2021/09/anh-meo-ngau-13.jpg"
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3 fs-m">
                        <p className="fw-bold mb-1 ">The Van</p>
                        <p className="text-muted mb-0 ">thevan@gmail.com</p>
                        <p className="text-muted mb-0">012345678</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">Ninh Kieu, Can Tho</p>
                  </td>
                  <td>
                    <span className="badge text-bg-warning rounded-pill d-inline">
                      Not pay
                    </span>
                  </td>
                  <td>12</td>
                  <td>10/10/2023</td>
                  <td>
                    <button
                      style={{ minWidth: "60px" }}
                      type="button"
                      className="btn btn-primary btn-sm me-2"
                    >
                      Edit
                    </button>
                    <button
                      style={{ minWidth: "60px" }}
                      type="button"
                      className="btn btn-danger btn-sm "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://catscanman.net/wp-content/uploads/2021/09/anh-meo-ngau-13.jpg"
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3 fs-m">
                        <p className="fw-bold mb-1 ">The Van</p>
                        <p className="text-muted mb-0 ">thevan@gmail.com</p>
                        <p className="text-muted mb-0">012345678</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">Ninh Kieu, Can Tho</p>
                  </td>
                  <td>
                    <span className="badge text-bg-success rounded-pill d-inline">
                      Paid
                    </span>
                  </td>
                  <td>12</td>
                  <td>10/10/2023</td>
                  <td>
                    <button
                      style={{ minWidth: "60px" }}
                      type="button"
                      className="btn btn-primary btn-sm me-2"
                    >
                      Edit
                    </button>
                    <button
                      style={{ minWidth: "60px" }}
                      type="button"
                      className="btn btn-danger btn-sm "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://catscanman.net/wp-content/uploads/2021/09/anh-meo-ngau-13.jpg"
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3 fs-m">
                        <p className="fw-bold mb-1 ">The Van</p>
                        <p className="text-muted mb-0 ">thevan@gmail.com</p>
                        <p className="text-muted mb-0">012345678</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">Ninh Kieu, Can Tho</p>
                  </td>
                  <td>
                    <span className="badge text-bg-warning rounded-pill d-inline">
                      Not pay
                    </span>
                  </td>
                  <td>12</td>
                  <td>10/10/2023</td>
                  <td>
                    <button
                      style={{ minWidth: "60px" }}
                      type="button"
                      className="btn btn-primary btn-sm me-2"
                    >
                      Edit
                    </button>
                    <button
                      style={{ minWidth: "60px" }}
                      type="button"
                      className="btn btn-danger btn-sm "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAllMembersPage;
