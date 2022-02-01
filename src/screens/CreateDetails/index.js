import React, { useEffect, useRef, useState } from "react";
import Web3 from "web3";
import { _Contract } from "../../utils/_contract";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../store/actions";
import styles from "./CreateDetails.module.sass";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOptions } from "../../utils/toast";
import Dropdown from "../../components/Dropdown";
import Icon from "../../components/Icon";
import TextInput from "../../components/TextInput";
import Loader from "../../components/Loader";
import Preview from "./Preview";
import Dropzone from "react-dropzone";

const royaltiesOptions = [
  {
    id: 1,
    name: 5
  },
  {
    id: 2,
    name: 10
  },
  {
    id: 3,
    name: 15
  }
];

const CreateDetails = () => {

  const dispatch = useDispatch();

  const web3 = new Web3(Web3.givenProvider);

  const dropRef = useRef();
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [royalty, setRoyalty] = useState(royaltiesOptions[0].name);
  const [price, setPrice] = useState(0);
  const [property, setProperty] = useState("");
  const [collectionId, setCollectionId] = useState(0);
  const [collections, setCollections] = useState([]);

  const [idForSale, setIdForSale] = useState(0);
  const [isMinted, setIsMinted] = useState(false);
  const [isClickedCreateItem, setIsClickedCreateItem] = useState(false);

  const auth = useSelector(state => state.authReducer.data);
  const collectionData = useSelector(state => state.collectionReducer.data);

  const onDrop = async (files) => {
    try {
      if (files.length > 0 && files[0].type.slice(0, 6) === "image/") {
        const uploadedFile = files[0];

        var formData = new FormData();
        formData.append("file", uploadedFile);

        let url = await Actions.uploadImage(formData);
        setImageUrl(url);
        setFile(uploadedFile);
        setIsUploaded(true);
      } else {
        toast.warn("This is not image. Please upload only image!", toastOptions);
      }
    } catch (error) {
      toast.error(error.message, toastOptions);
    }
  };

  const formValidation = () => {

    let formIsValid = true;
    if (!file) {
      formIsValid = false;
      toast.warn("Image is required!", toastOptions);
    }
    if (!name) {
      formIsValid = false;
      toast.warn("Name is required!", toastOptions);
    }
    if (!description) {
      formIsValid = false;
      toast.warn("Description is required!", toastOptions);
    }
    if (price === 0) {
      formIsValid = false;
      toast.warn("Price is required!", toastOptions);
    }
    if (price && !price.match(/^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/)) {
      formIsValid = false;
      toast.warn("Price must be number!", toastOptions);
    }
    if (price < 0) {
      formIsValid = false;
      toast.warn("Price must be greater than zero!", toastOptions);
    }
    if (!property) {
      formIsValid = false;
      toast.warn("Property is required!", toastOptions);
    }
    return formIsValid;
  };

  useEffect(() => {
    if (collectionData.length > 0) {
      var array = [];
      collectionData.map(item => {
        array.push({ id: item.collectionId, name: item.title });
      });
      setCollections(array);
    }
  }, [collectionData]);

  useEffect(() => {
    let col_id = collectionData.filter(item => item.title === property)[0]?.collectionId;
    setCollectionId(col_id);
  }, [property]);

  useEffect(() => {
    if (isMinted && idForSale) {
      const nftData = {
        url: imageUrl,
        idForSale: idForSale,
        collectionId: collectionId,
        name: name,
        owner: auth.address,
        description: description,
        royalty: royalty,
        price: price,
        property: property,
        onSale: true
      }
      dispatch(Actions.saveNFT(nftData));
    }
  }, [isMinted, idForSale]);

  const mintNewNFT = async () => {
    if (formValidation()) {
      setIsClickedCreateItem(true);
      try {
        const data = {
          nft: imageUrl,
          collectionId: collectionId,
          name: name,
          owner: auth.address,
          description: description,
          royalty: royalty,
          price: price,
          property: property,
          onSale: true
        }
        const uri = JSON.stringify(data);
        let toWei = web3.utils.toWei(price, 'ether');
        const gas = await _Contract.methods.mint(toWei, uri).estimateGas('', { from: auth.address });
        const result = await _Contract.methods
          .mint(toWei, uri).send({ from: auth.address, gas: gas });

        toast.success("Minted Successfully!", toastOptions);
  
        const tokenId = result.events.ItemAddedForSale.returnValues.tokenId;

        setIdForSale(tokenId);
        setIsMinted(true);
        setIsClickedCreateItem(false);
      } catch (error) {
        toast.error(error.message, toastOptions);
        await Actions.removeImage(imageUrl);
        setImageUrl("");
        toast.success("Removed Image successfully!", toastOptions);
        setIsClickedCreateItem(false);
      }
    }
  };

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.wrapper}>
          <div className={styles.head}>
            <div className={cn("h2", styles.title)}>
              Create single collectible
            </div>
            <button
              className={cn("button-stroke button-small disabled", styles.button)}
            >
              Switch to Multiple
            </button>
          </div>
          <form className={styles.form} action="">
            <div className={styles.list}>
              <div className={styles.item}>
                <div className={styles.category}>Upload file</div>
                <div className={styles.note}>
                  Drag or choose your file to upload
                </div>
                <div>
                  <Dropzone onDrop={onDrop} accept="image/*">
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps({ className: "drop-zone" })}
                        ref={dropRef}
                        className={styles.file}
                      >
                        <input {...getInputProps()} className={styles.load} />
                        <div className={styles.icon}>
                          <Icon name="upload-file" size="24" />
                        </div>
                        <div className={styles.format}>
                          PNG, JPG, JPEG, GIF, WEBP
                        </div>
                        {file && (
                          <div>
                            <strong>Selected file:</strong> {file.name}
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.category}>Item Details</div>
                <div className={styles.fieldset}>
                  <TextInput
                    className={styles.field}
                    label="Item name"
                    name="Name"
                    type="text"
                    placeholder="e. g. Redeemable Bitcoin Card with logo"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  />
                  <TextInput
                    className={styles.field}
                    label="Description"
                    name="Description"
                    type="text"
                    placeholder="e. g. “After purchasing you will able to recived the logo...”"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    required
                  />
                  <div className={styles.row}>
                    <div className={styles.col}>
                      <div className={styles.field}>
                        <div className={styles.label}>Royalties</div>
                        <Dropdown
                          className={styles.dropdown}
                          value={royalty}
                          setValue={setRoyalty}
                          options={royaltiesOptions}
                        />
                      </div>
                    </div>
                    <div className={styles.col}>
                      <TextInput
                        className={styles.field}
                        label="Price"
                        name="Price"
                        type="number"
                        placeholder="e. g. Price"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        required
                      />
                    </div>
                    <div className={styles.col}>
                      <div className={styles.field}>
                        <div className={styles.label}>Properties</div>
                        <Dropdown
                          className={styles.dropdown}
                          value={property}
                          setValue={setProperty}
                          options={collections}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.foot}>
              {
                isClickedCreateItem ? (
                  <button
                    disabled
                    className={cn("button", styles.button)}
                    type="button"
                  >
                    <span>Creating...</span>
                    <Loader className={styles.loader} color="white" />
                  </button>
                ) : (
                  <button
                    className={cn("button", styles.button)}
                    onClick={mintNewNFT}
                    type="button"
                  >
                    <span>Create Item</span>
                    <Icon name="arrow-next" size="10" />
                  </button>
                )
              }
            </div>
          </form>
        </div>
        <Preview
          isUploaded={isUploaded}
          previewSrc={imageUrl}
          name={name}
        />
        <ToastContainer />
      </div >
    </div >
  );
};

export default CreateDetails;
