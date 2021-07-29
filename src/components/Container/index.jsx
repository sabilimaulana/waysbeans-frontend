import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { API, setAuthToken } from "../../services/API";
import Navbar from "../Navbar";
import styles from "./Container.module.css";

const Container = ({ children }) => {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (token) {
          setAuthToken(token);
          const user = await API.get("/user/profile");
          dispatch({
            type: "LOGIN",
            payload: {
              user: user.data.data.user,
            },
          });
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    getUser();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>{children}</div>
    </>
  );
};

export default Container;
