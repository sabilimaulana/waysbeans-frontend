import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import CheckoutContent from "../components/CheckoutContent";
import Container from "../components/Container";
import Loading from "../components/Loading";
import { UserContext } from "../contexts/UserContext";
import { API, setAuthToken } from "../services/API";

const CheckoutPage = () => {
  const [carts, setCarts] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { state, dispatch } = useContext(UserContext);

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

    const getCart = async () => {
      try {
        const result = await API.get(`/carts/`);

        setCarts(result.data.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    getUser();
    getCart();
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  if (state.user.listAs === "Customer") {
    return (
      <Container>
        <CheckoutContent cartsProps={carts} />
      </Container>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default CheckoutPage;
