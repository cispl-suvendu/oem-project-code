import { error, loading, success, promise } from '@/src/helper/toaster';
import { useState } from 'react';
type ApiFunction<T> = (payload: T) => Promise<any>;
type CallbackFunction = (response?: any) => void;
import handleApiError from '../services/errorHandling';

export interface IresponseStatus {
  token: string;
  status: boolean
};

const usePostData = <T>(apiDetails: ApiFunction<T>, cb?: CallbackFunction) => {
  const [successStatus, setSuccessStatus] = useState<IresponseStatus>();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  const postData = async (payload: T) => {
    try {
      setLoadingStatus(true);
      const response = await apiDetails(payload);
      setSuccessStatus(response);
      response.message && success(response.message)
      if (cb) {
        cb(response);
      }

    } catch (errs: any) {
      setErrorStatus(true);
      handleApiError(errs)
    }

    finally {
      setLoadingStatus(false);
    }
  };

  return { success: successStatus, loading: loadingStatus, error: errorStatus, postData };
};

export default usePostData;
