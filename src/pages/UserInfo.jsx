import React from "react";
import { useParams } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import getRandomGradientImage from "../utils/gradientColor";
function UserInfo() {
  const { id } = useParams();
  const { data } = useCollection("users", null, ["uid", "==", id]);
  return (
    <>
      {data && (
        <>
          <img
            src={data[0].bgURL ?? getRandomGradientImage()}
            alt=""
            style={{ height: "200px", width: "100%", objectFit: "cover" }}
          />
          <img src={data[0].photoURL} alt="" />
          <h3>{data[0].displayName}</h3>
        </>
      )}
    </>
  );
}

export default UserInfo;
