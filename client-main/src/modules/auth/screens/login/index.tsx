import DarkMode from "@/components/DarkMode";
import LanguageSelect from "@/components/LanguageSelect";
import NotificationCtx from "@/contexts/NotificationCtx";
import { afterLogin, isLogin } from "@/helpers/auth";
import { RootState } from "@/redux/store";
import { fetchUserInfo } from "@/redux/userSlice";
import { routePath } from "@/routes/path";
import { isStatusCodeSuccess } from "@/utils/api";
import { Button, Checkbox, Form, Input } from "antd";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { loginAPI } from "../../api";
import styles from "./styles.module.less";
import { withTranslation } from "react-i18next";
import { CheckboxChangeEvent } from "antd/es/checkbox";

const LoginPage = ({ t }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [visiblePassowrd, setVisiblePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { notifi } = useContext(NotificationCtx);
  const { mode } = useSelector((state: RootState) => state.app);

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSignIn = async (data: any) => {
    setBtnLoading(true);

    try {
      const loginEp = await loginAPI(data);

      if (isStatusCodeSuccess(loginEp.statusCode)) {
        afterLogin(loginEp.data.access_token);

        dispatch(fetchUserInfo());
        navigate(routePath.Dashboard);
        setBtnLoading(false);

        return;
      }

      setBtnLoading(false);

      if (loginEp.statusCode === 401) {
        setErrorMessage(t("Account has been locked"));
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);

        return;
      }

      setErrorMessage(t("Wrong account or password"));
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } catch (err) {
      const statusCode = err.response.data.statusCode;
      setBtnLoading(false);

      if (statusCode === 401) {
        setErrorMessage(t("Account has been locked"));
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);

        return;
      }

      setErrorMessage(t("Wrong account or password"));
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const toggleVisiblePassword = (e: CheckboxChangeEvent) => {
    setVisiblePassword(e.target.checked);
  };

  if (isLogin())
    return (
      <Navigate to={routePath.Dashboard} state={{ from: location }} replace />
    );

  return (
    <div
      className="h-full flex justify-center pt-[8%]"
      style={{
        background:
          mode === "light" ? "url(/img/login-background.png) #fff" : "#000000",
      }}
    >
      <div
        className={styles.right_content}
        style={{ background: mode === "light" ? "#1b3f5f" : "#0e2539" }}
      >
        <div className="flex flex-col align-middle">
          <div className="flex justify-end items-center h-[34px]">
            <DarkMode />

            <div className="px-[12px] py-[6px]">
              <LanguageSelect />
            </div>
          </div>

          <h1 className="text-[24px] text-white font-normal text-center my-[16px]">
            {t("Login")}
          </h1>
          <span className="text-[#EB8D0F]">{errorMessage}</span>
          <Form
            layout="vertical"
            name="sign form"
            form={form}
            initialValues={{}}
            className="full-width"
            onFinish={handleSignIn}
          >
            <Form.Item
              name="username"
              className="mb-[15px]"
              rules={[
                {
                  required: true,
                  message: t("Account name not entered!"),
                },
              ]}
            >
              <Input
                className={styles.input}
                bordered={false}
                placeholder={t("Username")}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: t("No password entered!"),
                },
              ]}
              className={styles.input_password_container}
            >
              <Input.Password
                className={styles.input_password}
                bordered={false}
                placeholder={t("Password")}
                visibilityToggle={{
                  visible: visiblePassowrd,
                }}
              />
            </Form.Item>
            <Checkbox
              className={styles.checkbox}
              onChange={toggleVisiblePassword}
            >
              <span className="text-[15px]">{t("Show password")}</span>
            </Checkbox>
            <Form.Item noStyle>
              <Button
                htmlType="submit"
                className={`bg-white h-[40px] text-[15px] rounded-[0px] w-full text-primary uppercase hover:bg-[#3b6a93] ${styles.button_custom}`}
                loading={btnLoading}
              >
                {t("Login")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(LoginPage);
