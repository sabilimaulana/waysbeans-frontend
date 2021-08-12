import { useContext, useEffect, useRef, useState } from "react";
import styles from "./CheckoutContent.module.css";
import paperClip from "../../assets/paper-clip.svg";
import closeIcon from "../../assets/close-icon.svg";
import OrderCard from "../OrderCard";
import { convertToRupiah } from "../../utils/moneyConvert";
import { UserContext } from "../../contexts/UserContext";
import { API } from "../../services/API";
import PayPopup from "../PayPopup";
import { useHistory } from "react-router-dom";

const CheckoutContent = ({ cartsProps }) => {
  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const { state } = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(false);

  const fileInput = useRef(null);

  const router = useHistory();

  const [rawAttachment, setRawAttachment] = useState();
  const [attachment, setAttachment] = useState();
  const [isAttachmentUploaded, setIsAttachmentUploaded] = useState();

  //input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [warning, setWarning] = useState("");

  const handleAttachment = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {
        setAttachment(e.target.result);
        setIsAttachmentUploaded(true);
      };
      reader.readAsDataURL(e.target.files[0]);
      setRawAttachment(e.target.files[0]);
    }
  };
  const handleCloseAttachment = () => {
    setAttachment("");
    setRawAttachment("");
    setIsAttachmentUploaded(false);
  };

  const handlePress = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
    }
  };

  const handlePay = async (e) => {
    try {
      e.preventDefault();

      if (!name || !email || !phone || !address || !zipCode) {
        setWarning("Please fill all field");
        return;
      }

      // if (!name || !email || !phone || !address || !zipCode || !rawAttachment) {
      //   setWarning("Please fill all field");
      //   return;
      // }

      const products = carts.map((cart) => {
        return {
          id: cart.Product.id,
          orderQuantity: cart.orderQuantity,
        };
      });

      var bodyForm = new FormData();

      bodyForm.append("name", name);
      bodyForm.append("email", email);
      bodyForm.append("address", address);
      bodyForm.append("phone", phone);
      bodyForm.append("zipCode", zipCode);
      // bodyForm.append("attachment", rawAttachment);

      bodyForm.append("products", JSON.stringify(products));
      bodyForm.append("total", totalPrice);

      bodyForm.append("status", "Pending");
      bodyForm.append("userId", state.user.id);

      const result = await API({
        method: "POST",
        url: "/transaction",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: bodyForm,
      });

      const token = result.data.data.payment.token;

      window.snap.pay(token, {
        onSuccess: function () {
          console.log("success");
          setShowPopup(!showPopup);
        },
        onPending: function (result) {
          console.log("pending");
          console.log(result);
        },
        onError: function (result) {
          console.log("error");
          console.log(result);
        },
        onClose: async () => {
          console.log(
            "customer closed the popup without finishing the payment"
          );
          // console.log("onclose", result.data.data.transaction.id);
          await API.patch(`/transaction/${result.data.data.transaction.id}`, {
            status: "Cancel",
          });
          router.push("/me");
        },
      });

      // router.push("/");
      setWarning("");
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalPrice = (carts) => {
    const newCarts = [...carts];

    let total = 0;

    newCarts.map(
      (cart) => (total += +cart.Product.price * +cart.orderQuantity)
    );

    setTotalPrice(total);
  };

  useEffect(() => {
    setCarts(cartsProps ? cartsProps : []);
    getTotalPrice(cartsProps ? cartsProps : []);

    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    const midtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");

    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, [cartsProps]);

  return (
    <>
      <div className={styles.content}>
        <div className={styles.leftContent}>
          <h3 className={styles.leftContentTitle}>Shipping</h3>
          <form action="">
            <input
              className={styles.inputField}
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={styles.inputField}
              type="email"
              placeholder="Email"
              onWheel={(e) => e.target.blur()}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={styles.inputField}
              type="number"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={handlePress}
            />
            <input
              className={styles.inputField}
              type="number"
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              onKeyDown={handlePress}
            />
            <textarea
              className={styles.address}
              placeholder="Address"
              name="address"
              id="address"
              cols="30"
              rows="10"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>

            {/* <div className={styles.inputFileWrapper}>
              <input
                type="text"
                placeholder="Proof"
                className={styles.inputFileLabel}
                value={rawAttachment?.name || ""}
                readOnly
                onClick={() => fileInput.current.click()}
              />
              <img
                className={styles.inputIcon}
                src={paperClip}
                onClick={() => fileInput.current.click()}
                alt="paper-clip"
              />
              <input
                type="file"
                accept=".jpeg,.jpg,.png,.svg"
                onChange={handleAttachment}
                ref={fileInput}
                style={{ display: "none" }}
              />
            </div> */}

            {/* <div className={styles.attachmentPreview}>
              {isAttachmentUploaded && (
                <>
                  <img
                    src={closeIcon}
                    alt="close"
                    width="30"
                    className={styles.closeIconButton}
                    onClick={handleCloseAttachment}
                  />
                  <img
                    className={styles.attachmentImage}
                    src={attachment}
                    alt="uploaded attachment"
                    draggable="false"
                  />
                </>
              )}
            </div> */}
          </form>
        </div>
        <div className={styles.rightContent}>
          {carts?.map((cart) => {
            return <OrderCard orderCheckout={cart} key={cart.id} />;
          })}
          <div className={styles.totalWrapper}>
            <p className={styles.totalTitle}>Total : </p>
            <p className={styles.total}>{convertToRupiah(totalPrice)}</p>
          </div>
          <div className={styles.warningWrapper}>
            <p>{warning}</p>
          </div>
          <div className={styles.payButtonWrapper}>
            <input
              className={styles.payButton}
              type="submit"
              value="Pay"
              onClick={handlePay}
            />
          </div>
        </div>
      </div>
      <PayPopup
        showModal={showPopup}
        onHide={() => {
          setShowPopup(false);
          router.push("/me");
        }}
      />
    </>
  );
};

export default CheckoutContent;
