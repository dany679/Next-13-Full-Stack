"use client";

import Image from "next/image";

const ModalDefault = ({
  open,
  setOpen,
  type,
  handleConfirm,
  subtitle,
}: {
  open: string | null;
  setOpen: (open: string | null) => void;
  handleConfirm: (open: string | null) => void;
  type: "edit" | "delete";
  subtitle: string;
}) => {
  const closeModal = () => setOpen(null);

  return (
    <div
      className={`relative z-10 none ${open === null && "hidden"}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Image
                    src="/assets/icons/danger.svg"
                    width={15}
                    alt="danger"
                    height={15}
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    <p className="text-transform: capitalize">{type} prompt </p>
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={() => {
                  handleConfirm(open);
                  closeModal();
                }}
                type="button"
                className={type === "delete" ? "danger_btn" : "alert_btn"}
              >
                <p className="text-transform: capitalize">{type} </p>
              </button>
              <button type="button" className="cancel_btn" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDefault;
