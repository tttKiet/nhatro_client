import { Suspense, lazy, useState } from "react";
import { MdOutlineNoteAdd } from "react-icons/md";
import ModalUpPost from "../../components/modal/ModalUpPost";
import { usePromiseTracker } from "react-promise-tracker";
const PostLazy = lazy(() => import("../../components/Post"));

// scss
import styles from "./PostPage.module.scss";
import classNames from "classNames/bind";
import Snipper from "../../components/Snipper";
import BarLoading from "../../components/BarLoader";

const cx = classNames.bind(styles);

function PostPage() {
  const [openModal, setOpenModal] = useState(false);
  const { promiseInProgress } = usePromiseTracker({ area: "up_post" });
  return (
    <>
      <div className={cx("wrap")}>
        <ModalUpPost show={openModal} setShow={setOpenModal} />

        <div className="container">
          <div className="row">
            <div className="col-12 position-relative">
              <div className={cx("banner", "d-none d-xxl-inline-block")}>
                <div className={cx("data")}>
                  <div className={cx("content")}>sadsa</div>
                </div>
              </div>
              <div className={cx("posts")}>
                {promiseInProgress && (
                  <div className={cx("bar_loading", "post")}>
                    <div className={cx("load")}>
                      Posting <span>...</span>
                    </div>
                    <BarLoading />
                  </div>
                )}
                <Suspense fallback={<Snipper color="#000" />}>
                  <PostLazy />
                </Suspense>
                <Suspense fallback={<Snipper color="#000" />}>
                  <PostLazy />
                </Suspense>
                <Suspense fallback={<Snipper color="#000" />}>
                  <PostLazy />
                </Suspense>
              </div>
            </div>
          </div>
        </div>

        <div className={cx("untils")}>
          <div className={cx("add")} onClick={() => setOpenModal(true)}>
            <MdOutlineNoteAdd />
          </div>
        </div>
      </div>
    </>
  );
}

export default PostPage;
