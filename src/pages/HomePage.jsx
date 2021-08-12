import { useContext, useEffect, useState } from "react";
import Container from "../components/Container";
import HomeContent from "../components/HomeContent";
import Loading from "../components/Loading";
import OwnerContent from "../components/OwnerContent";
import { UserContext } from "../contexts/UserContext";
import { API, setAuthToken } from "../services/API";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);

  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const result = await API.get("/products");
        setProducts(result.data.data.products);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error.response);
      }
    };

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
    getProducts();
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  if (state.user.listAs === "Seller") {
    return (
      <>
        <Container>
          <OwnerContent />
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Container>
          <HomeContent products={products} />
        </Container>
      </>
    );
  }
};

export default HomePage;
