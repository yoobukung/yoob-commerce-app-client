import { useState, useEffect } from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { isAuth } from "../../functions/auth";
import { getCategorise } from "../../functions/GetApi";
import { Redirect } from "react-router-dom";

const FormCreateProduct = () => {
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

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

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
    setState({ ...state, categories: res });
  }, []);

  const categoryChoice = () => {
    if (categories !== "ไม่พบข้อมูล") {
      categories.map((cate) => {
        return (
          <option key={cate.id} data-key={cate.id}>
            {cate.name}{" "}
          </option>
        );
      });
    } else return <option>ไม่พบข้อมูล</option>;
  };

  const onContentStateChange = (name) => (e) => {
    const value =
      name == "description"
        ? draftToHtml(convertToRaw(editorState.getCurrentContent()))
        : e.target.value;
    setState({ ...state, [name]: value });
    setTextEdit(value);
  };

  const selectionChange = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    const keyData = e.target.options[selectedIndex].getAttribute("data-key");
    setState({ ...state, categoryId: keyData });
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
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_API}/manage/product/add`,
          { name, description, image, price, quantity, categoryId },
          {
            headers: {
              Authorization: `Bearer ${isAuth()}`,
            },
          }
        );
        console.log(res.data);
        setState({
          ...state,
          error: "",
          redirectToReferer: true,
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
      console.log(state);
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
            {categoryChoice()}
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
          เพิ่มสินค้า
        </button>
      </form>
    );
  }
};

export default FormCreateProduct;
