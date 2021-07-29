import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "../components/Container";
import OwnerContent from "../components/OwnerContent";
import { UserContext } from "../contexts/UserContext";
import { API, setAuthToken } from "../services/API";
import { convertToRupiah } from "../utils/moneyConvert";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);

  const { state, dispatch } = useContext(UserContext);

  const router = useHistory();

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

  const handleClickProduct = (id) => {
    router.push(`/product-detail/${id}`);
  };

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
      <ul style={{ listStyle: "none" }}>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <div
                style={{
                  // backgroundColor: "salmon",
                  padding: "10px",
                  width: "400px",
                  marginBottom: "10px",
                  borderRadius: "10px",
                  border: "2px solid black",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleClickProduct(product.id);
                }}
              >
                <img src={product.photo} alt="product" />
                <h3>Name : {product.name.toUpperCase()} Beans</h3>
                <p>Price : {convertToRupiah(product.price)}</p>
                <p>Stock :{product.stock}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default HomePage;
