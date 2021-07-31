import { useContext, useEffect, useRef, useState } from "react";
import styles from "./AddProductContent.module.css";
// import folderIcon from "../../assets/images/folder-icon.svg";
import paperClip from "../../assets/paper-clip.svg";
import closeIcon from "../../assets/close-icon.svg";
import { UserContext } from "../../contexts/UserContext";
import { API } from "../../services/API";
import AddProductPopup from "../AddProductPopup";
import { useHistory } from "react-router";

const AddProductContent = () => {
  const router = useHistory();

  const { state } = useContext(UserContext);

  const [showPopup, setShowPopup] = useState(false);

  const fileInput = useRef(null);
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  //untuk image preview
  const [firstImage, setFirstImage] = useState("");
  const [isFirstImageUploaded, setIsFirstImageUploaded] = useState(false);
  const [rawFirstImage, setRawFirstImage] = useState();

  // Untuk warning required
  const [warning, setWarning] = useState("");

  const handleAddProduct = async (e) => {
    try {
      e.preventDefault();

      if (!name || !stock || !price || !description) {
        setWarning("Please fill all field");
        return;
      }
      var bodyForm = new FormData();

      bodyForm.append("name", name);
      bodyForm.append("stock", stock);
      bodyForm.append("price", price);
      bodyForm.append("description", description);
      bodyForm.append("photo", rawFirstImage);

      const result = await API({
        method: "POST",
        url: "/product",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: bodyForm,
      });

      setShowPopup(!showPopup);
      setWarning("");
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleFirstImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {
        setFirstImage(e.target.result);
        setIsFirstImageUploaded(true);
      };
      reader.readAsDataURL(e.target.files[0]);
      setRawFirstImage(e.target.files[0]);
    }
  };
  const handleCloseFirstImage = () => {
    setFirstImage("");
    setRawFirstImage("");
    setIsFirstImageUploaded(false);
  };

  const handlePress = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.leftContent}>
        <h3 className={styles.contentTitle}>Add Product</h3>
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
            type="number"
            placeholder="Stock"
            onWheel={(e) => e.target.blur()}
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            onKeyDown={handlePress}
          />
          <input
            className={styles.inputField}
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onKeyDown={handlePress}
          />
          <textarea
            className={styles.description}
            placeholder="Description"
            name="description"
            id="description"
            cols="30"
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className={styles.inputFileWrapper}>
            <input
              type="text"
              placeholder="Photo"
              className={styles.inputFileLabel}
              value={rawFirstImage?.name || ""}
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
              onChange={handleFirstImage}
              ref={fileInput}
              style={{ display: "none" }}
            />
          </div>

          <div className={styles.warningWrapper}>
            <p>{warning}</p>
          </div>

          <div className={styles.addProductButtonWrapper}>
            <input
              className={styles.addProductButton}
              type="submit"
              value="Add Product"
              onClick={handleAddProduct}
            />
          </div>
        </form>
      </div>
      <div className={styles.rightContent}>
        {isFirstImageUploaded && (
          <>
            <img
              src={closeIcon}
              alt="close"
              width="50"
              className={styles.closeIconButton}
              onClick={handleCloseFirstImage}
            />
            <img
              className={styles.firstImage}
              src={firstImage}
              alt="uploaded first img"
              draggable="false"
            />
          </>
        )}
      </div>
      <AddProductPopup
        showModal={showPopup}
        onHide={() => {
          setShowPopup(false);
          router.push("/");
        }}
      />
    </div>
  );
};

export default AddProductContent;
