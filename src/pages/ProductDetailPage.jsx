import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import DetailProductContent from "../components/DetailProductContent";
import { UserContext } from "../contexts/UserContext";
import { API, setAuthToken } from "../services/API";
import Loading from "../components/Loading";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const { dispatch } = useContext(UserContext);

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
    getProduct();
  }, [id, dispatch]);

  return (
    <>
      {loading && <Loading />}
      {error && <p>error</p>}

      {product.name && (
        <Container>
          <DetailProductContent product={product} />
        </Container>
      )}
    </>
  );
};

export default ProductDetailPage;
