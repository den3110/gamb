import { useCallback, useState } from "react";

interface iProps {}

const useConfigBitcoinModal = ({}: iProps) => {
  const [isShowConfigBitcoinModal, setIsShowConfigBitcoinModal] =
    useState(false);

  const handleCloseConfigBitcoinModal = () => {
    setIsShowConfigBitcoinModal(false);
  };

  const handleOpenConfigBitcoinModal = useCallback(() => {
    setIsShowConfigBitcoinModal(true);
  }, []);

  return {
    isShowConfigBitcoinModal,

    handleCloseConfigBitcoinModal,
    handleOpenConfigBitcoinModal,
  };
};

export default useConfigBitcoinModal;
