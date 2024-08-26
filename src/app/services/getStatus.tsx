export const getStatus = (active: number) => {
  if (active === 1) {
    return (
      <div className="alert alert-success status-badge p-0" role="alert">
        Active
      </div>
    );
  } else if (active === 2) {
    return (
      <div className="alert alert-warning status-badge p-0" role="alert">
        In Active
      </div>
    );
  } else {
    return (
      <div className="alert alert-danger status-badge p-0" role="alert">
        Delete
      </div>
    );
  }
};

export const statusData = [
  {
    name: "Active",
    id: 1,
  },
  {
    name: "Inactive",
    id: 2,
  },
  {
    name: "Delete",
    id: 0,
  },
];
