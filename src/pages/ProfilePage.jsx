import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
// import ProfileContent from "../../components/ProfileContent";
import { UserContext } from "../contexts/UserContext";
// import Loading from "../../components/Loading";
import { Redirect } from "react-router";
import ProfileContent from "../components/ProfileContent";
import { API, setAuthToken } from "../services/API";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

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
          console.log("profile", user);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.response);
      }
    };

    getUser();
  }, [dispatch]);

  if (loading) {
    return <p>loading</p>;
  }

  if (state.isLogin) {
    return (
      <>
        <Navbar />
        <ProfileContent state={state} />
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Profile;
