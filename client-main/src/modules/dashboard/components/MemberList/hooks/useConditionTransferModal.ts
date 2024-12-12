import { useCallback, useState } from "react";

interface iProps {}

const useConditionTransferModal = ({}: iProps) => {
  const [isShowConditionTransferModal, setIsShowConditionTransferModal] =
    useState(false);

  const handleCloseConditionTransferModal = () => {
    setIsShowConditionTransferModal(false);
  };

  const handleOpenConditionTransferModal = useCallback(() => {
    setIsShowConditionTransferModal(true);
  }, []);

  return {
    isShowConditionTransferModal,

    handleCloseConditionTransferModal,
    handleOpenConditionTransferModal,
  };
};

export default useConditionTransferModal;
