import { useCallback, useState } from "react";

interface iProps {}

const useChangePasswordModal = ({}: iProps) => {
  const [isShowChangePasswordModal, setIsShowChangePasswordModal] =
    useState(false);

  const handleCloseChangePasswordModal = () => {
    setIsShowChangePasswordModal(false);
  };

  const handleOpenChangePasswordModal = useCallback(() => {
    setIsShowChangePasswordModal(true);
  }, []);

  return {
    isShowChangePasswordModal,

    handleCloseChangePasswordModal,
    handleOpenChangePasswordModal,
  };
};

export default useChangePasswordModal;
