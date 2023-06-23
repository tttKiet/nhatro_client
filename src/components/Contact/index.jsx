import styles from "./Contact.module.scss";
import { useFormik } from "formik";
import {useAuth} from "../../hooks"
import classNames from "classNames/bind";
import { feedbackService } from "../../services";

const cx = classNames.bind(styles);

function Contact() {

  const [,,inforUser] = useAuth();

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Please enter your title";
    }
    if (!values.content) {
      errors.content = "Please enter your content";
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: {  
      fullName: inforUser.fullName,
      email: inforUser.email,
      title: "",
      content: "",
    },
    validate,
    validateOnChange: false,
    onSubmit: (values) => {
      handleSubmit(inforUser._id ,values);
    },
    
  });

  async function handleSubmit(id,values) {
    const res = await feedbackService.createFeedback(id,values)
    if(res.err===0){
      alert("ok")
    }
    else{
      alert("cut")
    } 
  }


  return <div className={cx("wrap")}>
    <h3>You can conntact us here</h3>
    <ul className={cx("list-contact-item")}>
      <li>
        <div className={cx("wrap-item")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
        </div>
        

        <p>Address: 30/4, Ninh Kieu, Can Tho</p>
      </li>
      
      <li>
      <div className={cx("wrap-item")}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>

      </div>
        <p>Phone: 02220001011</p>
      </li>

      <li>
      <div className={cx("wrap-item")}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>

      </div>
        <p>Email:futurehome@gmail.com</p>
      </li>

      <li>
      <div className={cx("wrap-item")}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
        </svg>
      </div>
        <p>Website: futurehome.com</p>
      </li>
    </ul>
    <form onSubmit={formik.handleSubmit}>
      <div className={cx("wrap-contact-form")}>
      <div className={cx("left-contact")}>
        <div className={cx("left-item")}>
          <h4>Full Name:</h4>
          <span  className={cx("infor")}>{inforUser?.fullName}</span>
        </div>
        <div className={cx("left-item")}>
          <h4 >Email:</h4>
          <span className={cx("infor")}>{inforUser?.email}</span>
        </div>
        <div className={cx("left-item")}>
          <h4>Title:</h4>
          <input 
            type="text" 
            placeholder="Title"
            id="title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            />
           {formik.errors.title && formik.touched.title && (
                <span className={cx("err")}>{formik.errors.title}</span>
              )}
            
        </div>
        <div className={cx("left-item")}>
          <h4>Content:</h4>
          <textarea 
            type="text-aria" 
            placeholder="Message"
            id="content"
            name="content"
            onChange={formik.handleChange}
            value={formik.values.content}
            />
           {formik.errors.content && formik.touched.content && (
                <span className={cx("err")}>{formik.errors.content}</span>
              )}
        </div>
        <div className={cx("left-item")}>
          <button
           
           className={cx("btn")}
           type="submit"
           
           >Sent Message</button>
        </div>

        </div>
      <div className={cx("right-contact")}>
      <img src="https://originhr.in/wp-content/uploads/2022/06/support-img.png"alt="" />

      </div>
      </div>
    </form>

  </div>;
}

export default Contact;
