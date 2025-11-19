// useFaqsController.js
import { useEffect, useRef } from 'react';
import { useGetFAQsQuery } from '../../redux/Apis/Faqs';

const useFaqsController = () => {
  const formik_ref = useRef(null);

  const {
    data: faqsData,
    isLoading: contentLoading,
    error,
  } = useGetFAQsQuery({});

  useEffect(() => {
    if (error) {
      console.log('Error fetching FAQs data:', error);
    }
  }, [error]);

  return {
    refs: {
      formik_ref,
    },
    values: {
      contentData: faqsData?.data,
      contentLoading,
      error,
    },
  };
};

export default useFaqsController;
