import { setUserSession } from "@/app/Features/AuthenticationSlice";
import { useAppDispatch } from "@/app/reduxHooks";
import { SIGNOUT } from "@/services/api/queries";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { usePostData } from "./useFetch";

export default function useHandleLogOut() {
  const dispatchRedux = useAppDispatch();
  const { i18n } = useTranslation("");
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";

  function ResetUserAuthStates() {
    Cookies.remove("Auth-State");
    dispatchRedux(setUserSession(null));
    window.location.replace(`/${lang}`);
  }

  const { mutate: sigOut, isPending } = usePostData(SIGNOUT, {
    onSuccess: () => {
      ResetUserAuthStates();
    },
    onError: () => {
      ResetUserAuthStates();
    },
  });

  function logOut() {
    sigOut({
      body: {},
    });
  }

  return {
    logOut,
    isPending,
  };
}
