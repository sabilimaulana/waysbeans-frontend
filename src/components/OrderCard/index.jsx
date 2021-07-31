import {
  getDate,
  getDaysName,
  getFullYear,
  getMonthName,
} from "../../utils/dateUtils";
import { convertToRupiah } from "../../utils/moneyConvert";
import brandIcon from "../../assets/brand-icon.svg";

import styles from "./OrderCard.module.css";

const OrderCard = ({ order, isTransaction }) => {
  return (
    <div key={order.id} className={styles.cardItem}>
      {isTransaction ? (
        <>
          <img
            src={`http://localhost:8080/${order.Product.photo}`}
            alt="order"
            className={styles.cardItemImage}
          />
          <div className={styles.cardItemContent}>
            <div className={styles.cardItemContentLeft}>
              <p
                className={styles.productName}
              >{`${order.Product.name.toUpperCase()} Beans`}</p>
              <p className={styles.date}>
                <strong>{getDaysName(order.createdAt)}</strong>
                {`, ${getDate(order.createdAt)} ${getMonthName(
                  order.createdAt
                )}  ${getFullYear(order.createdAt)}`}
              </p>

              <p className={styles.productPrice}>
                Price: {convertToRupiah(order.Product.price)}
              </p>

              <p className={styles.orderQuantity}>
                Qty: {order.orderQuantity} pcs
              </p>
              <strong className={styles.totalPrice}>
                Total: {order.total}
              </strong>
            </div>

            <div className={styles.cardItemContentRight}>
              <img src={brandIcon} alt="brand" width="73" />
              <div className={styles.barcode}>barcode</div>

              <div className={styles.statusCard}>
                {order.status === "Approved" ? (
                  <div className={styles.statusSuccess}>
                    <p>Success</p>
                  </div>
                ) : order.status === "Cancel" ? (
                  <div className={styles.statusCancel}>
                    <p>Cancel</p>
                  </div>
                ) : (
                  <div className={styles.statusWaitingApprove}>
                    <p>{order.status}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        // dipake di halaman checkout
        <>
          <img
            src={`http://localhost:8080/${order.Product.photo}`}
            alt="order"
            className={styles.cardItemImage}
          />
          <div className={styles.cardItemContent}>
            <div className={styles.cardItemContentLeft}>
              <p
                className={styles.productName}
              >{`${order.Product.name.toUpperCase()} Beans`}</p>
              <p className={styles.date}>
                <strong>{getDaysName(new Date())}</strong>
                {`, ${getDate(new Date())} ${getMonthName(
                  new Date()
                )}  ${getFullYear(new Date())}`}
              </p>

              <p className={styles.productPrice}>
                Price: {convertToRupiah(order.Product.price)}
              </p>

              <p className={styles.orderQuantity}>
                Qty: {order.orderQuantity} pcs
              </p>
              <strong className={styles.totalPrice}>
                {`Subtotal: ${convertToRupiah(
                  +order.Product.price * +order.orderQuantity
                )}`}
              </strong>
            </div>

            <div className={styles.cardItemContentRight}>
              <img src={brandIcon} alt="brand" width="73" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderCard;
