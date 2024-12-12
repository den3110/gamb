import { useCallback, useState } from "react";

interface iProps {}

const useLimitBetModal = ({}: iProps) => {
  const [isShowLimitBetModal, setIsShowLimitBetModal] = useState(false);

  const handleCloseLimitBetModal = () => {
    setIsShowLimitBetModal(false);
  };

  const handleOpenLimitBetModal = useCallback(() => {
    setIsShowLimitBetModal(true);
  }, []);

  return {
    isShowLimitBetModal,

    handleCloseLimitBetModal,
    handleOpenLimitBetModal,
  };
};

export default useLimitBetModal;
