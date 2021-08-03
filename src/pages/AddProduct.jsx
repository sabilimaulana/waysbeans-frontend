import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import AddProductContent from "../components/AddProductContent";
import Container from "../components/Container";
import Loading from "../components/Loading";
import { UserContext } from "../contexts/UserContext";
import { API, setAuthToken } from "../services/API";

const AddProduct = () => {
  const { dispatch, state } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
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
          setLoading(false);
          setError(false);
        }
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

  if (state.user.listAs === "Seller") {
    return (
      <Container>
        <AddProductContent />
      </Container>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default AddProduct;
