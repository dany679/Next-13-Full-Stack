// "use client";

import ModalDefault from "./ModalDefault";

const ModalDelete = ({
  open,
  setOpen,
  handleConfirm,
}: {
  open: string | null;
  setOpen: (open: string | null) => void;
  handleConfirm: () => void;
}) => {
  return (
    <ModalDefault
      open={open}
      setOpen={setOpen}
      type="delete"
      subtitle="Are you sure you want to delete this prompt? All of your
      data will be permanently removed. This action cannot be
      undone."
      handleConfirm={handleConfirm}
    />
  );
};

export default ModalDelete;
