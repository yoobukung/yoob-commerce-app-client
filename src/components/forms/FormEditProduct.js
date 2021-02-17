import { useState, useEffect } from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { isAuth } from "../../functions/auth";
import { getCategorise, getProductById } from "../../functions/GetApi";
import { Redirect, useLocation } from "react-router-dom";
import htmlToDraft from "html-to-draftjs";

const FormEditProduct = () => {
  let path = useLocation().pathname.split("/");

  const [description, setTextEdit] = useState("");
  const [state, setState] = useState({
    name: "",
    category: "",
    image: "",
    categories: [],
    categoryId: null,
    price: null,
    quantity: null,
    error: "",
    redirectToReferer: false,
  });

  let contentBlock = htmlToDraft(description);
  let editorStateInitial;

  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    editorStateInitial = EditorState.createWithContent(contentState);
  }
  const [editorState, setEditorState] = useState(editorStateInitial);

  const {
    name,
    price,
    image,
    categories,
    quantity,
    categoryId,
    error,
    redirectToReferer,
  } = state;

  useEffect(async () => {
    const res = await getCategorise();
    const data = await getProductById(path[3]);
    setState({
      ...state,
      categories: res,
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      image: data.imageUrl,
      categoryId: data.categoryId,
      description: data.description,
    });
  }, []);

  const categoryChoice = categories.map((cate) => {
    return (
      <option key={cate.id} value={cate.id} selected={cate.id === categoryId}>
        {cate.name}{" "}
      </option>
    );
  });

  const onContentStateChange = (name) => (e) => {
    const value =
      name == "description"
        ? draftToHtml(convertToRaw(editorState.getCurrentContent()))
        : e.target.value;
    setState({ ...state, [name]: value });
    setTextEdit(value);
  };

  const selectionChange = (e) => {
    setState({ ...state, categoryId: e.target.value });
  };

  const hanldeImage = (e) => {
    let fileInput = false;
    if (e.target.files[0]) fileInput = true;
    // setState({ ...state, image: e.target.files[0] });
    if (fileInput) {
      Resizer.imageFileResizer(
        e.target.files[0],
        500,
        500,
        "JPEG",
        100,
        0,
        (uri) => {
          setState({ ...state, image: uri });
        },
        "base64"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categoryId == null) {
      setState({ ...state, error: "กรูณาเลือกหมวดหมู่ก่อนเพิ่มสินค้า" });
    } else {
      try {
        await axios.patch(
          `${process.env.REACT_APP_SERVER_API}/manage/product/edit/${path[3]}`,
          { name, description, image, price, quantity, categoryId },
          {
            headers: {
              Authorization: `Bearer ${isAuth()}`,
            },
          }
        );
        setState({
          ...state,
          error: "",
          redirectToReferer: true,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (redirectToReferer) {
    return <Redirect to="/user/myproduct" />;
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">ชื่อสินค้า</label>
          <input
            type="text"
            className="form-control"
            onChange={onContentStateChange("name")}
            value={name}
          />
        </div>
        <div className="mb-3">
          {error}
          <label className="form-label">หมวดหมู่สินค้า</label>
          <select
            type="text"
            className="form-control"
            onChange={selectionChange}
          >
            <option>เลือกหมวดหมู่สินค้า</option>
            {categoryChoice}
          </select>
        </div>
        <div className="mb-3">
          <img src={image} />
        </div>

        <div className="mb-3">
          <label className="form-label">รูปภาพ</label>
          <input
            type="file"
            className="form-control"
            onChange={hanldeImage}
            accept="image/*"
            required
          />
        </div>

        <div className="row">
          <div className="col mb-3">
            <label className="form-label">ราคาราคา (บาท)</label>
            <input
              type="Number"
              className="form-control"
              style={{ WebkitAppearance: "none" }}
              onChange={onContentStateChange("price")}
              value={price}
            />
          </div>
          <div className="col mb-3">
            <label className="form-label">จำนวนสินค้า</label>
            <input
              type="Number"
              className="form-control"
              onChange={onContentStateChange("quantity")}
              value={quantity}
            />
          </div>
        </div>

        <div className="mb-5 mt-3">
          <strong>คำอธิบายสินค้า</strong>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            onContentStateChange={onContentStateChange("description")}
            userSelect="none"
            contentEditable={false}
            value={description}
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          แก้ไขข้อมูล
        </button>
      </form>
    );
  }
};

export default FormEditProduct;
