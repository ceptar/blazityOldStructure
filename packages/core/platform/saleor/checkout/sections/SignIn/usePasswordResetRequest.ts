import { useEffect, useState } from "react";
import { useRequestPasswordResetMutation } from "@enterprise-commerce/core/platform/saleor/checkout/graphql";
import { useAlerts } from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useAlerts";
import { useSubmit } from "@enterprise-commerce/core/platform/saleor/checkout/hooks/useSubmit/useSubmit";
import { getCurrentHref } from "@enterprise-commerce/core/platform/saleor/checkout/lib/utils/locale";

interface PasswordResetFormData {
  email: string;
  shouldAbort: () => Promise<boolean>;
}

export const usePasswordResetRequest = ({
  email,
  shouldAbort,
}: PasswordResetFormData) => {
  const { showSuccess } = useAlerts();

  const [, requestPasswordReset] = useRequestPasswordResetMutation();

  const [passwordResetSent, setPasswordResetSent] = useState(false);

  const onSubmit = useSubmit<{}, typeof requestPasswordReset>({
    scope: "requestPasswordReset",
    onSubmit: requestPasswordReset,
    shouldAbort,
    onSuccess: () => {
      setPasswordResetSent(true);
      showSuccess(`A magic link has been sent to ${email}`);
    },
    parse: ({ channel }) => ({ email, redirectUrl: getCurrentHref(), channel }),
  });

  useEffect(() => {
    setPasswordResetSent(false);
  }, [email]);

  return {
    onPasswordResetRequest: () => {
      void onSubmit();
    },
    passwordResetSent,
  };
};
