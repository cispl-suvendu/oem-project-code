import React from "react";
import { Button } from "@chakra-ui/react";
import { createPortal } from "react-dom";

export default function Modal({
  children,
  isOpen = false,
  onClose,
  onSubmit,
  submitBtnText = "Save",
}) {
  if (!isOpen) return null;

  return (
    <div>
      {isOpen && createPortal(
        <div className="modal-custom">
          <div>
            <p className="close-icon pointer" onClick={onClose}>
              X
            </p>
          </div>
          {children}
          <div className="modal-footer">
            <Button variant={"red"} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={onSubmit}>
              {submitBtnText}
          
            </Button>
          </div>
        </div>,
        document.getElementById("modal")
      )}
    </div>
  );
}
