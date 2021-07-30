import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "../components/Container";
import HomeContent from "../components/HomeContent";
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

    getProducts();
  }, [state]);

  // console.log(products);
  console.log("homestate", state);
  // console.log("title", state.user.listAs);
  if (state.isLogin) {
    console.log(state);
    if (state.user.listAs === "Seller") {
      return (
        <Container>
          <OwnerContent />
        </Container>
      );
    }
  }
  return (
    <Container>
      <HomeContent products={products} />
    </Container>
  );
};

export default HomePage;
