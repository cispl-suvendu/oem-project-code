import React from "react";

export default function DeleteConfirmation({
  itemName,
  itemId,
  handleDelete,
  handleDeleteClose,
}) {
  const deleteItem = (itemId: number) => {
    handleDelete(itemId);
    handleDeleteClose();
  };
  return (
    <div>
      <p>
        Are you sure you want to delete <strong>{itemName}</strong>
      </p>
      <div className="d-flex gap-4">
        <button
          className="btn btn-lg custom-btn rounded-pill"
          onClick={() => deleteItem(itemId)}
        >
          Delete
        </button>
        <button onClick={() => handleDeleteClose()}>Cancel</button>
      </div>
    </div>
  );
}
