import { EDIT_MEMBER_LIST_TYPE, USER_TYPE } from "@/constance/user";
import { iPaginate } from "@/interfaces/api";
import { iMemberInfo, MEMBER_INFO_KEY } from "@/interfaces/member";
import { getMemberListInfo } from "@/utils/dashboard-menu";
import { getUserTypeOfChild } from "@/utils/user";
import { CaretDownFilled, FileSearchOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Dropdown,
  Form,
  Popover,
  Row,
  Select,
  Table,
} from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import type { ColumnsType, TableProps } from "antd/es/table";
import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { withTranslation } from "react-i18next";
import { styled } from "styled-components";
import {
  blockMember,
  getMemberListById,
  revertBlockMember,
  revertSuppendMember,
  searchMember,
  suppendMember,
} from "../../api/user";
import useChangePasswordModal from "./hooks/useChangePasswordModal";
import useCommissionModal from "./hooks/useCommissionModal";
import useConditionTransferModal from "./hooks/useConditionTransferModal";
import useConfigBitcoinModal from "./hooks/useConfigBitcoinModal";
import useInformationModal from "./hooks/useInfomartionModal";
import useLimitBetModal from "./hooks/useLimitBetModal";
import useMaxPayoutForParlayModal from "./hooks/useMaxPayoutForFarlayModal";
import useSecurityCodeModal from "./hooks/useSecurityCodeModal";
import useSmallestPTForSportbookModal from "./hooks/useSmallestPTForSportbookModal";
import styles from "./styles.module.less";
import ChangePasswordModal from "./ui/ChangePasswordModal";
import ChangeSecurityCodeModal from "./ui/ChangeSecurityCodeModal";
import CommissionModal from "./ui/CommissionModal";
import ConditionTransferModal from "./ui/ConditionTransferModal";
import ConfigBitcoinModal from "./ui/ConfigBitcoinModal";
import InfomartionModal from "./ui/InfomartionModal";
import InputSearchMember from "./ui/InputSearchMember";
import LimitBetModal from "./ui/LimitBetModal";
import MaxPayoutForParlayModal from "./ui/MaxPayoutForParlayModal";
import SmallestPTForSportbookModal from "./ui/SmallestPTForSportbookModal";

const { Option } = Select;
const PAGE_SIZE = 10;

const StyledTable = styled((props: TableProps<any>) => <Table {...props} />)`
  && tbody > tr:hover > td {
    background: #f8eb95 !important;
    color: #333 !important;
  }
`;

interface iProps {
  userInfo: iMemberInfo;
  t?: any;
}

