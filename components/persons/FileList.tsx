import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import LoadingSpin from "../shared/LoadingSpin";

export default function FileList({ setShowFolders, folder }) {
  const [loading, setLoading] = useState(false);
  const { data, error } = useSWR(`/api/drive/getFiles/${folder.id}`);
  if (!data) {
    return <LoadingSpin />;
  }
  if (error) {
    console.log("error", error);
  }

  const handleView = async (id) => {
    setLoading(true);
    const { data } = await axios.get(`/api/drive/${id}/getfile`);
    if (data.webViewLink) {
      setLoading(false);
      window.open(data.webViewLink, "_blank");
    }
  };
  if (loading) {
    return <LoadingSpin />;
  }
  const fileIcon = {
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      name: "word",
      color: "blue",
    },
    "application/pdf": { name: "pdf", color: "red" },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      name: "excel",
      color: "green",
    },
    "image/jpeg": { name: "image", color: "gray" },
  };
  return (
    <>
      <div className="flex items-center transform -translate-y-6">
        <i
          className="fas fa-arrow-up cursor-pointer  text-lg "
          onClick={() => setShowFolders({ show: false, id: "", name: "" })}
        ></i>
        <p className="mr-2 font-bold text-gray-500">{folder?.name}</p>
      </div>

      <div className="lg:grid-cols-8 grid grid-cols-4 text-center  ">
        {data.map((d) => {
          const chooseIcon = fileIcon[d.mimeType];
          return (
            <div key={d.id}>
              <i
                onClick={() => handleView(d.id)}
                className={`far fa-file-${chooseIcon.name} fa-3x  text-${chooseIcon.color}-500
                   hover:text-${chooseIcon.color}-800 cursor-pointer`}
              ></i>
              <p>{d.name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
