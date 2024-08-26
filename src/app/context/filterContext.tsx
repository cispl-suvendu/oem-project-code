"use client";
import { usePathname } from "next/navigation";
import React, {useLayoutEffect } from "react";
import { createContext, useContext, useState, ReactNode } from "react";

interface IFilterContext {
  active?: number;
  limit?: number;
  page?: number;
  searchText?: string;
  [key: string]: any; // Allow additional properties
}

const FilterContext = createContext<IFilterContext | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const pathname = usePathname();
  const [searchText, setSearchText] = useState<string | null>("");
  const [active, setActive] = useState<number | null>(1);
  const [limit, setLimit] = useState<number | null>(10);
  const [page, setPage] = useState<number | null>(1);
  const [role, setRole] = useState<number[]>([0, 1]);
  const updateFilter = (payload: IFilterContext): void => {
    setSearchText(payload.searchText || "");
    setActive(payload.active);
    setLimit(payload.limit);
    setPage(payload.page);
  };

  useLayoutEffect(() => {
    setSearchText("");
    setActive(1);
    setLimit(10);
    setPage(1);
  }, [pathname]);

  const value: IFilterContext = {
    searchText,
    setSearchText,
    active,
    setActive,
    limit,
    setLimit,
    page,
    setPage,
    role,
    setRole,
    updateFilter,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export default FilterContext;

export const useFilterContext = () => {
  return useContext(FilterContext);
};
