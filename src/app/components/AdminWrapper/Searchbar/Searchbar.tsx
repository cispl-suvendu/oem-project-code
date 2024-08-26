"use client";

import useSearchHook from "@/src/app/hooks/useSearch";

export default function SearchBar() {
  const { searchChangeEvent } = useSearchHook();

  return (
    <>
      <div className="u-search position-relative">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          onChange={searchChangeEvent}
        />
      </div>
    </>
  );
}
