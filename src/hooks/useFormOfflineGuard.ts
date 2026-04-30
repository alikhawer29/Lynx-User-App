import { useEffect, useRef } from 'react';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

/**
 * Shows a screen-specific toast when the network drops while the user has
 * unsaved data in a form.
 *
 * Instead of the generic "No Internet Connection" toast, the user sees:
 *   "[label] — Data Not Saved"
 *   "Your form data cannot be submitted without internet."
 *
 * @param label      Human-readable screen / section name shown in the toast
 * @param getIsDirty Callback called at the moment of network drop — return true
 *                   if the form contains data worth warning about.
 *                   Use a callback (not a value) so the hook always reads the
 *                   latest state from Formik refs or local variables without
 *                   requiring reactive re-subscriptions.
 *
 * @example
 *   // Formik-based screen
 *   useFormOfflineGuard('Register', () => !!formik_ref.current?.dirty);
 *
 *   // Custom state screen
 *   useFormOfflineGuard('Book Service', () => !!firstName || !!phone || !!email);
 */
export const useFormOfflineGuard = (
  label: string,
  getIsDirty: () => boolean,
) => {
  // Always hold the latest callback without re-subscribing NetInfo
  const getDirty = useRef(getIsDirty);
  useEffect(() => {
    getDirty.current = getIsDirty;
  });

  const previouslyConnected = useRef<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const isConnected = state.isConnected;

      // Ignore the initial "state unknown" emission
      if (isConnected === null) return;

      if (!isConnected && previouslyConnected.current === true) {
        // Network just dropped — check if the form has data worth flagging
        if (getDirty.current()) {
          // Small delay so this toast replaces the generic "No Internet
          // Connection" toast from useNetworkStatus (which fires first).
          setTimeout(() => {
            Toast.show({
              type: 'error',
              text1: `${label} — Data Not Saved`,
              text2:
                'Your form data cannot be submitted without internet connection.',
              autoHide: false,
              position: 'top',
            });
          }, 150);
        }
      }

      previouslyConnected.current = isConnected;
    });

    return () => unsubscribe();
    // label is intentionally in deps — if the label changes the listener
    // teardown / re-setup is cheap and ensures the ref closure is fresh.
  }, [label]);
};
