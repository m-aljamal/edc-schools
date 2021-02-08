import axios from "axios";
import Resizer from "react-image-file-resizer";
import { useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const ImageUpload = ({ setImage }) => {
  const [loading, setLoading] = useState(false);
  const [showImage, setShowImage] = useState("");
  const handleChange = async (e) => {
    setLoading(true);
    let file = e.target.files[0];
    if (file) {
      Resizer.imageFileResizer(
        file,
        720,
        720,
        "JPEG",
        100,
        0,
        (uri) => {
          axios
            .post("api/image/upload", {
              image: uri,
            })
            .then((res) => {
              //   console.log("IMAGE UPLOAD RES DATA", res);
              setImage(res.data);
              setShowImage(res.data.url);
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              console.log("CLOUDINARY UPLOAD ERR", err);
            });
        },
        "base64"
      );
    }
  };
  const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;
  return (
    <div>
      {loading ? (
        <Spin indicator={antIcon} />
      ) : (
        <label
          className="input-wrapper"
          style={{
            backgroundColor: "#1890ff",
            padding: "5px 10px",
            cursor: "pointer",
            color: "white",
            display: "block",
            width: "100px",
            margin: "0 auto",
          }}
        >
          تحميل الصورة
          <input type="file" accept="images/*" onChange={handleChange} hidden />
        </label>
      )}
      <div style={{ height: "150px" }}>
        {showImage && (
          <img
            src={showImage}
            style={{
              width: "140px",
              display: "block",
              margin: "0 auto",
              marginTop: "25px",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
