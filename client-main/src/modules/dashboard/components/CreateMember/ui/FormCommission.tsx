import { Col, Form, Row, Select } from "antd";
import { memo } from "react";
import { styled } from "styled-components";

const commissionOpts = [
  { value: "0.0025", label: "0.0025" },
  { value: "0.002", label: "0.002" },
  { value: "0.0015", label: "0.0015" },
  { value: "0.001", label: "0.001" },
  { value: "0.0005", label: "0.0005" },
  { value: "0", label: "0" },
];

const field = "commission";

interface iProps {
  t: any;
}

const StyledTable = styled.table`
  width: "100%";
  && td {
    text-align: right;
    padding: 5px;
    border: none !important;
  }
`;

const FormCommision = ({ t }: iProps) => {
  return (
    <StyledTable>
      <colgroup>
        <col span={1} style={{ width: "15%" }} />
        <col span={1} style={{ width: "10%" }} />
        <col span={1} style={{ width: "15%" }} />
        <col span={1} style={{ width: "10%" }} />
        <col span={1} style={{ width: "15%" }} />
        <col span={1} style={{ width: "10%" }} />
        <col span={1} style={{ width: "15%" }} />
        <col span={1} style={{ width: "10%" }} />
      </colgroup>

      <tbody>
        <tr style={{ borderBottom: "1px solid #ccc" }}>
          <td>{t("Group A")}</td>
          <td>
            <Form.Item noStyle name={[field, "group_a"]}>
              <Select style={{ width: "100%" }} options={commissionOpts} />
            </Form.Item>
          </td>
          <td>{t("Group B")}</td>
          <td>
            <Form.Item noStyle name={[field, "group_b"]}>
              <Select style={{ width: "100%" }} options={commissionOpts} />
            </Form.Item>
          </td>
          <td>{t("Group C")}</td>
          <td>
            <Form.Item noStyle name={[field, "group_c"]}>
              <Select style={{ width: "100%" }} options={commissionOpts} />
            </Form.Item>
          </td>
          <td>{t("Group D")}</td>
          <td>
            <Form.Item noStyle name={[field, "group_d"]}>
              <Select style={{ width: "100%" }} options={commissionOpts} />
            </Form.Item>
          </td>
        </tr>

        <tr>
          <td>{t("Commission for 1x2")}</td>
          <td>
            <Form.Item noStyle name={[field, "group_1x2"]}>
              <Select style={{ width: "100%" }} options={commissionOpts} />
            </Form.Item>
          </td>
          <td>{t("Other Group")}</td>
          <td>
            <Form.Item noStyle name={[field, "group_orther"]}>
              <Select style={{ width: "100%" }} options={commissionOpts} />
            </Form.Item>
          </td>
        </tr>
      </tbody>
    </StyledTable>
  );
};

export default memo(FormCommision);
