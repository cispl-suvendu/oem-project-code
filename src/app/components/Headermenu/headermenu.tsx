import React from "react";
import TypeTitle from "./TypeTitle/typetitle";
import AddFormIconButton from "./AddFormIconButton/addformiconbutton";
import SortOption from "./SortOption/sortoption";

export default function HeaderMenu({ type, handleOpen, addButton, filter, fetchCount }) {
  
  return (
    <div className="all-test-info common_header">
      <div className="row align-items-center selection_item_header">
        <div className="col-3 selection_item_left">
        <TypeTitle type={type}/>
        </div>
        <div className="col-9 d-flex selection_item_right">
          <AddFormIconButton handleOpen={handleOpen} addButton={addButton} /> 
          <SortOption filter={filter} fetchCount={fetchCount}/>
        </div>
      </div>
    </div>
  );
}
