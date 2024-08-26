import React from "react";

export default function DeleteQuestionConfirmation({
  itemName,
  itemId,
  handleDelete,
  handleDeleteClose,
}) {
  const payload = {
    q_id: itemId,
    active: 0,
  };
  const deleteItem = () => {
    handleDelete(payload);
  };
  return (
    <div>
      <p>
        Are you sure you want to delete <strong>{itemName}</strong>
      </p>
      <div className="d-flex gap-4">
        <button
          className="btn btn-lg custom-btn rounded-pill"
          onClick={() => deleteItem()}
        >
          Delete
        </button>
        <button onClick={() => handleDeleteClose()}>Cancel</button>
      </div>
    </div>
  );
}
