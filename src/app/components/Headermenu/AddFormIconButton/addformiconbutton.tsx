import { MdAdd } from "react-icons/md";

export default function AddFormIconButton({ handleOpen, addButton }) {
  return (
    <div className="pointer d-flex align-items-center gap-2 add_button" onClick={() => handleOpen({flag:"add"})}>
      <MdAdd />
      <span>Add {addButton}</span>
    </div>
  );
}
