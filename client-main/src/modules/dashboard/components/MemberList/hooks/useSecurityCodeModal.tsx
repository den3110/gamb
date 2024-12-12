import { useCallback, useState } from "react";

interface iProps {}

const useSecurityCodeModal = ({}: iProps) => {
  const [isShowSecurityCodeModal, setIsShowSecurityCodeModal] = useState(false);

  const handleCloseSecurityCodeModal = () => {
    setIsShowSecurityCodeModal(false);
  };

  const handleOpenSecurityCodeModal = useCallback(() => {
    setIsShowSecurityCodeModal(true);
  }, []);

  return {
    isShowSecurityCodeModal,

    handleCloseSecurityCodeModal,
    handleOpenSecurityCodeModal,
  };
};

export default useSecurityCodeModal;
