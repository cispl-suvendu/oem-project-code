import React from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { IoMdCloseCircleOutline, IoMdClose } from "react-icons/io";

export default function HdModel({
  children,
  handleModelOpen,
  handleModelClose,
  HdTitle,
}) {
  return (
    <Dialog
      open={handleModelOpen}
      as="div"
      className="hd-model"
      onClose={handleModelClose}
    >
      <div className="hd-model-wrapper">
        <div className="hd-model-wrapper-inr">
          <DialogPanel transition className="hd-model-transition">
            <button
              onClick={() => handleModelClose()}
              className="popupclose_icon"
            >
              {/* <IoMdCloseCircleOutline /> */}

              <IoMdClose style={{ fontSize: "32px", color: "#818181" }} />
            </button>
            <h2 className="hd_modal_title mb-3">{HdTitle}</h2>
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
