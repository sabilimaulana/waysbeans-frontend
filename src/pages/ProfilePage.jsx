import { useContext, useEffect, useState } from "react";
// import ProfileContent from "../../components/ProfileContent";
import { UserContext } from "../contexts/UserContext";
// import Loading from "../../components/Loading";
import { Redirect } from "react-router";
import ProfileContent from "../components/ProfileContent";
import { API, setAuthToken } from "../services/API";
import Container from "../components/Container";
import Loading from "../components/Loading";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);

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
          setError(false);
        }
        setLoading(false);
      } catch (error) {
        console.log(error.response);
        setLoading(false);
        setError(true);
      }
    };

    getUser();
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  if (state.isLogin) {
    return (
      <Container>
        <ProfileContent state={state} />
      </Container>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Profile;
