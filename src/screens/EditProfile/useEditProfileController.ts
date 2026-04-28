import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useModal } from '../../contexts/ModalContext';
import useImage from '../../hooks/useImage';
import { useEditProfileMutation } from '../../redux/Apis/User';
import { selectUser } from '../../redux/Slices/AuthSlice';
import { LANGUAGES } from '../../utils/data';
import { formHandler } from '../../utils/helper';
import { goBack } from '../../utils/navigation';
import { clampNationalPhoneDigits } from '../../utils/phoneNationalDigits';
import { EDIT_PROFILE_SCHEMA } from '../../utils/validators';

const useEditProfileController = () => {
  const user = useSelector(selectUser);
  const formik_ref = useRef(null);
  const { showOkModal } = useModal();
  const { image, openGallery } = useImage();

  const initial = useMemo(() => {
    const cc = (user?.country_code || 'AE').toUpperCase();
    return {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      dialing_code: user?.dialing_code?.startsWith('+')
        ? user?.dialing_code
        : `+${user?.dialing_code || '971'}`,
      country_code: cc,
      phone: clampNationalPhoneDigits(String(user?.phone || ''), cc),
      language: user?.language || '',
    };
  }, [user]);

  const [submit, { isSuccess, isLoading, error }] = useEditProfileMutation();

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

  useEffect(() => {
    if (error) {
      console.error('Profile update error:', error);
      const errorMessage =
        'data' in error
          ? (error as any).data?.message
          : 'Failed to update profile. Please try again.';

      showOkModal(
        {
          type: 'error',
          title: 'Update Failed',
          message: errorMessage,
        },
        undefined,
        undefined,
      );
    }
  }, [error]);

  const onSubmit = useCallback(
    (data: any) => {
      console.log('=== FORM SUBMISSION START ===');
      console.log('Form data submitted:', data);

      let payload = { ...data };

      if (image) {
        payload.image = image;
        console.log('Image attached:', image);
      }

      // Remove empty values and send as JSON instead of FormData
      Object.keys(payload).forEach(key => {
        if (
          payload[key] === '' ||
          payload[key] === null ||
          payload[key] === undefined
        ) {
          delete payload[key];
        }
      });

      console.log('Final payload:', payload);
      console.log('Calling submit API...');

      submit(payload)
        .unwrap()
        .then((result: any) => {
          console.log('Submit successful:', result);
        })
        .catch((error: any) => {
          console.error('Submit failed:', error);
        });

      console.log('=== FORM SUBMISSION END ===');
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
