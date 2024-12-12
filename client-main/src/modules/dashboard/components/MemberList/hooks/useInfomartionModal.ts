import { iMemberInfo } from "@/interfaces/member";
import { useCallback, useState } from "react";

interface iProps {
  datasource: iMemberInfo[];
  setDatasource: React.Dispatch<React.SetStateAction<iMemberInfo[]>>;
}

const useInformationModal = ({ setDatasource, datasource }: iProps) => {
  const [isShowInfoModal, setIsShowInfoModal] = useState(false);

  const handleCloseInfoModal = () => {
    setIsShowInfoModal(false);
  };

  const handleOpenInfoModal = useCallback(() => {
    setIsShowInfoModal(true);
  }, []);

  const onEditMemberInfoSucess = (member: iMemberInfo) => {
    const data = datasource.map((item) => {
      if (item.id === member.id) {
        return { ...item, ...member };
      }

      return item;
    });

    setDatasource(data);
  };

  return {
    isShowInfoModal,

    handleCloseInfoModal,
    handleOpenInfoModal,
    onEditMemberInfoSucess,
  };
};

export default useInformationModal;
