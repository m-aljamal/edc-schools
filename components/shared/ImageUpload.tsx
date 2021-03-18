import axios from "axios";
import Resizer from "react-image-file-resizer";
import { useEffect, useState } from "react";
import { Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { UploadImageStyle } from "../styles/UploadImageStyle";
const ImageUpload = ({ setImage, title, imageState, askIfLoading }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    askIfLoading(loading);
  }, [loading]);

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
              // setShowImage(res.data.url);
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

  const handleRemove = (id) => {
    setLoading(true);
    axios
      .post(
        "api/image/remove",
        {
          public_id: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setLoading(false);
        setImage("");
      })
      .catch((err) => {
        message.error(err);
        setLoading(false);
      });
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

  return (
    <UploadImageStyle>
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
            margin: "0 auto",
          }}
        >
          {title}
          <input
            type="file"
            accept="images/*"
            onChange={handleChange}
            hidden
            id="photo"
            name="photo"
          />
        </label>
      )}
      <div className="imageContainer">
        {imageState && (
          <div className="imageHoler">
            <span
              className="removeImage"
              onClick={() => handleRemove(imageState.public_id)}
            >
              X
            </span>
            <img src={imageState.url} />
          </div>
        )}
      </div>
    </UploadImageStyle>
  );
};

export default ImageUpload;
