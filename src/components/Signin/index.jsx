import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Signin.module.css";

import { UserContext } from "../../contexts/UserContext";
import { API, setAuthToken } from "../../services/API";

const Signin = ({ showModal, onHide, onHere }) => {
  // const [user, setUser] = useState({});
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const { dispatch } = useContext(UserContext);

  const [warning, setWarning] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();

    const data = {
      email: userInput.email,
      password: userInput.password.toString(),
    };
    try {
      const result = await API.post("/login", data);

      if (result.data.data.user.hasOwnProperty("token")) {
        const userData = result.data.data.user;

        setWarning("");
        setUserInput({ email: "", password: "" });
        sessionStorage.setItem("token", userData.token);

        setAuthToken(userData.token);

        const user = await API.get("/user/profile", {
          headers: { Authorization: `Bearer ${userData.token}` },
        });

        console.log(user.data.data);

        dispatch({
          type: "LOGIN",
          payload: {
            user: user.data.data.user,
          },
        });

        onHide();
        // window.location.reload();
      } else {
        setWarning(result.data.message);
      }
    } catch (error) {
      console.log(error);
      setWarning(error.response.data.message);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

  return (
    showModal && (
      <>
        <div className={styles.signinModal}>
          <form className={styles.signinForm}>
            <p className={styles.modalTitle}>Login</p>
            <input
              className={styles.inputField}
              type="text"
              value={userInput.email}
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) =>
                setUserInput({ ...userInput, email: e.target.value })
              }
            />
            <input
              className={styles.inputField}
              type="password"
              value={userInput.password}
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) =>
                setUserInput({ ...userInput, password: e.target.value })
              }
            />
            <Link to="/">
              <input
                type="submit"
                className={styles.signinButton}
                value="Login"
                onClick={handleSignin}
              />
            </Link>

            <div className={styles.centerWrapper}>
              {warning ? (
                <p className={styles.warning}>{warning}</p>
              ) : (
                <p className={styles.blank}>&nbsp;</p>
              )}
            </div>

            <div className={styles.centerWrapper}>
              <p className={styles.signupText}>
                Don't have an account? ? Click
                <label
                  className={styles.hereButton}
                  onClick={() => {
                    onHere();
                    setWarning("");
                    setUserInput({ email: "", password: "" });
                    onHide();
                  }}
                >
                  Here
                </label>
              </p>
            </div>
          </form>
        </div>
        <div
          className={styles.background}
          onClick={() => {
            setWarning("");
            setUserInput({ email: "", password: "" });
            onHide();
          }}
        ></div>
      </>
    )
  );
};

export default Signin;
