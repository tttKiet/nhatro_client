import Image from "react-bootstrap/Image";
import testImage from "../../assets/images/trees.png";
import { MdPlayArrow } from "react-icons/md";
import Like from "../../assets/svg/like.svg";

import { useState } from "react";
import Comment from "../Comment";

// scss
import styles from "./Post.module.scss";
import classNames from "classNames/bind";
import CommentInput from "../CommentInput";
const cx = classNames.bind(styles);

function Post() {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className={cx("wrap")}>
      <div>
        <header className={cx("header")}>
          <div className={cx("avatar")}>
            <div className={cx("img")}>
              <Image src={testImage} />
            </div>
          </div>
          <div className={cx("info")}>
            <div className={cx("user")}>
              <span className={cx("space")}>
                <MdPlayArrow />
              </span>
              <div className={cx("name")}>Bui Kiet</div>
            </div>
            <div className={cx("time")}>
              <span>3 minus before</span>
            </div>
          </div>
        </header>
        <main className={cx("main")}>
          <div className={cx("content")}>
            <p className={cx("description")}>
              Each breakpoint was chosen to comfortably hold containers whose
              widths are multiples of 12. Breakpoints are also representative of
              a subset of common device sizes and viewport dimensions—they don’t
              specifically target every use case or device. Instead, the ranges
              provide a strong and consistent foundation to build on for nearly
              any device. These breakpoints are customizable via Sass—you’ll
              find them in a Sass map in our _variables.scss stylesheet. Each
              breakpoint was chosen to comfortably hold containers whose widths
              are multiples of 12. Breakpoints are also representative of a
              subset of common device sizes and viewport dimensions—they don’t
              specifically target every use case or device. Instead, the ranges
              provide a strong and consistent foundation to build on for nearly
              any device. These breakpoints are customizable via Sass—you’ll
              find them in a Sass map in our _variables.scss stylesheet. Each
              breakpoint was chosen to comfortably hold containers whose widths
              are multiples of 12. Breakpoints are also representative of a
              subset of common device sizes and viewport dimensions—they don’t
              specifically target every use case or device. Instead, the ranges
              provide a strong and consistent foundation to build on for nearly
              any device. These breakpoints are customizable via Sass—you’ll
              find them in a Sass map in our _variables.scss stylesheet.
            </p>
          </div>
          <div className={cx("images", "layout_4")}>
            <div className={cx("img")}>
              <Image
                src={
                  "data:image/png;base64,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"
                }
              />
            </div>
            <div className={cx("img")}>
              <Image
                src={
                  "data:image/png;base64,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"
                }
              />
            </div>
            <div className={cx("img")}>
              <Image
                src={
                  "data:image/png;base64,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"
                }
              />
            </div>
            <div className={cx("img")}>
              <Image
                src={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASsAAACoCAMAAACPKThEAAABNVBMVEUIxLP///8CZ2EBqZwk4cUAybcIxbH//v9UamhJZmQIxrQArJxmhIIAWVSdn6Dd3d0AQz7Gv78V5seQkJF7hYMAaWAAmItee3kQ1bvSzc6Lk5ERQj8wS0rI+u8RMzEk5cnu6+oAindulIt+fn4zMzPz8/MhgXEdk4M/amMJT0shZlwAppAAZlmDmZTu7u7Hx8diYmKwsLAyWFSoqKjY2NgIvKkRi4AAXlUbcWUJvawFZmQATkYAbkAROTQZXFJRUVFCQkI8eXIxXldohHszhXUFKCJPb2gHcWAAsZUAgW9Ab2UChWsQlYoEGxISGh4RKi4ARDsSSUgMPD5DVlWDpp6gx78ALSUTg3236t0BrqUIU1SPsKew185qamoESTUAWDEAQBc8V0k+TUgdHR0FOytISEgAGxsvkgBVAAAPlklEQVR4nO2dC1fbRhbHZckzpqMKGztSIEoss37FMYU4IMmSa5Km2wJddotJG0q7pN1Xv/9H2HnoaUu2ZeSEwPw5nGPLRhr9dOfOnTsPBIGLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL614KCgCiWwngHwF96vv4CIJo95svb6tvuhB+6htZv5Dzdqdwa5V2Xjmf+k7WLgjetm9PCv8U3sL7Xg+BdnB7q6K4drr3vBZCMMwFFdE399uqMKsv8gFVKhU2wKe+mzUrL1ZYG+CeV0LOanlxVstrilWJs0rXA7arzKWNs9rZPCw/EFbQFBDMFuVEWTWe9yHsPspGKKy1nxcrQf6Q1bQirPb3qoZRNLYfs7ftQW2xBpEO0mfGCsijjH2yCKvadpHI6NO+dHm4vYxeND5PVrj6YVgoU4kjrH4wikw18u7b4jIyio8/S1YAowLA6TlZLCvC6q8+qybpsgyrxlxKPqzhZ8cKIcHRTuX33zly/SxLbiTCaoPBMeAhcdjfLofK+P4zYgUFCAUgabByYiJsV5qaqQsbYbXVp3iMkzZhdXSyXV2s7ZOjhawQLeTcWwAge7SzgnDFc2DnWMOY8Ott6wRkcu7RmKF2ahhG9WyLhQKNzUeLtRm69nS7kvdenM0xdSicHItmNje7mhDae28CgPC1EARXZ2Bl314qDH44O3l8xNKcS6q0OL6CLwzj9CqVFQTqtrH9Yr2GRUZQBMeCclDpkPa3rDmk9fdxkNavFo3OHLvq4Kiu66zXrrAPl7/rYpMKL5v5HB+B1flpcR4r5FBW8nrtSjBlE0YLiIhzp1raZ62TlVca7RSz6IBUeXbF3uQFJyrc+CHp731mU5C1JVDWroZDdTgcWpJJff3iZ7VGVkA7rhP9w8Qs2MtE/UhZ/Uhe6kNzDYEHZoRkJ4ABBdNSenrPtkVRdBXycijBJcwrwqq8mpJZ4WfnfhBVXBpxQljRVymirGz60h7L+Tt5CM7swGABPFcue6Krxko0IU8pA6t65aKSWRd/ptgVvBq5Xjkwq+qLdFR2B/v+rkJfq2LdRLmOB5HoTlM8DhABbTLxLxyjpVxSWvOuHWH1dM6jT5Wqp7G6DJ4Zsau5rIhdKV7JlU7OPgsCWfBOiYCpTCKEXNF1wzuxdWt+SLwmVhBJEzFiV/PqoMtY+Sec5MsKgu5FcLNWXVR9OrhEimLbEXBqrzfXXa7LrqDW87+iaLg7cDznHMNqsdrxWYm9nO0K7AUVyw7KJCr6eDK07Nrmo3fYy3uwRLHenxPLr4sVkoJyqRVY3O3NOcflafE0cCK5s5K8ABQ5E+95uEq914XFqmHs0i7aUe1pxbu4i+thKqyPwAp/ZzzPrFy1dxnxIr1sHdoFAnaXTC7DBTJ1ZjqiMh4ig6UJCCvaSdvZuPAuPzlLvf7HYBVzoUmwsO9YDyuInD3ghaC6zQqhH0PDyzd5dkV18NSmhVArVprPys5KjTW2y7Dy/mruKUPlaleO49do5pRc7JHCxFyUVaHwyKuIuiYkT7zLworcktLr2bFjS7JaXnmyAtYVS3yCIfUCrqJvG9VEVrgqbo3pHbl1M+VsWezKHT396eeff3qqhIfWwSo3VAL8B+MO+hXmqnrb0XRv3K6w13rPXFpKETKwUsWLr55RPR4F/ueO25Ufr9dxnXBd5WIqAz7FqrBDLUscXSXCmssq7pFdxUP17NlGUA/TWVWU1ZSjXaERLREEQ8Ul7W0dVOewImnLLdYc6omTX+eysmO01ImP6tkvF+4iVlpzczW9yo0V0vbouZCj07KOTWOuXZUwrUfEv6jKMKkQc1ipk4oSbaHsLwNWz75YzGrV2c2Pc2MFNJNWZ2xWpKhKZ3poaqYOYg9PKaiXZkIveg6rnnqtKKFlqcpPIavHC+vgJ2cFkeC1Z5CZVX12xG6GFY6zLki0p5wllCKdlaJcy1LFDqKfGKvv7z4rQdBEkjdAwvmv9NFrMyOeSXZVeMeSbgkZhxRWqmj3JFmSJD3isl6FrJ6uyioY90kdKsqNFbBlVgVZiDNOGAlOsKvCFm3kK9LSrFxxLF1LEoUVYKn87KP6bZSVVQRNiSmNVm6sEKmCOBSFY5p/mfFWKawK9I6TvHuaXemSJ00P+dV/Yaj+qatZWS2v3Fg5FosYNPJg1TFMY1UqDGJLR2rUDhPSaEmsMIhLTWao5Gvt0iNFwPyGaf3y1VhcHIv6rMqtN4WD1mv8+5K8HRy/8DUiBW2/abULrVZ5v9Vq58xKZpljeEU7zfpsFfTzDIPD2MM6IP1CHIstxcpVLy1ZCnQ+Dj8YVd6+qtiRqGshq4iVk8H/zaLBZkIY1X45/vFOO1dWSNulZyLuCj/9YcJcFmZXU6gKbdqHnsgzQUOiXU0611JEllfl2NCH6y6VZ/BZtZivKrGXhc1tv6CM1evQ/JvlfO3K6ysB2tlSuoms2j6qqPP8gv3BYlYk7XwSQyVdd1gqzg2qaAZWr8My3MRYGZTVy5BVLV9W4IwNZUPKajIds5OnZX3YOBgczjQyN5SVNVOOGVaqqNhxVNhpDVM7wgtZTa24C1kVKavZBXm5sbIlahkmTU/rs6yM4e9ff/1HbbY9btI7m20IZ+3K7l1LchzV9bUdg+Wqy7OKzAHfTLCrcljSwX6urKDFejgmbcj1mWawuv3ha6x/xTm12+1Sjd0ZKwcKxwzjrAiEiSwlCPd2InVPGfu8FrJ6E5Yj7q+MdfsryE5EWamTv8zoyyRWNdx7f81u0s/nBHcVZ7VHYtBEyT3fpauuaB8X6+qSdtWKlGM+q8NGrqyAQv0VclgdTIg6/41R/f4kdohaeawORmbfTtuVrkmJdnUt9XxLcu1J0djWl2Q1pWlWs8rNrvYkeiaHuo/K0dRlMJX9f//xR7M5e3yD+hmLjtgDO5y/GWWF+9f6ebJZEdGuAg3rto1iFeqU3UJWkSXCcX/FfPvO2vyVILOEHYsZRolLlRvtQuNmxrlTVso5KQcUNJRYB12xYiUaFauF0phZVp3mrKvyBR2rylAHqb+qGkzV6ul6/RVyaEoGUVauXUtiRcyoPGVZpTatMj2JenXoJLMSe8PpaCFaC+VzepJLkyRiydSWCgnGFrG6KQxaTfx7U6iRUGvw9rmvV8SF3OwftVqFI9wBKv8nX7sCmkrLAzr0EW8ks8KahnVE4/Y6+VuIzHp4U1FWIzHdqqi0sStO+n7O2rB6uBB3t+9s9rxaRIopvk/fWgHDilbDGh1MYH1n6IxAkr96Yy9AJclWpRfpK1SveqJ7Z1khwV/yRn3HaJB+yaOYZT0laO0hZCcxhUTfvoAUgXV1HB0JMY6Vu2tXCFxRhwXBMe2XvZtzzZ3IQsAd1idijSjsJscMrxaZFdGwH4t/j+8uKwg6FsuLWkpi1BCqVDgIwyzaCooVFq2D7yL3FGW1BCpJEk+jg9zFySJWlU4geqmXrw8KN68b+Jd+4Un48XG+ORkByX44STNw7jzDKjRKHrWjComMvLQocuzICbOykiUFRg1r+8cFrPYMP0ownuO3kYd7QNq9r4xAXboOKD+7EpCflWFjXqOtebB8vaMh5Nihk7ZQbPZ7ZruSrkfbEVbG7kJWfktAWU3nYL4Kz5QzKxItnDMH7bCpV/oSuwxt0oSz63WcwQW8FStJOo7AMjrLsipSVs2wvIPGmlkJ5n9pG4aASg3LfrkQlTeh4ZKF/KivxNivwEo6LhqrsprWGlnhSqixIkGhLtLM3HTnb1rlS9oz+ZXNhUaCHFv5sgqr634IKyurozDqY/5qnXYFkeXdZZdldkdTPZ1SNAbF3R2SLFddUWe3IJhyrCxZYwYm7UUwjTAjq4/pr4i/8UYYwAtaC93RPMs60lnKaewln8GoHxtQXY2VdD40itVsvv0T+CscNuz6Z/NySPa7aCLrYD/y5pDNZxMrXqYdIhvEZoCsyEq2vGHcO+yvaDGg7PdVLikJV6xshlf3ltWSqlh+SVtAbHo0tIIQ9wWnF2NFWM1JMszCuupSy6pawXjRIlZVwiqar1q/XeE49O+ONw/Z1OlwMHZaejDOfOgbWbk5ZplMd8RyxxBHZSdTJVmVlSSptLdjWIvsqlr18lXVKX+1Sf2Vn84yqt2c43avHCotFkLI9GcbuCO9xtqYQ1oH24ONiu1/NGRrAcjXp1fnrBQzMMsSCSzDCgwlJX/1bbAJ6RMG6M3/yu03b9r7LfJQD8OPH5fWYFfYQzvsnnGlmgSTgu1KZaM5OGgOtjab78ajYGBqHIwKmsJMOWL+ijisZKclS7Isy7H3GJaJzWE3mRW4Rd853wWE6IOXBibVqhKZXmCz+anhAVXRgyABVuSZM0VYXVpnFpHXlb3CGoZSmfb29lQ2Vm/b4p9nZ7uj5DoIV2eV7/pB7Nbfex0Vso9FJcImtlyDROvDwJbAVcJU5Oi61COmxUtRG41yY9G6VG2pnmqC3ua6Hofeo2n650TA0nvq9OIPOlNDV2T/BpDQT1p5vbb1zjBlMGCucH1uD3Nf8QzNP2V/hAEBaFWo34pOsXZ/1UUpQsdeNA85V1YIDBsr7P5XKtRyXsNLZZ4FdgIRBNJwVO8FlVGp1MWuE27dgICcNLN2nXbl3Kxykp3OWnbwAbvDyD4WCACo7apKT1F6duf8OrLXAUYp/zdl64P17TmAzC/Ss7YpKm3mvdo5QHAS3T3Gy+P5G0TEkgnOeynFsNfHCsczu8+bT7LoZthf0z7BZPuK/lTT5s2AiW8Pbtog1bDXuJcFhHQHkiz/XwBk3Zoxk05GNCWcWsdxeeX3s1MfA0VYtRuNwn5jv9DAv+VGu9RotMkhdrhBDzfo4VK7US4F326nsbprQkBwKlpKy0FneKjJPt1XhNVBs1YYNA8LteZWodk8ajeb++VmM3L4IPHw0WfCCtLZCbYpmyBhrQ0Jqfa6aO6mZg9n31ov6Qf6FzYwHVLhyYYpFKFgOvJ3orBo55+Hw4oJO0TsvEfjvjnsCqamQcnahRcX2jJbJD00VrjFIfsbCoLTPYOyZQHNkshsSZiyHjyqh8aKFRGRIALRwVZvwHWZ5vehsbqNOKvlFWE1aL0s1FrNwk3rsNBqHey3Wg0y5y7x8OEDZ8XtaoE4q+XFWS0thFnd5v9xxFl96rtZq3CU8TY3Vs/vt1lhVp2k5dGrqLGmNN1dEbYEs0mH80u3ETXNZspOSPdJ2pNcKmFNu+f/Jk4gptV/Xtu6rTZ/kO53DWTCPstkQ/ArS5Kd3AdA765u9394Hw4nLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi6uz17/B7IgGtebg21sAAAAAElFTkSuQmCC"
                }
              />
            </div>
          </div>

          <div className={cx("info_post")}>
            <div className={cx("info_post-item")}>
              <div className={cx("img")}>
                <Image src={Like} />
              </div>
              1k2
            </div>
            <div className={cx("info_post-item")}>860 comment</div>
          </div>
        </main>
        <footer className={cx("footer")}>
          <div className={cx("actives")}>
            <button type="button" className={cx("active", "col-4", "liked")}>
              <div>
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
                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                  />
                </svg>
              </div>
              <span>Like</span>
            </button>
            <button
              type="button"
              onClick={() => setShowComments(true)}
              className={cx("active", "col-4")}
            >
              <div>
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
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
              </div>
              <span>Comment</span>
            </button>
            <button
              type="button"
              className={cx("active", "favorited", "col-4")}
            >
              <div>
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
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
              </div>
              <span>Favourites</span>
            </button>
          </div>
        </footer>
        {showComments && (
          <div className={cx("comment")}>
            <div className={cx("comment_layout")}>
              <Comment />
              <Comment />
            </div>
          </div>
        )}

        <div className={cx("input_comment")}>
          <CommentInput />
        </div>
      </div>
    </div>
  );
}

export default Post;
