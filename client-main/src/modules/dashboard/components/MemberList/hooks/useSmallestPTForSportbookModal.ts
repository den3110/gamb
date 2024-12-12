import { useCallback, useState } from "react";

interface iProps {}

const useSmallestPTForSportbookModal = ({}: iProps) => {
  const [
    isShowSmallestPTForSportbookModal,
    setIsShowSmallestPTForSportbookModal,
  ] = useState(false);

  const handleCloseSmallestPTForSportbookModal = () => {
    setIsShowSmallestPTForSportbookModal(false);
  };

  const handleOpenSmallestPTForSportbookModal = useCallback(() => {
    setIsShowSmallestPTForSportbookModal(true);
  }, []);

  return {
    isShowSmallestPTForSportbookModal,

    handleCloseSmallestPTForSportbookModal,
    handleOpenSmallestPTForSportbookModal,
  };
};

export default useSmallestPTForSportbookModal;
