import React, { useEffect, useRef } from "react";
import { useParams, usePathname } from "next/navigation";
import { statusData } from "@/src/app/services/getStatus";
import { useFilterContext } from "@/src/app/context/filterContext";

export default function SortOption({ filter, fetchCount }) {
  const params = useParams();
  const { searchText, active, setActive, limit, setLimit, page } =
    useFilterContext();
  const statusRef = useRef<HTMLSelectElement>(null);
  const itemsLimitRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const handleFilter = () => {
      const catId = Array.isArray(params.subcat)
        ? params.subcat[0]
        : params.subcat;
      const payload = {
        active,
        searchText,
        limit,
        page,
        cat_id: catId ? parseInt(catId) : undefined,
      };
      filter(payload);
      fetchCount(payload);
    };
    if (statusRef.current && statusRef.current === document.activeElement) {
      handleFilter();
    } else if (
      itemsLimitRef.current &&
      itemsLimitRef.current === document.activeElement
    ) {
      handleFilter();
    }
  }, [active, searchText, limit, page]);

  return (
    <div className="d-flex all_filter_option">
      <div className="filter_by">
        <label>Filter By</label>
        <select
          className="form-control"
          onChange={(e) => setActive(parseInt(e.target.value))}
          ref={statusRef}
          value={active}
        >
          {statusData.map((data) => {
            return (
              <option value={data.id} key={data.id}>
                {data.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="item_per_page">
        <label>Item Per Page</label>
        <select
          className="form-control"
          onChange={(e) => setLimit(parseInt(e.target.value))}
          ref={itemsLimitRef}
          value={limit}
        >
          <option>10</option>
          <option>20</option>
          <option>30</option>
          <option>50</option>
          <option>100</option>
          <option>200</option>
        </select>
      </div>
    </div>
  );
}
