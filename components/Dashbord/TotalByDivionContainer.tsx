import styled from "styled-components";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import TotalTeachersByClassAndDivion from "./TotalTeachersByClassAndDivion";
const TotalByDivionContainer = ({ totalClass, division, text }) => {
  const [clickedKey, setClickedKey] = useState(0);
  function handleMenuClick(e) {
    setClickedKey(e.key);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      {totalClass.map((c, i) => (
        <Menu.Item key={i}>
          <p>{c}</p>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <TotalTeacherStyle>
      <p> {text}</p>
      <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
        <a className="ant-dropdown-link">
          الصف <DownOutlined />
        </a>
      </Dropdown>

      <div className="cardContainer">
        <TotalTeachersByClassAndDivion
          classNumber={totalClass[clickedKey]}
          division={division.filter(
            (d) => d._id.classNumber === totalClass[clickedKey]
          )}
        />
      </div>
    </TotalTeacherStyle>
  );
};

export default TotalByDivionContainer;

const TotalTeacherStyle = styled.div`
  background-color: white;
  border-radius: 15px;
  margin-top: 30px;
  padding: 20px;
  .cardContainer {
    width: 70%;
    margin: 20px auto;
  }
`;



// const findClicked = totalClass.filter((t) => t.text === clickedKey);
// const findSub = totalClass[4].dataArray.filter(
//   (t) => t._id.classNumber === clickedKey
// );
// const labels = findClicked.length
//   ? findClicked.dataArray.map((l) => l._id[findClicked.value])
//   : findSub.dataArray.map((l) => l._id[findClicked.value]);

// const data = findClicked.dataArray.map((d) => d.total);