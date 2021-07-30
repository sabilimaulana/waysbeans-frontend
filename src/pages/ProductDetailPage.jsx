import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import DetailProductContent from "../components/DetailProductContent";
import { API } from "../services/API";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

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
          <DetailProductContent product={product} />
        </Container>
      )}
    </>
  );
};

export default ProductDetailPage;
