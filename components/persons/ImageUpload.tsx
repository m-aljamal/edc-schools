import axios from "axios";
import Resizer from "react-image-file-resizer";
import { useEffect, useState } from "react";
import { Spin, message, Tooltip } from "antd";
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
        <>
          <label
            className="input-wrapper bg-gray-600"
            style={{
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

          {imageState && (
            <div className={`${imageState.url && "imageContainer"} `}>
              <div className="imageHoler ">
                <Tooltip placement="bottomRight" title="خذف الصورة">
                  <i
                    className="fas fa-times mt-2 text-red-500
                  cursor-pointer
                  "
                    onClick={() => handleRemove(imageState.public_id)}
                  ></i>
                </Tooltip>
                <img src={imageState.url} className="pb-2" />
              </div>
            </div>
          )}
        </>
      )}
    </UploadImageStyle>
  );
};

export default ImageUpload;
