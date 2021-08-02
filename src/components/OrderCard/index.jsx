import {
  getDate,
  getDaysName,
  getFullYear,
  getMonthName,
} from "../../utils/dateUtils";
import { convertToRupiah } from "../../utils/moneyConvert";
import brandIcon from "../../assets/brand-icon.svg";

import styles from "./OrderCard.module.css";
import QRCode from "react-qr-code";

import TransactionDetailModal from "../TransactionDetailModal";
import { useState } from "react";

const OrderCard = ({
  orderCheckout,
  transactionOwner,
  transactionsCustomer,
}) => {
  const [detailTransactionModalShow, setDetailTransactionModalShow] =
    useState(false);
  const [focusTransaction, setFocusTransaction] = useState();

  return (
    <>
      {/* Dipakai di owner content */}
      {transactionOwner &&
        transactionOwner.TransactionProducts.map((product) => {
          return (
            <div key={product.id} className={styles.cardItem}>
              <img
                src={`http://localhost:8080/${product.photo}`}
                alt="order"
                className={styles.cardItemImage}
              />
              <div className={styles.cardItemContent}>
                <div className={styles.cardItemContentLeft}>
                  <p
                    className={styles.productName}
                  >{`${product.name.toUpperCase()} Beans`}</p>
                  <p className={styles.date}>
                    <strong>{getDaysName(transactionOwner.createdAt)}</strong>
                    {`, ${getDate(transactionOwner.createdAt)} ${getMonthName(
                      transactionOwner.createdAt
                    )}  ${getFullYear(transactionOwner.createdAt)}`}
                  </p>

                  <p className={styles.productPrice}>
                    Price: {convertToRupiah(product.price)}
                  </p>

                  <p className={styles.orderQuantity}>
                    Qty: {product.orderQuantity} pcs
                  </p>
                  <strong className={styles.totalPrice}>
                    {`Subtotal:
                    ${convertToRupiah(
                      +product.price * +product.orderQuantity
                    )}`}
                  </strong>
                </div>
                <div className={styles.cardItemContentRight}>
                  <img src={brandIcon} alt="brand" width="73" />
                </div>
              </div>
            </div>
          );
        })}

      {/* Dipakai di checkout content */}
      {orderCheckout && (
        <>
          <div key={orderCheckout.id} className={styles.cardItem}>
            <img
              src={`http://localhost:8080/${orderCheckout.Product.photo}`}
              alt="order"
              className={styles.cardItemImage}
            />
            <div className={styles.cardItemContent}>
              <div className={styles.cardItemContentLeft}>
                <p
                  className={styles.productName}
                >{`${orderCheckout.Product.name.toUpperCase()} Beans`}</p>
                <p className={styles.date}>
                  <strong>{getDaysName(new Date())}</strong>
                  {`, ${getDate(new Date())} ${getMonthName(
                    new Date()
                  )}  ${getFullYear(new Date())}`}
                </p>

                <p className={styles.productPrice}>
                  Price: {convertToRupiah(orderCheckout.Product.price)}
                </p>

                <p className={styles.orderQuantity}>
                  Qty: {orderCheckout.orderQuantity} pcs
                </p>
                <strong className={styles.totalPrice}>
                  {`Subtotal: ${convertToRupiah(
                    +orderCheckout.Product.price * +orderCheckout.orderQuantity
                  )}`}
                </strong>
              </div>

              <div className={styles.cardItemContentRight}>
                <img src={brandIcon} alt="brand" width="73" />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Dipakai di profile content */}
      {transactionsCustomer && (
        <>
          <TransactionDetailModal
            showModal={detailTransactionModalShow}
            transactionData={focusTransaction}
            onHide={() => {
              setDetailTransactionModalShow(false);
              setFocusTransaction();
            }}
          />

          {transactionsCustomer.map((transaction) => {
            return (
              <div
                key={transaction.id}
                className={styles.cardItemInteractive}
                onClick={() => {
                  setDetailTransactionModalShow(true);
                  setFocusTransaction(transaction);
                }}
              >
                {console.log(
                  transaction.id,
                  transaction.TransactionProducts[0].photo
                )}
                <img
                  src={`http://localhost:8080/${transaction.TransactionProducts[0]?.photo}`}
                  alt="order"
                  className={styles.cardItemImage}
                />
                <div className={styles.cardItemContent}>
                  <div className={styles.cardItemContentLeft}>
                    <div className={styles.productNameWrapper}>
                      <p className={styles.productName}>
                        {`${transaction.TransactionProducts[0].name.toUpperCase()} Beans`}
                      </p>

                      {transaction.TransactionProducts.length > 1 && (
                        <p className={styles.anotherProduct}>{`${
                          transaction.TransactionProducts.length - 1
                        }+ Others`}</p>
                      )}
                    </div>
                    <p className={styles.date}>
                      <strong>{getDaysName(transaction.createdAt)}</strong>
                      {`, ${getDate(transaction.createdAt)} ${getMonthName(
                        transaction.createdAt
                      )}  ${getFullYear(transaction.createdAt)}`}
                    </p>

                    <p className={styles.productPrice}>
                      Price:
                      {convertToRupiah(
                        transaction.TransactionProducts[0].price
                      )}
                    </p>

                    <p className={styles.orderQuantity}>
                      Qty: {transaction.TransactionProducts[0].orderQuantity}{" "}
                      pcs
                    </p>

                    {transaction.TransactionProducts.length > 1 ? (
                      <strong className={styles.totalPrice}>
                        {`Subtotal:
                            ${convertToRupiah(
                              +transaction.TransactionProducts[0].price *
                                +transaction.TransactionProducts[0]
                                  .orderQuantity
                            )}`}
                      </strong>
                    ) : (
                      <strong className={styles.totalPrice}>
                        {`Total:
                          ${convertToRupiah(transaction.total)}`}
                      </strong>
                    )}
                  </div>

                  <div className={styles.cardItemContentRight}>
                    <img src={brandIcon} alt="brand" width="73" />
                    <div className={styles.barcode}>
                      <QRCode
                        value={`http://localhost:8080/api/v1/transaction/${transaction.id}`}
                        size={60}
                        bgColor="#f7e6da"
                      />
                    </div>

                    <div className={styles.statusCard}>
                      {transaction.status === "Approved" ? (
                        <div className={styles.statusSuccess}>
                          <p>Success</p>
                        </div>
                      ) : transaction.status === "Cancel" ? (
                        <div className={styles.statusCancel}>
                          <p>Cancel</p>
                        </div>
                      ) : (
                        <div className={styles.statusWaitingApprove}>
                          <p>{transaction.status}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default OrderCard;
