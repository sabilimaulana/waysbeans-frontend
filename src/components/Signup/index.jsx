import { useContext, useEffect, useState } from "react";
import styles from "./Signup.module.css";
import axios from "axios";
import { API, setAuthToken } from "../../services/API";
import { UserContext } from "../../contexts/UserContext";

// import "bootstrap/dist/css/bootstrap.min.css";
// import { Modal, Button } from "react-bootstrap";

const Signup = ({ showModal, onHide, onHere }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(UserContext);

  const [emailWarning, setEmailWarning] = useState(false);
  const [signupWarning, setSignupWarning] = useState(false);
  const [signupApiWarning, setSignupApiWarning] = useState("");

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

  const isEmail = (email) => {
    if (email === "") {
      setEmailWarning(false);
      return;
    }
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const res = emailRegex.test(email);
    if (res) {
      setEmailWarning(false);
    } else {
      setEmailWarning(true);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!password || !fullname || !email) {
      setSignupWarning(true);
      return;
    }

    setSignupWarning(false);

    axios
      .post("http://localhost:8080/api/v1/register/", {
        email,

        password,
        fullname,
        listAs: "Customer",
        // phone: phoneNumber,
      })
      .then(async (response) => {
        setFullname("");
        setEmail("");
        setPassword("");

        setEmailWarning(false);
        setSignupWarning(false);
        setSignupApiWarning("");
        const userData = response.data.data.user;

        sessionStorage.setItem("token", userData.token);

        setAuthToken(userData.token);

        const user = await API.get("/user/profile", {
          headers: { Authorization: `Bearer ${userData.token}` },
        });

        // console.log(user);
        dispatch({
          type: "LOGIN",
          payload: {
            user: user.data.data.user,
          },
        });

        document.body.style.overflow = "unset";
        onHide();
      })
      .catch(function (error) {
        setSignupApiWarning(error.response.data.message);
        console.log(error.response.data);
      });
  };

  return (
    showModal && (
      <>
        <div className={styles.signupModal}>
          <form className={styles.signupForm}>
            <p className={styles.modalTitle}>Register</p>

            {/* 
            <label className={styles.inputLabel}>Username</label>
            <input
              className={styles.inputField}
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            /> */}

            <input
              className={styles.inputField}
              style={{
                border: emailWarning
                  ? "2px solid red"
                  : "2px solid var(--main-font-color)",
              }}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => isEmail(email)}
            />

            <input
              className={styles.inputField}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <input
              className={styles.inputField}
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value);
              }}
            />

            <p className={styles.signupWarning}>{signupApiWarning}</p>
            {signupWarning && (
              <p className={styles.signupWarning}>
                Silahkan isi semua input field
              </p>
            )}
            <input
              type="submit"
              className={styles.signupButton}
              value="Register"
              onClick={handleSignup}
            />
            <div className={styles.centerWrapper}>
              <p className={styles.signinText}>
                Already have an account ? Click
                <label
                  className={styles.hereButton}
                  onClick={() => {
                    onHide();
                    onHere();
                  }}
                >
                  Here
                </label>
              </p>
            </div>
          </form>
        </div>
        <div className={styles.background} onClick={onHide}></div>
      </>
    )
  );
};

export default Signup;
