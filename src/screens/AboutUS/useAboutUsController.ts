// useAboutUsController.js
import { useEffect, useRef } from 'react';
import { useGetContentQuery } from '../../redux/Apis/General';

const useAboutUsController = () => {
  const formik_ref = useRef(null);

  // Use the specific content endpoint
  const {
    data: contentData,
    isLoading: contentLoading,
    error,
  } = useGetContentQuery({});

  useEffect(() => {
    if (error) {
      console.log('Error fetching about us data:', error);
    }
  }, [error]);

  return {
    refs: {
      formik_ref,
    },
    values: {
      contentData: contentData?.data,
      contentLoading,
      error,
    },
  };
};

export default useAboutUsController;
