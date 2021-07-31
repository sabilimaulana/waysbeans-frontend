import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CartContent from "../components/CartContent";
import Container from "../components/Container";
import { UserContext } from "../contexts/UserContext";
import { API, setAuthToken } from "../services/API";

const CartPage = () => {
  const router = useHistory();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [carts, setCarts] = useState([]);

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

    const getCart = async () => {
      try {
        setLoading(true);
        const result = await API.get("/carts");
        setCarts(result.data.data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log(error.response);
      }
    };

    getUser();
    getCart();
  }, [dispatch]);

  return (
    <>
      {loading && <h3>Loading</h3>}
      {error && <h3>Error</h3>}
      {!loading && (
        <>
          <Container>
            <CartContent cartProps={carts} />
          </Container>
        </>
      )}
    </>
  );
};

export default CartPage;
