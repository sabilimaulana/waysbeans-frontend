import styles from "./HomeContent.module.css";
import { convertToRupiah } from "../../utils/moneyConvert";
import jumbotron from "../../assets/jumbotron.svg";
import { useHistory } from "react-router";
import coffeBeanIcon from "../../assets/coffee-bean.png";

const HomeContent = ({ products }) => {
  // const { state, dispatch } = useContext(UserContext);

  const router = useHistory();

  const handleClickProduct = (id) => {
    router.push(`/product-detail/${id}`);
  };

  console.log(coffeBeanIcon);

  return (
    <div className={styles.homeContent}>
      <img
        className={styles.jumbotron}
        src={jumbotron}
        alt="jumbotron"
        width="100%"
      />
      <div className={styles.cards}>
        {products.map((product) => {
          return (
            <div
              className={styles.cardItem}
              onClick={() => {
                handleClickProduct(product.id);
              }}
              key={product.id}
            >
              <img
                src={product.photo}
                alt="product"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = coffeBeanIcon;
                }}
              />
              <div className={styles.cartContent}>
                <p className={styles.productName}>
                  {product.name.toUpperCase()} Beans
                </p>
                <p className={styles.cartContentSubtitle}>
                  {convertToRupiah(product.price)}
                </p>
                <p className={styles.cartContentSubtitle}>
                  {`Stock : ${product.stock}`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeContent;
