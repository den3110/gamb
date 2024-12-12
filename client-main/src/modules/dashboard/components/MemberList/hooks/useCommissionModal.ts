import { useCallback, useState } from "react";

interface iProps {}

const useCommissionModal = ({}: iProps) => {
  const [isShowCommissionModal, setIsShowCommissionModal] = useState(false);

  const handleCloseCommissionModal = () => {
    setIsShowCommissionModal(false);
  };

  const handleOpenCommissionModal = useCallback(() => {
    setIsShowCommissionModal(true);
  }, []);

  return {
    isShowCommissionModal,

    handleCloseCommissionModal,
    handleOpenCommissionModal,
  };
};

export default useCommissionModal;
