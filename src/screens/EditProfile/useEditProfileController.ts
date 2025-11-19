import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useModal } from '../../contexts/ModalContext';
import useImage from '../../hooks/useImage';
import { useEditProfileMutation } from '../../redux/Apis/User';
import { selectUser } from '../../redux/Slices/AuthSlice';
import { LANGUAGES } from '../../utils/data';
import { formHandler } from '../../utils/helper';
import { goBack } from '../../utils/navigation';
import { EDIT_PROFILE_SCHEMA } from '../../utils/validators';

const useEditProfileController = () => {
  const user = useSelector(selectUser);
  const formik_ref = useRef(null);
  const { showOkModal } = useModal();
  const { image, openGallery } = useImage();

  const initial = {
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    dialing_code: user?.dialing_code || '+971',
    country_code: user?.country_code || 'AE',
    phone: user?.phone || '',
    language: user?.language || '',
  };

  const [submit, { isSuccess, isLoading }] = useEditProfileMutation();

  useEffect(() => {
    if (isSuccess) {
      showOkModal(
        {
          type: 'success',
          title: 'Successfully',
          message: 'User Profile Has Been Updated Successfully',
        },
        () => goBack(),
        () => goBack(),
      );
    }
  }, [isSuccess]);

  const onSubmit = useCallback(
    (data: any) => {
      let payload = { ...data };

      if (image) {
        payload.image = image;
      }

      payload = formHandler(payload);

      submit(payload);
    },
    [image],
  );

  const onPressUpload = useCallback(() => {
    openGallery();
  }, []);

  return {
    refs: {
      formik_ref,
    },
    schema: EDIT_PROFILE_SCHEMA,
    values: {
      initial,
      isLoading,
      languages: LANGUAGES,
      image,
      user_image: user?.image_url,
    },
    functions: {
      onSubmit,
      onPressUpload,
    },
  };
};

export default useEditProfileController;
