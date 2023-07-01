import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks";
import styles from "./AdminAllMembersPage.module.scss";
import classNames from "classNames/bind";
import SearchBar from "../../components/SearchBar";
import { useTable, usePagination } from "react-table";

const cx = classNames.bind(styles);

function AdminAllMembersPage() {
  const [, , dataAdmin] = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page, // Instead of using 'rows', we'll use page,
      // which has only the rows for the active page

      // The rest of these things are super handy, too ;)
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 5 },
      },
      usePagination
    );

    // Render the UI for your table
    return (
      <>
        <table
          className="table align-middle mb-0 bg-white"
          {...getTableProps()}
        >
          <thead className="bg-light">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="fs-m">
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 15, 20, 25].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }

  if (dataAdmin.type != "admin" || dataAdmin._id != id) {
    navigate("/error/404");
  }

  const columns = [
    {
      Header: "Information",
      accessor: "information",
      Cell: ({ value }) => (
        <div className="d-flex align-items-center">
          <img
            src={value.avatar}
            alt=""
            style={{ width: "45px", height: "45px" }}
            className="rounded-circle"
          />
          <div className="ms-3 fs-m">
            <p className="fw-bold mb-1">{value.name}</p>
            <p className="text-muted mb-0">{value.email}</p>
            <p className="text-muted mb-0">{value.phone}</p>
          </div>
        </div>
      ),
    },
    {
      Header: "Address",
      accessor: "address",
      Cell: ({ value }) => <p className="fw-normal mb-1">{value}</p>,
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => (
        <span className="badge text-bg-warning rounded-pill d-inline">
          {value}
        </span>
      ),
    },
    {
      Header: "Room's number",
      accessor: "roomNumber",
    },
    {
      Header: "Start date",
      accessor: "startDate",
    },
    {
      Header: "Actions",
      Cell: () => (
        <div>
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
        </div>
      ),
    },
  ];

  const data = [
    {
      information: {
        name: "The Van",
        email: "thevan@gmail.com",
        phone: "012345678",
        avatar:
          "https://catscanman.net/wp-content/uploads/2021/09/anh-meo-ngau-13.jpg",
      },
      address: "Ninh Kieu, Can Tho",
      status: "Not pay",
      roomNumber: 12,
      startDate: "10/10/2023",
    },
    {
      information: {
        name: "The Van",
        email: "thevan@gmail.com",
        phone: "012345678",
        avatar:
          "https://catscanman.net/wp-content/uploads/2021/09/anh-meo-ngau-13.jpg",
      },
      address: "Ninh Kieu, Can Tho",
      status: "Not pay",
      roomNumber: 12,
      startDate: "10/10/2023",
    },
    {
      information: {
        name: "The Van",
        email: "thevan@gmail.com",
        phone: "012345678",
        avatar:
          "https://catscanman.net/wp-content/uploads/2021/09/anh-meo-ngau-13.jpg",
      },
      address: "Ninh Kieu, Can Tho",
      status: "Not pay",
      roomNumber: 12,
      startDate: "10/10/2023",
    },
    {
      information: {
        name: "The Van",
        email: "thevan@gmail.com",
        phone: "012345678",
        avatar:
          "https://catscanman.net/wp-content/uploads/2021/09/anh-meo-ngau-13.jpg",
      },
      address: "Ninh Kieu, Can Tho",
      status: "Not pay",
      roomNumber: 12,
      startDate: "10/10/2023",
    },
    {
      information: {
        name: "The Van",
        email: "thevan@gmail.com",
        phone: "012345678",
        avatar:
          "https://catscanman.net/wp-content/uploads/2021/09/anh-meo-ngau-13.jpg",
      },
      address: "Ninh Kieu, Can Tho",
      status: "Not pay",
      roomNumber: 12,
      startDate: "10/10/2023",
    },
    {
      information: {
        name: "The Van",
        email: "thevan@gmail.com",
        phone: "012345678",
        avatar:
          "https://catscanman.net/wp-content/uploads/2021/09/anh-meo-ngau-13.jpg",
      },
      address: "Ninh Kieu, Can Tho",
      status: "Not pay",
      roomNumber: 12,
      startDate: "10/10/2023",
    },
    {
      information: {
        name: "The Van",
        email: "thevan@gmail.com",
        phone: "012345678",
        avatar:
          "https://catscanman.net/wp-content/uploads/2021/09/anh-meo-ngau-13.jpg",
      },
      address: "Ninh Kieu, Can Tho",
      status: "Not pay",
      roomNumber: 12,
      startDate: "10/10/2023",
    },
    {
      information: {
        name: "The Van",
        email: "thevan@gmail.com",
        phone: "012345678",
        avatar:
          "https://catscanman.net/wp-content/uploads/2021/09/anh-meo-ngau-13.jpg",
      },
      address: "Ninh Kieu, Can Tho",
      status: "Not pay",
      roomNumber: 12,
      startDate: "10/10/2023",
    },
    {
      information: {
        name: "The Van",
        email: "thevan@gmail.com",
        phone: "012345678",
        avatar:
          "https://catscanman.net/wp-content/uploads/2021/09/anh-meo-ngau-13.jpg",
      },
      address: "Ninh Kieu, Can Tho",
      status: "Not pay",
      roomNumber: 12,
      startDate: "10/10/2023",
    },
    {
      information: {
        name: "The Van",
        email: "thevan@gmail.com",
        phone: "012345678",
        avatar:
          "https://catscanman.net/wp-content/uploads/2021/09/anh-meo-ngau-13.jpg",
      },
      address: "Ninh Kieu, Can Tho",
      status: "Not pay",
      roomNumber: 12,
      startDate: "10/10/2023",
    },
    {
      information: {
        name: "The Van",
        email: "thevan@gmail.com",
        phone: "012345678",
        avatar:
          "https://catscanman.net/wp-content/uploads/2021/09/anh-meo-ngau-13.jpg",
      },
      address: "Ninh Kieu, Can Tho",
      status: "Not pay",
      roomNumber: 12,
      startDate: "10/10/2023",
    },
    {
      information: {
        name: "The Van",
        email: "thevan@gmail.com",
        phone: "012345678",
        avatar:
          "https://catscanman.net/wp-content/uploads/2021/09/anh-meo-ngau-13.jpg",
      },
      address: "Ninh Kieu, Can Tho",
      status: "Not pay",
      roomNumber: 12,
      startDate: "10/10/2023",
    },
  ];

  return (
    <div className={cx("wrap")}>
      <div className="container">
        <SearchBar></SearchBar>
        <div className="row mt-5">
          <div className={cx("table-wrap", "col-md-12")}>
            {/* <table className="table align-middle mb-0 bg-white">
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
            </table> */}

            <Table columns={columns} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAllMembersPage;
