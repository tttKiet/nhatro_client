import styles from "./NavUser.module.scss";
import classNames from "classNames/bind";
import logo from "../../../assets/images/logo.jpg"

const cx = classNames.bind(styles);
function NavUser() {
  return <div className={cx("wrap-all")}>
    <a href=""> <h2 className={cx("logo")}>Motel Future</h2></a>
   
    <nav className={cx("wrap-nav-user")}>
      <ul className={cx("wrap-list-nav")}>

        <li className={cx("item-nav")}>
          <a className={cx("text-nav-user")} href="">HOMEPAGE</a>
        </li>

        <li className={cx("item-nav")}>
          <a className={cx("text-nav-user")} href="">MOTEL</a>
        </li>

        <li className={cx("item-nav")}>
          <a className={cx("text-nav-user")} href="">ABOUT</a>
        </li>

        <li className={cx("item-nav")}>
          <a className={cx("text-nav-user")} href="">CONTACT</a>
        </li>
      </ul>
    </nav>
    <div className={cx("user")}>

      <a className={cx("user-item","notifications")} href="">
        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
      </a>

      <a className={cx("user-item","message")} href="">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      </a>

      <a className={cx("user-item","user")} href="">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
         </svg>
      </a>

   

    </div>
  </div>;
}

export default NavUser;