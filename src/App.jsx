import { useState } from "react";
import { userServices } from "./services";

function App() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sdt, setSdt] = useState("");
  const [address, setAddress] = useState("");
  const [message, setmessage] = useState("");

  async function register() {
    const data = {
      fullName: fullName,
      email: email,
      password: password,
      sdt: sdt,
      address: address,
    };
    console.log(data);
    const res = await userServices.createUser(data);
    console.log("res: ", res);
    if (res.err === 0) {
      setmessage(res.message);
    }
  }

  return (
    <div>
      <div>
        <label>Full name:</label>
        <input
          type="text"
          value={fullName}
          onChange={(ev) => setFullName(ev.target.value)}
        />
      </div>
      <div>
        <label>email:</label>
        <input
          type="text"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
      </div>
      <div>
        <label>password:</label>
        <input
          type="text"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
      </div>
      <div>
        <label>sdt:</label>
        <input
          type="text"
          value={sdt}
          onChange={(ev) => setSdt(ev.target.value)}
        />
      </div>
      <div>
        <label>address:</label>
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
        />
      </div>
      <p>{message}</p>

      <button type="button" onClick={register}>
        Đăng ký
      </button>
    </div>
  );
}

export default App;
