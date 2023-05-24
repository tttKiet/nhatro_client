import styles from "./AdminCard.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);
function AdminCard() {
  return (
    <div className={cx("wrap")}>
      <div className="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-3">
        <div className="col d-flex flex-column align-items-start gap-2">
          <h3 className="fw-bold fs-xxl">Thank you for used my services </h3>

          <p className="text-body-secondary fs-m">
            If you have any problems with my services or need update information
            for your bussiness, please contact with us. Always welcome!
          </p>
          <a href="#" className="btn btn-primary btn-lg fs-s p-1">
            Cotact now
          </a>
        </div>

        <div className="col">
          <div className="row row-cols-1 row-cols-sm-2 g-4">
            <div className="col d-flex flex-column gap-2">
              <div className={cx("feature-icon")}>
                <svg
                  width="2em"
                  height="2em"
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
                    d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                  />
                </svg>
              </div>
              <h4 className="fw-semibold mb-0">Member</h4>
              <p className="text-body-secondary">
                Currently, Your motel has 30 members
              </p>
            </div>

            <div className="col d-flex flex-column gap-2">
              <div className={cx("feature-icon")}>
                <svg
                  width="2em"
                  height="2em"
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
                    d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                  />
                </svg>
              </div>
              <h4 className="fw-semibold mb-0">Room</h4>
              <p className="text-body-secondary">
                Your motel has 100 rooms and it has 20 empty rooms
              </p>
            </div>

            <div className="col d-flex flex-column gap-2">
              <div className={cx("feature-icon")}>
                <svg
                  width="2em"
                  height="2em"
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
                    d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                  />
                </svg>
              </div>
              <h4 className="fw-semibold mb-0">Income</h4>
              <p className="text-body-secondary">100k $ per month</p>
            </div>

            <div className="col d-flex flex-column gap-2">
              <div className={cx("feature-icon")}>
                <svg
                  width="2em"
                  height="2em"
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
                    d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                  />
                </svg>
              </div>
              <h4 className="fw-semibold mb-0">Water / Electric</h4>
              <p className="text-body-secondary">
                Used over 100kW and 100 water per month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCard;
