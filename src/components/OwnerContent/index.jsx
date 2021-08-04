import { useContext, useEffect, useState } from "react";
import styles from "./OwnerContent.module.css";
import { UserContext } from "../../contexts/UserContext";
import { API } from "../../services/API";
import TransactionDetailModal from "../TransactionDetailModal";

const OwnerContent = () => {
  const [detailTransactionModalShow, setDetailTransactionModalShow] =
    useState(false);
  const [transactions, setTransactions] = useState([]);
  const [focusTransaction, setFocusTransaction] = useState();

  const { state } = useContext(UserContext);

  const handleApprove = async (transactionId) => {
    try {
      await API.patch(`/transaction/${transactionId}`, {
        status: "On Process",
      });

      window.location.reload();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleCancel = async (transactionId) => {
    try {
      await API.patch(`/transaction/${transactionId}`, {
        status: "Cancel",
      });

      window.location.reload();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleOnTheWay = async (transactionId) => {
    try {
      await API.patch(`/transaction/${transactionId}`, {
        status: "On The Way",
      });

      window.location.reload();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleComplete = async (transactionId) => {
    try {
      await API.patch(`/transaction/${transactionId}`, {
        status: "Completed",
      });

      window.location.reload();
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    const getOrder = async () => {
      try {
        const result = await API.get(`/transactions/`);
        setTransactions(result.data.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    getOrder();
  }, [state.user.id]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Income Transaction</h1>
      <table className={styles.incomeTable}>
        <thead>
          <tr className={styles.tabelHead}>
            <th>No</th>
            <th>Name</th>
            <th>Address</th>
            <th>Zip Code</th>
            <th>Detail</th>
            <th>Status Payment</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index, array) => {
              return (
                <tr key={transaction.id}>
                  <td>{array.length - index}</td>
                  <td>{transaction.User.fullname}</td>
                  <td className={styles.tdAddress}>{transaction.address}</td>
                  <td>{transaction.zipCode}</td>

                  <td>
                    <button
                      onClick={() => {
                        setDetailTransactionModalShow(true);
                        setFocusTransaction(transaction);
                      }}
                      className={styles.detailTransaction}
                    >
                      Lihat Detail
                    </button>
                  </td>

                  {transaction.status === "Waiting Approve" && (
                    <td className={styles.pending}>Waiting Approve</td>
                  )}
                  {transaction.status === "Approved" && (
                    <td className={styles.approved}>Approved</td>
                  )}
                  {transaction.status === "Cancel" && (
                    <td className={styles.cancel}>Cancel</td>
                  )}
                  {transaction.status === "On Process" && (
                    <td className={styles.onProcess}>On Process</td>
                  )}
                  {transaction.status === "On The Way" && (
                    <td className={styles.onTheWay}>On The Way</td>
                  )}
                  {transaction.status === "Completed" && (
                    <td className={styles.completed}>Completed</td>
                  )}

                  <td className={styles.tdAction}>
                    {transaction.status === "Waiting Approve" && (
                      <>
                        <button
                          className={styles.buttonCancel}
                          onClick={() => handleCancel(transaction.id)}
                        >
                          Cancel
                        </button>
                        <button
                          className={styles.buttonApprove}
                          onClick={() => handleApprove(transaction.id)}
                        >
                          Approve
                        </button>
                      </>
                    )}

                    {transaction.status === "On Process" && (
                      <button
                        className={styles.buttonOnTheWay}
                        onClick={() => handleOnTheWay(transaction.id)}
                      >
                        On The Way
                      </button>
                    )}

                    {transaction.status === "On The Way" && (
                      <button
                        className={styles.buttonComplete}
                        onClick={() => handleComplete(transaction.id)}
                      >
                        Complete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                Belum ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <TransactionDetailModal
        showModal={detailTransactionModalShow}
        transactionData={focusTransaction}
        onHide={() => {
          setDetailTransactionModalShow(false);
        }}
      />
    </div>
  );
};

export default OwnerContent;
