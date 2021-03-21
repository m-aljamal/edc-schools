import axios from "axios";
import Router from "next/router";
import { useState } from "react";
import { Form, Formik } from "formik";
import { FormItem, Input } from "formik-antd";
import { string, object } from "yup";
import { Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import styles from "../components/styles/login.module.css";
import styled from "styled-components";
// import styled from "styled-components";

// const LoginStyle = styled.h2`
//   font-size: 5rem;
//   color: red;
// `;

const login = () => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };
  const validationScheam = object({
    email: string().required("يجب عليك ادخال اﻹيميل"),
    password: string().required("يجب عليك ادخال كلمة السر"),
  });
  return (
    <div>
      <div>
        <div>
          <h1 className={styles.h1}>teest</h1>
          <div className={styles.title}>تسجيل الدخول</div>
          <Formik
            validationSchema={validationScheam}
            initialValues={initialValues}
            onSubmit={async (values, formikHelpers) => {
              setLoading(true);
              try {
                const { data } = await axios.post("/api/users/login", values);
                setLoading(false);
                if (data && data.data.isAdmin) Router.push("/admin-dashbord");
                if (data && !data.data.isAdmin) Router.push("/user-dashboard");
              } catch (error) {
                setLoading(false);
                message.error(error.response.data.error);
              }
            }}
          >
            <Form>
              <FormItem name="email">
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  name="email"
                  placeholder="اﻹيميل"
                />
              </FormItem>
              <FormItem name="password">
                <Input.Password
                  autoComplete="off"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  name="password"
                  placeholder="كلمة السر"
                />
              </FormItem>
              <Button loading={loading} block type="primary" htmlType="submit">
                دخول
              </Button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default login;
