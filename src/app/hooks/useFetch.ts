"use client";
import { useState, useEffect, useCallback, useRef } from 'react';
import handleApiError from '../services/errorHandling';

type ApiFunction<T> = (params?: T, signal?: AbortSignal) => Promise<any>;
type CallbackFunction = (response?: any) => void;

const useFetchData = <T>(
  apiFunction: ApiFunction<T>,
  initialParams?: T,
  cb?: CallbackFunction,
) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState(initialParams);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async (fetchParams?: T) => {
    // Abort any ongoing requests before starting a new one
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController for the current request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      setLoading(true);
      const response = await apiFunction(fetchParams, abortController.signal);
      if (response.success) {
        setData(response.data);
      } else {
        handleApiError("Failed to fetch data: Success flag is false");
      }
      if (cb) cb(response);
    } catch (error) {
      if (error.name !== 'AbortError') {
        handleApiError(error);
      }
    } finally {
      setLoading(false);
    }
  }, [apiFunction, cb]);

  useEffect(() => {
    fetchData(params);
    // Cleanup: abort fetch if component unmounts
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const refetch = useCallback((newParams?: T) => {
    setParams(newParams);
    fetchData(newParams);
  }, [fetchData]);

  return { data, loading, refetch };
};

export default useFetchData;
