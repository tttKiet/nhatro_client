import RoomCard from "../../components/RoomCard";
import SearchBar from "../../components/SearchBar";
import styles from "./AdminAllRoomsPage.module.scss";
import classNames from "classNames/bind";
import { useTable, usePagination } from "react-table";

const cx = classNames.bind(styles);

function AdminAllRoomsPage() {
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

  const columns = [
    {
      Header: "Room's number",
      accessor: "roomNumber",
    },
    {
      Header: "Size",
      accessor: "size",
    },
    {
      Header: "Has Layout",
      accessor: "hasLayout",
    },
    {
      Header: "Board houses",
      accessor: "boardHouse",
    },
    {
      Header: "Price",
      accessor: "price",
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
      roomNumber: 1,
      size: 4,
      hasLayout: "yes",
      boardHouse: 2,
      price: "2.000.000 VND/ Month",
    },
    {
      roomNumber: 2,
      size: 4,
      hasLayout: "yes",
      boardHouse: 2,
      price: "2.000.000 VND/ Month",
    },
    {
      roomNumber: 3,
      size: 4,
      hasLayout: "yes",
      boardHouse: 2,
      price: "2.000.000 VND/ Month",
    },
    {
      roomNumber: 4,
      size: 4,
      hasLayout: "yes",
      boardHouse: 2,
      price: "2.000.000 VND/ Month",
    },
  ];

  return (
    <div className={cx("wrap")}>
      <div className="row">
        <SearchBar></SearchBar>
      </div>
      <div className="row mt-5">
        <RoomCard></RoomCard>
      </div>
    </div>
  );
}

export default AdminAllRoomsPage;
