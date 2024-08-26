"use client";
import { useParams } from "next/navigation";
import { ReactElement, useEffect, useRef, useState } from "react";
import { input } from "zod";

export interface IFilters {
  active?: number;
  limit?: number;
  page?: number;
  searchText?: string;
  [key: string]: any; // Allow additional properties
}

const useSearchHook = () => {
  const params = useParams();
  const [searchKey, setSearchKey] = useState<string | null>("");
  const [filterStatus, setFilterStatus] = useState<number | null>();
  const [itemPerPage, setItemPerPage] = useState<number | null>();
  const [currentPage, setCurrentPage] = useState<number | null>();

  const [searchParms, setSearchParms] = useState({
    active: 1,
    limit: 10,
    page: 1,
    searchText: "",
  });

  const inputReff = useRef<ReactElement<HTMLInputElement>>(null);

  const updateAllFilter = (payload: IFilters): void => {
    setSearchKey(payload.searchText || "");
    setFilterStatus(payload.active);
    setItemPerPage(payload.limit);
    setCurrentPage(payload.page);
    setSearchParms({
      active: payload.active,
      limit: payload.limit,
      page: payload.page,
      searchText: payload.searchText,
    });
  };

  const clearAllFilter = () => {
    setSearchKey("");
    setFilterStatus(1);
    setItemPerPage(10);
    setCurrentPage(1);
    setSearchParms({
      active: 1,
      limit: 10,
      page: 1,
      searchText: "",
    });
  };

  const searchChangeEvent = (e) => {
    console.log(e, e.target.value);
    setSearchKey(e.target.value);
    setSearchParms({
      active: searchParms.active,
      limit: searchParms.limit,
      page: searchParms.page,
      searchText: searchKey,
    });

    
  };

  

  const getSerachKey = () => {
    return searchParms;
  };

  useEffect(() => {
    clearAllFilter();
  }, [params]);

  return {
    searchKey,
    setSearchKey,
    filterStatus,
    setFilterStatus,
    itemPerPage,
    setItemPerPage,
    clearAllFilter,
    currentPage,
    setCurrentPage,
    updateAllFilter,
    searchChangeEvent,
    getSerachKey,
    inputReff,
    searchParms,
    setSearchParms,
  };
};

export default useSearchHook;
