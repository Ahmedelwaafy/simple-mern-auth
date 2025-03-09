import { useAppDispatch } from "@/app/reduxHooks";
import {
  CheckBox,
  EmailComponent,
  PasswordComponent,
} from "@/components/FormComponents";
import Captcha from "@/components/FormComponents/Captcha";
import {
  Heading,
  HelmetTags,
  LangLink,
  Logo,
  SubHeading,
} from "@/components/MainComponents";
import { Button } from "@/components/ui/button";
import { routes } from "@/Constants/Routes";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signInSchema, signInType } from "./auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostData } from "@/Hooks/useFetch";
import Cookies from "js-cookie";
import ReCAPTCHA from "react-google-recaptcha";
import { setUserSession } from "@/app/Features/AuthenticationSlice";
import { SIGNIN } from "@/services/api/queries";
import { IUserData } from "@/types";

export function Component() {
  const { t, i18n } = useTranslation("Pages_Login");
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const dispatchRedux = useAppDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const captchaRef = useRef<ReCAPTCHA | null>(null);

  const schema = signInSchema(t);
  const methods = useForm<signInType>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      remember_me: false,
    },
  });

  const { mutate: sigIn, isPending } = usePostData<IUserData, signInType>(
    SIGNIN,
    {
      onSuccess: () => {
        captchaRef?.current?.reset();
        Cookies.set("Auth-State", "true");
        dispatchRedux(setUserSession("true"));
        queryClient.clear();
        methods.reset();
        navigate(`/${lang}`);
      },
      onError: () => {
        captchaRef?.current?.reset();
      },
    }
  );

  const onSubmit = async (data: signInType) => {
    try {
      console.log(data);
      const { remember_me, ...body } = data;
      await captchaRef?.current?.executeAsync();
      sigIn({
        body,
      });
    } catch (error) {
      toast.error(
        "Cannot contact reCAPTCHA. Check your connection and try again."
      );
    }
  };

  return (
    <section className="custom__pattern flex-col-center w-full min-h-screen px-5 py-7 ss:px-3">
      <HelmetTags
        title={t("tab.title")}
        description={t("tab.description")}
        canonical="login"
      />

      <Logo className="text-secondary" />
      <Heading className="mt-3  text-secondary">
        {t("LoginForm.heading")}
      </Heading>
      <SubHeading className="text-balance text-center mb-3 text-secondary">
        {t("LoginForm.welcome_msg")}
      </SubHeading>

      <FormProvider {...methods}>
        <form
          encType="multipart/form-data"
          method="post"
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex-col-center w-1/5 md:w-10/12 min-w-[450px] md:min-w-[300px] gap-1 border py-5 px-7 border-muted rounded-3xl shadow-xl hover:animated-blob"
        >
          {/** Email  */}
          <EmailComponent
            t={t}
            name="email"
            className="w-full"
            label={t("LoginForm.email.label")}
            placeholder={t("LoginForm.email.placeholder")}
          />
          {/** Password  */}
          <PasswordComponent
            t={t}
            name="password"
            className="w-full"
            label={t("LoginForm.password.label")}
            placeholder={t("LoginForm.password.placeholder")}
          />

          {/** Remember me & forget password  */}

          <div className="flex w-full items-start justify-between gap-10  md:gap-6 sm:gap-7 sm:flex-col">
            <CheckBox
              name="remember_me"
              label={t("LoginForm.remember_me.label")}
              className="text-sm"
            />
            <h3 className="text-input underline underline-offset-4 text-sm cursor-default">
              {t("LoginForm.Forgot_password")}
            </h3>
          </div>
          <Captcha ref={captchaRef} lang={lang} />
          {/** Submit Button */}
          <Button
            disabled={!methods.formState.isValid || isPending}
            isPending={isPending}
            className="mt-3  w-full"
          >
            {t("LoginForm.SubmitBtnComponent.value")}
          </Button>
          <div className="w-full flex justify-center items-center gap-1 text-sm mt-3 text-secondary">
            {t("LoginForm.have_no_account")}
            <LangLink
              href={routes.signup}
              className="font-semibold text-base cursor-pointer"
            >
              {t("LoginForm.register")}{" "}
            </LangLink>
          </div>
        </form>{" "}
      </FormProvider>
    </section>
  );
}
