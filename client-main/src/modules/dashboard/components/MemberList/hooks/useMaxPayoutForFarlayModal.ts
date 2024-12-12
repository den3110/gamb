import { useCallback, useState } from "react";

interface iProps {}

const useMaxPayoutForParlayModal = ({}: iProps) => {
  const [isShowMaxPayoutForParlayModal, setIsShowMaxPayoutForParlayModal] =
    useState(false);

  const handleCloseMaxPayoutForParlayModal = () => {
    setIsShowMaxPayoutForParlayModal(false);
  };

  const handleOpenMaxPayoutForParlayModal = useCallback(() => {
    setIsShowMaxPayoutForParlayModal(true);
  }, []);

  return {
    isShowMaxPayoutForParlayModal,

    handleCloseMaxPayoutForParlayModal,
    handleOpenMaxPayoutForParlayModal,
  };
};

export default useMaxPayoutForParlayModal;