const MemberList = ({ userInfo, t }: iProps) => {
  const [columns, setColumns] = useState<ColumnsType<iMemberInfo>>([] as any);
  const [datasource, setDatasource] = useState<iMemberInfo[]>([] as any);
  const [paginate, setPaginate] = useState<iPaginate>(null);
  const [loadingSource, setLoadingSource] = useState(false);
  const [currentUserType, setCurrentUserType] = useState<USER_TYPE>();
  const [memberPath, setMemberPath] = useState<iMemberInfo[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [memberNeedEdit, setMemberNeedEdit] = useState<iMemberInfo>({} as any);

  const [form] = Form.useForm();
  const currentParentMemberId = useRef();

  const {
    isShowInfoModal,
    handleOpenInfoModal,
    handleCloseInfoModal,
    onEditMemberInfoSucess,
  } = useInformationModal({ datasource, setDatasource });

  const {
    isShowConditionTransferModal,
    handleOpenConditionTransferModal,
    handleCloseConditionTransferModal,
  } = useConditionTransferModal({});

  const {
    isShowSecurityCodeModal,
    handleOpenSecurityCodeModal,
    handleCloseSecurityCodeModal,
  } = useSecurityCodeModal({});

  const {
    isShowChangePasswordModal,
    handleOpenChangePasswordModal,
    handleCloseChangePasswordModal,
  } = useChangePasswordModal({});

  const {
    isShowConfigBitcoinModal,
    handleCloseConfigBitcoinModal,
    handleOpenConfigBitcoinModal,
  } = useConfigBitcoinModal({});

  const {
    isShowLimitBetModal,
    handleOpenLimitBetModal,
    handleCloseLimitBetModal,
  } = useLimitBetModal({});

  const {
    isShowCommissionModal,
    handleOpenCommissionModal,
    handleCloseCommissionModal,
  } = useCommissionModal({});

  const {
    isShowMaxPayoutForParlayModal,
    handleOpenMaxPayoutForParlayModal,
    handleCloseMaxPayoutForParlayModal,
  } = useMaxPayoutForParlayModal({});

  const {
    isShowSmallestPTForSportbookModal,
    handleOpenSmallestPTForSportbookModal,
    handleCloseSmallestPTForSportbookModal,
  } = useSmallestPTForSportbookModal({});

  const title = useMemo(
    () => getMemberListInfo(userInfo?.user_type)?.name,
    [userInfo?.user_type]
  );

  const editMemberListOptionsAll = useMemo(() => {
    return [
      {
        key: EDIT_MEMBER_LIST_TYPE.INFO,
        label: t("Account Info"),
      },
      {
        key: EDIT_MEMBER_LIST_TYPE.TRANSFER,
        label: t("TRANSFER"),
      },
      {
        key: EDIT_MEMBER_LIST_TYPE.BET_LIMIT,
        label: t("Betting limits"),
      },
      {
        key: EDIT_MEMBER_LIST_TYPE.COMMISSION,
        label: t("Commission"),
      },
      {
        key: EDIT_MEMBER_LIST_TYPE.PARLAY_MAX_PAYOUT,
        label: t("Max Payout for Parlay"),
      },
      {
        key: EDIT_MEMBER_LIST_TYPE.SB_MIN_PT,
        label: t("Smallest PT for Sportsbook"),
      },
      {
        key: EDIT_MEMBER_LIST_TYPE.SPORTSBOOK,
        label: "Sportsbook",
      },
      {
        key: EDIT_MEMBER_LIST_TYPE.VIRTUAL_SPORTS,
        label: "Virtual Sports",
      },
      {
        key: EDIT_MEMBER_LIST_TYPE.SABA_CASINO,
        label: "Saba Casino",
      },
      {
        key: EDIT_MEMBER_LIST_TYPE.SPORTSBOOK_2,
        label: "Sportsbook 2",
      },
      {
        key: EDIT_MEMBER_LIST_TYPE.RNG_SLOT,
        label: "RNG Slot",
      },
      {
        key: EDIT_MEMBER_LIST_TYPE.LOTTO,
        label: t("Lotto"),
      },
      {
        key: EDIT_MEMBER_LIST_TYPE.LIVE_CASINO,
        label: "Live Casino",
      },
      {
        key: EDIT_MEMBER_LIST_TYPE.SABA_GAMES,
        label: t("SABA Game Portal"),
      },
      {
        key: EDIT_MEMBER_LIST_TYPE.RNG_LOTTERY,
        label: "RNG Lottery",
      },
      {
        key: EDIT_MEMBER_LIST_TYPE.VIRTUAL_GAMES,
        label: t("Virtual Games"),
      },
      {
        key: EDIT_MEMBER_LIST_TYPE.BITCOIN,
        label: "Bitcoin",
      },
      {
        key: EDIT_MEMBER_LIST_TYPE.RESET_PASSWORD,
        label: t("Change password"),
      },
      {
        key: EDIT_MEMBER_LIST_TYPE.CHANGE_SECURITY_CODE,
        label: t("Reset Security Code"),
      },
    ];
  }, [t]);

  useEffect(() => {
    if (userInfo?.user_type) {
      setCurrentUserType(userInfo?.user_type);
    }
  }, [userInfo?.user_type]);

  useEffect(() => {
    if (userInfo?.id) {
      setMemberPath([userInfo]);
    }
  }, [userInfo?.id]);

  const fetchMemberListById = useCallback(
    async (id: any, params?: { page?: number; size?: number }) => {
      setLoadingSource(true);
      const page = params?.page || 1;
      const size = params?.size || PAGE_SIZE;

      const memberList = await getMemberListById(id, { page, size });

      const items = memberList?.data?.items || [];
      const { items: _, ...paginate } = memberList?.data || {};

      currentParentMemberId.current = id;
      setPaginate(paginate as any);
      setDatasource(
        items?.map((item, key) => {
          const cloneItem = structuredClone(item);
          delete cloneItem.children;

          return { ...cloneItem, no: key + 1 };
        })
      );

      setLoadingSource(false);

      return memberList.data;
    },
    []
  );

  useEffect(() => {
    if (!userInfo?.id) {
      return;
    }

    fetchMemberListById(userInfo?.id);
  }, [userInfo?.id]);

  const goToMemberListOther = useCallback(
    async (member: iMemberInfo) => {
      const idx = memberPath.findIndex((item) => item.id === member?.id);
      const userTypeOfChild = getUserTypeOfChild(member.user_type);
      setCurrentUserType(userTypeOfChild);
      setSelectedRowKeys([]);
      fetchMemberListById(member.id);

      if (idx !== -1) {
        setMemberPath((prev) => prev.slice(0, idx + 1));
        return;
      }
      setMemberPath((prev) => [...prev, member]);
    },
    [memberPath]
  );

  useEffect(() => {
    if (!currentUserType) {
      return;
    }

    const onClickEditMemberListType = (
      type: EDIT_MEMBER_LIST_TYPE,
      member: iMemberInfo
    ) => {
      setMemberNeedEdit(member);

      switch (type) {
        case EDIT_MEMBER_LIST_TYPE.INFO:
          handleOpenInfoModal();
          break;

        case EDIT_MEMBER_LIST_TYPE.TRANSFER:
          handleOpenConditionTransferModal();
          break;

        case EDIT_MEMBER_LIST_TYPE.CHANGE_SECURITY_CODE:
          handleOpenSecurityCodeModal();
          break;

        case EDIT_MEMBER_LIST_TYPE.RESET_PASSWORD:
          handleOpenChangePasswordModal();
          break;

        case EDIT_MEMBER_LIST_TYPE.BITCOIN:
          handleOpenConfigBitcoinModal();
          break;

        case EDIT_MEMBER_LIST_TYPE.BET_LIMIT:
          handleOpenLimitBetModal();
          break;

        case EDIT_MEMBER_LIST_TYPE.COMMISSION:
          handleOpenCommissionModal();
          break;

        case EDIT_MEMBER_LIST_TYPE.PARLAY_MAX_PAYOUT:
          handleOpenMaxPayoutForParlayModal();
          break;

        case EDIT_MEMBER_LIST_TYPE.SB_MIN_PT:
          handleOpenSmallestPTForSportbookModal();
          break;

        default:
          break;
      }
    };

    setColumns([
      {
        title: "No.",
        dataIndex: "no",
        key: "no",
        width: 60,
        align: "center",
        render: (text) => <span className="text-ellipsis">{text}</span>,
      },
      Table.SELECTION_COLUMN,
      {
        title: (
          <span
            className="icon icon-table-edit hover:text-[#f60]"
            style={{ fontSize: 18 }}
          />
        ),
        width: 50,
        align: "center",
        render: (_, record) => (
          <div className="flex items-center">
            <Dropdown
              align={{
                offset: [30, -200],
              }}
              trigger={["click"]}
              menu={{
                items: editMemberListOptionsAll.map((item) => ({
                  ...item,
                  icon: <span className="icon icon-edit" />,
                  onClick: () => onClickEditMemberListType(item.key, record),
                })),
              }}
            >
              <span
                className="icon icon-table-edit hover:text-[#f60]"
                style={{ fontSize: 18 }}
              />
            </Dropdown>
          </div>
        ),
      },
      {
        title: (
          <div className="flex flex-col items-center justify-center">
            <span>{t("Username")}</span>
            <span>{t("Nickname")}</span>
          </div>
        ),
        dataIndex: MEMBER_INFO_KEY.USERNAME,
        key: MEMBER_INFO_KEY.USERNAME,
        width: 160,
        align: "center",
        render: (text, item) =>
          item.user_type !== USER_TYPE.MEMBER ? (
            <div
              className="flex flex-col group items-start"
              onClick={() => goToMemberListOther(item)}
            >
              <span className="line-clamp-1 text-primary group-hover:text-red-600 cursor-pointer break-all">
                {text}
              </span>
              <span className="line-clamp-1 break-all">{item.id}</span>
            </div>
          ) : (
            <div className="flex flex-col items-start">
              <span className="line-clamp-1 break-all">{text}</span>
              <span className="line-clamp-1">--</span>
            </div>
          ),
      },
      {
        title: t("Status"),
        dataIndex: "status",
        key: "status",
        align: "center",
        render: (_, record: iMemberInfo) => {
          const onChangeStatus = async (
            key: string,
            event: CheckboxChangeEvent
          ) => {
            const val = event.target.checked;
            const datEdit: Partial<iMemberInfo> = {} as any;

            if (key === MEMBER_INFO_KEY.IS_SUPPENDED) {
              val ? suppendMember(record.id) : revertSuppendMember(record.id);
              datEdit.is_suppended = val;
            }

            if (key === MEMBER_INFO_KEY.IS_CLOSE) {
              val ? blockMember(record.id) : revertBlockMember(record.id);
              datEdit.is_close = val;
            }

            setDatasource((prev) => {
              return prev.map((item) => {
                if (item.id === record.id) {
                  return {
                    ...item,
                    ...datEdit,
                  };
                }

                return item;
              });
            });
          };

          return (
            <Popover
              placement="rightTop"
              trigger="click"
              title=""
              style={{ width: 200 }}
              content={
                <div className="w-[200px]">
                  <Row>
                    <Col span={24}>
                      <Checkbox
                        checked={record.is_suppended}
                        onChange={(val) =>
                          onChangeStatus(MEMBER_INFO_KEY.IS_SUPPENDED, val)
                        }
                      >
                        {t("Suspended")}
                      </Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox
                        checked={record.is_close}
                        onChange={(val) =>
                          onChangeStatus(MEMBER_INFO_KEY.IS_CLOSE, val)
                        }
                      >
                        {t("Closed")}
                      </Checkbox>
                    </Col>
                  </Row>
                </div>
              }
            >
              <div className="flex cursor-pointer text-primary hover:text-red-600 w-fit mx-auto items-center justify-center gap-1">
                <span>
                  {!record.is_close && !record.is_suppended && t("Open")}
                  {record.is_close && t("Closed")}
                  {!record.is_close && record.is_suppended && t("Suspended")}
                </span>
                <CaretDownFilled className="text-[8px]" />
              </div>
            </Popover>
          );
        },
      },
      {
        title: t("Statement"),
        dataIndex: "statements",
        key: "statements",
        align: "center",
        render: () => (
          <FileSearchOutlined className="text-primary cursor-pointer" />
        ),
      },
      {
        title: t("First & Last Name"),
        width: 120,
        align: "center",
        render: (_, item) => (
          <span className="text-ellipsis">
            {`${item.last_name} ${item.first_name}`}{" "}
          </span>
        ),
      },
      //{
      //title: "Nhóm",
      //dataIndex: MEMBER_INFO_KEY.GROUP,
      //key: MEMBER_INFO_KEY.GROUP,
      //align: "center",
      //render: (text) => <span className="text-ellipsis">{text}</span>,
      //},
      {
        title: t("Commission"),
        fixed: "right",
        align: "center",
        children:
          currentUserType === USER_TYPE.MEMBER
            ? [
                {
                  title: `${t("Commission")} Agent 1`,
                  dataIndex: "agent_commission_1",
                  key: "agent_commission_1",
                  align: "center",
                  className: styles.th_sub,
                },
                {
                  title: `${t("Commission")} Agent 2`,
                  dataIndex: "agent_commission_2",
                  key: "agent_commission_2",
                  align: "center",
                  className: styles.th_sub,
                },
                {
                  title: `${t("Commission")} Agent 3`,
                  dataIndex: "agent_commission_3",
                  key: "agent_commission_3",
                  align: "center",
                  className: styles.th_sub,
                },
                {
                  title: `${t("Commission")} Member 1`,
                  dataIndex: "member_commission_1",
                  key: "member_commission_1",
                  align: "center",
                  className: styles.th_sub,
                },
                {
                  title: `${t("Commission")} Member 2`,
                  dataIndex: "member_commission_2",
                  key: "member_commission_2",
                  align: "center",
                  className: styles.th_sub,
                },
                {
                  title: `${t("Commission")} Member 3`,
                  dataIndex: "member_commission_3",
                  key: "member_commission_3",
                  align: "center",
                  className: styles.th_sub,
                },
              ]
            : [
                {
                  title: `${t("Group")} A`,
                  dataIndex: MEMBER_INFO_KEY.COMMISSION_GROUP_A,
                  key: MEMBER_INFO_KEY.COMMISSION_GROUP_A,
                  align: "center",
                  className: styles.th_sub,
                },
                {
                  title: `${t("Group")} B`,
                  dataIndex: MEMBER_INFO_KEY.COMMISSION_GROUP_B,
                  key: MEMBER_INFO_KEY.COMMISSION_GROUP_B,
                  align: "center",
                  className: styles.th_sub,
                },
                {
                  title: `${t("Group")} C`,
                  dataIndex: MEMBER_INFO_KEY.COMMISSION_GROUP_C,
                  key: MEMBER_INFO_KEY.COMMISSION_GROUP_C,
                  align: "center",
                  className: styles.th_sub,
                },
                {
                  title: `${t("Group")} D`,
                  dataIndex: MEMBER_INFO_KEY.COMMISSION_GROUP_D,
                  key: MEMBER_INFO_KEY.COMMISSION_GROUP_D,
                  align: "center",
                  className: styles.th_sub,
                },
                {
                  title: "1X2",
                  dataIndex: MEMBER_INFO_KEY.COMMISSION_GROUP_1X2,
                  key: MEMBER_INFO_KEY.COMMISSION_GROUP_1X2,
                  align: "center",
                  className: styles.th_sub,
                },
                {
                  title: t("Other"),
                  dataIndex: MEMBER_INFO_KEY.COMMISSION_GROUP_ORTHER,
                  key: MEMBER_INFO_KEY.COMMISSION_GROUP_ORTHER,
                  align: "center",
                  className: styles.th_sub,
                },
              ],
      },
      //{
      //title: "IP đăng nhập",
      //dataIndex: "ip",
      //key: "ip",
      //align: "center",
      //},
    ]);
  }, [currentUserType, goToMemberListOther, handleOpenInfoModal, t]);

  return (
    <>
      <div className="flex items-center gap-3 h-[40px]">
        <div className="flex items-center gap-2 py-2">
          <span className="uppercase text-red-900 font-medium">{title}</span>
          <span className="icon icon-backupdomains" />
        </div>

        {memberPath?.length > 1 && (
          <>
            (
            <div className="flex items-center gap-2">
              {memberPath?.map((mem, key) => (
                <Fragment key={mem.id}>
                  <span
                    {...(key !== memberPath?.length - 1
                      ? {
                          onClick: () => goToMemberListOther(mem),
                          className:
                            "text-primary cursor-pointer hover:text-red-400",
                        }
                      : {
                          className: "text-red-800",
                        })}
                  >
                    {mem.username}
                  </span>
                  {key !== memberPath?.length - 1 && <span>{">"}</span>}
                </Fragment>
              ))}
            </div>
            )
          </>
        )}
      </div>

      <Divider style={{ marginTop: 0, marginBottom: 12 }} />

      <Form
        form={form}
        layout="inline"
        initialValues={{
          commission: "all",
          status: "all",
        }}
        className="gap-2"
        style={{ maxWidth: "name" }}
        onFinish={async (val) => {
          if (!val.username) {
            fetchMemberListById(userInfo?.id);

            return;
          }

          setLoadingSource(true);
          const memberList = await searchMember({
            userName: val.username,
            page: 1,
            size: 10,
          });

          const items = memberList?.data?.items || [];
          const { items: _, ...paginate } = memberList?.data || {};
          setPaginate(paginate as any);
          setDatasource(
            items?.map((item, key) => {
              const cloneItem = structuredClone(item);
              delete cloneItem.children;

              return { ...cloneItem, no: key + 1 };
            })
          );

          setLoadingSource(false);
        }}
      >
        <Form.Item name="username" label={t("Username")}>
          <InputSearchMember
            style={{ width: 270 }}
            placeholder={t("Username/Nickname or First/Last Name")}
          />
        </Form.Item>
        <Form.Item name="status" label={t("Status")}>
          <Select style={{ width: 150 }}>
            <Option value="all">{t("All")}</Option>
            <Option value="open">{t("Open")}</Option>
            <Option value="suspended">{t("Suspended")}</Option>
            <Option value="closed">{t("Closed:")}</Option>
            <Option value="ineffective">{t("Disabled")}</Option>
            <Option value="looked">{t("Locked")}</Option>
          </Select>
        </Form.Item>

        <Form.Item name="commission" label={t("Double Comm")}>
          <Select style={{ width: 150 }}>
            <Option value="all">{t("All")}</Option>
            <Option value="allow">{t("Allowed")}</Option>
            <Option value="not_allow">{t("Disallowed")}</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" className="rounded-[0px]">
            {t("Confirm")}
          </Button>
        </Form.Item>
      </Form>

      <StyledTable
        className={styles.table}
        loading={loadingSource}
        size="small"
        rowClassName={(record: iMemberInfo) =>
          record.is_close
            ? styles.tr_close
            : record.is_suppended
            ? styles.tr_suppended
            : ""
        }
        rowSelection={{
          type: "checkbox",
          selectedRowKeys,
          onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
        }}
        bordered
        columns={columns}
        dataSource={datasource}
        rowKey="no"
        //scroll={{ x: "max-content" }}
        pagination={{
          position: ["none" as any, "bottomCenter"],
          total: paginate?.totalCount,
          pageSize: paginate?.pageSize,
          current: paginate?.pageNumber,
          onChange: (page: number, size: number) =>
            fetchMemberListById(currentParentMemberId.current, { page, size }),
          onShowSizeChange: (page: number, size: number) =>
            fetchMemberListById(currentParentMemberId.current, {
              page,
              size,
            }),
        }}
      />

      {isShowInfoModal && (
        <InfomartionModal
          t={t}
          member={memberNeedEdit}
          title={`${t("Edit Info")} - ${memberNeedEdit?.username}`}
          onCancel={handleCloseInfoModal}
          open={isShowInfoModal}
          onSuccess={onEditMemberInfoSucess}
        />
      )}

      {isShowConditionTransferModal && (
        <ConditionTransferModal
          t={t}
          member={memberNeedEdit}
          title={`${t("Edit Transfer")} - ${memberNeedEdit?.username}`}
          onCancel={handleCloseConditionTransferModal}
          open={isShowConditionTransferModal}
        />
      )}

      {isShowSecurityCodeModal && (
        <ChangeSecurityCodeModal
          member={memberNeedEdit}
          title={`${t("Reset Security Code")} - ${memberNeedEdit?.username}`}
          onCancel={handleCloseSecurityCodeModal}
          open={isShowSecurityCodeModal}
        />
      )}

      {isShowChangePasswordModal && (
        <ChangePasswordModal
          member={memberNeedEdit}
          title={`${t("Change password")} - ${memberNeedEdit?.username}`}
          onCancel={handleCloseChangePasswordModal}
          open={isShowChangePasswordModal}
        />
      )}

      {isShowConfigBitcoinModal && (
        <ConfigBitcoinModal
          member={memberNeedEdit}
          title={`${t("Custom")} Bitcoin - ${memberNeedEdit?.username}`}
          onCancel={handleCloseConfigBitcoinModal}
          open={isShowConfigBitcoinModal}
        />
      )}

      {isShowLimitBetModal && (
        <LimitBetModal
          member={memberNeedEdit}
          title={`${t("Customize Bet Limit")} - ${memberNeedEdit?.username}`}
          onCancel={handleCloseLimitBetModal}
          open={isShowLimitBetModal}
        />
      )}

      {isShowCommissionModal && (
        <CommissionModal
          member={memberNeedEdit}
          title={`${t("Customize commission")} - ${memberNeedEdit?.username}`}
          onCancel={handleCloseCommissionModal}
          open={isShowCommissionModal}
        />
      )}

      {isShowMaxPayoutForParlayModal && (
        <MaxPayoutForParlayModal
          member={memberNeedEdit}
          title={`${t("Customize")} - ${memberNeedEdit?.username}`}
          onCancel={handleCloseMaxPayoutForParlayModal}
          open={isShowMaxPayoutForParlayModal}
        />
      )}

      {isShowSmallestPTForSportbookModal && (
        <SmallestPTForSportbookModal
          member={memberNeedEdit}
          title={`${t("Smallest PT customization for Sportsbook")} - ${
            memberNeedEdit?.username
          }`}
          onCancel={handleCloseSmallestPTForSportbookModal}
          open={isShowSmallestPTForSportbookModal}
        />
      )}
    </>
  );
};

export default withTranslation()(memo(MemberList));
