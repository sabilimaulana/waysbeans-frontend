import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Container from "../components/Container";
import { UserContext } from "../contexts/UserContext";
import { API } from "../services/API";
import { convertToRupiah } from "../utils/moneyConvert";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const router = useHistory();

  const { state } = useContext(UserContext);

  const handleAddToCart = async () => {
    try {
      await API.post("/cart", {
        userId: state.user.id,
        productId: id,
        orderQuantity: 1,
      });

      router.push("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const result = await API.get(`product/${id}`);

        setProduct(result.data.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error.response);
      }
    };

    getProduct();
  }, [id]);

  return (
    <>
      {loading && <p>loading</p>}
      {error && <p>error</p>}

      {product.name && (
        <Container>
          <div>
            <img src={product.photo} alt="product" />
            <h3>{product.name.toUpperCase()} Beans</h3>
            <p>{product.stock}</p>

            <p>{product.description}</p>
            <p>{convertToRupiah(product.price)}</p>

            {state.isLogin ? (
              <button
                style={{ width: "200px", height: "50px", cursor: "pointer" }}
                onClick={handleAddToCart}
              >
                Add Cart
              </button>
            ) : (
              <button
                style={{
                  width: "200px",
                  height: "50px",
                  cursor: "not-allowed",
                }}
                disabled
              >
                Add Cart
              </button>
            )}
          </div>
        </Container>
      )}
    </>
  );
};

export default ProductDetailPage;
