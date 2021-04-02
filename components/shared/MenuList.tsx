import { Menu } from "antd";
import {
  TeamOutlined,
  FundOutlined,
  BarcodeOutlined,
  BookOutlined,
  CalculatorOutlined,
  FileDoneOutlined,
  SmileOutlined,
  LeftOutlined,
} from "@ant-design/icons";
const { SubMenu } = Menu;

const MenuList = ({ handleClick, theme, mode, className }) => {
  return (
    <Menu
      onClick={handleClick}
      theme={theme}
      mode={mode}
      defaultSelectedKeys={["home"]}
      defaultOpenKeys={['sub1']}
      className={className}
    >
      <Menu.Item key="home" icon={<FundOutlined />}>
        الرئيسية
      </Menu.Item>
      <SubMenu key="sub1" icon={<TeamOutlined />} title="الموظفين">
        <Menu.Item key="teachers" icon={<LeftOutlined />}>
          المدرسين
        </Menu.Item>
        <Menu.Item key="administrators" icon={<LeftOutlined />}>
          الاداريين
        </Menu.Item>
        <Menu.Item key="services" icon={<LeftOutlined />}>
          الخدميين
        </Menu.Item>
        <Menu.Item key="employees" icon={<LeftOutlined />}>
          سجل الدوام
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<SmileOutlined />} title="الطلاب">
        <Menu.Item key="students" icon={<LeftOutlined />}>
          جميع الطلاب
        </Menu.Item>
        <Menu.Item key="stutimesheet" icon={<LeftOutlined />}>
          سجل الدوام
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="9" icon={<BarcodeOutlined />}>
        موجودات المدرسة
      </Menu.Item>
      <Menu.Item key="10" icon={<BookOutlined />}>
        مكتبة المدرسة
      </Menu.Item>
      <Menu.Item key="11" icon={<CalculatorOutlined />}>
        البرنامج الاسبوعي
      </Menu.Item>
      <Menu.Item key="12" icon={<FileDoneOutlined />}>
        نتائج الامتحانات
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
