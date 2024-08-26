import React, { useState } from "react";
import { useFilterContext } from "../../context/filterContext";
import { useParams, usePathname } from "next/navigation";

export default function Pagination({ countData, handleRefetch }) {
  const pathname = usePathname();
  const params = useParams();
  const { searchText, active, limit, role } = useFilterContext();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(countData[0]?.rowCount / limit);
  const totalPagesArray = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const getPagenationData = (i: number) => {
    setCurrentPage(i);
    const payload = {
      searchText,
      active,
      limit,
      page: i,
    };
    if (pathname === "/users") {
      handleRefetch({ ...payload, role });
    } else if (pathname.startsWith("/categories") && !!params.subcat) {
      handleRefetch({
        ...payload,
        cat_id: params.subcat,
      });
    } else {
      handleRefetch(payload);
    }
  };
  return (
    <>
      {countData[0]?.rowCount > limit ? (
        <div>
          <div className="d-flex align-items-center justify-content-center">
            Showing page {currentPage} of {totalPages}
          </div>
          <div className="d-flex align-items-center justify-content-center my-4">
            <nav>
              <ul className="pagination">
                {totalPagesArray.map((i) => {
                  return (
                    <li className="page-item" key={i}>
                      <button
                        className="page-link"
                        onClick={() => getPagenationData(i)}
                      >
                        {i}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
