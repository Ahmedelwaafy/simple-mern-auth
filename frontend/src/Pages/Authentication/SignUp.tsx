import {
  CheckBox,
  EmailComponent,
  PasswordComponent,
  TextComponent,
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
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signUpSchema, signUpType } from "./auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostData } from "@/Hooks/useFetch";
import { SIGNUP } from "@/services/api/queries";
import { IUserData } from "@/types";

export function Component() {
  const { t, i18n } = useTranslation("Register_Page");
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const navigate = useNavigate();

  const captchaRef = useRef<ReCAPTCHA | null>(null);
  const schema = signUpSchema(t);

  const methods = useForm<signUpType>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate: sigUp, isPending } = usePostData<IUserData, signUpType>(
    SIGNUP,
    {
      onSuccess: () => {
        captchaRef?.current?.reset();
        methods.reset();
        navigate(`/${lang}${routes.signin}`);
      },
      onError: () => {
        captchaRef?.current?.reset();
      },
    }
  );
  const onSubmit = async (body: signUpType) => {
    try {
      await captchaRef?.current?.executeAsync();
      sigUp({
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
        canonical="register"
      />
      <Logo className="" />
      <Heading className="mt-3   ">{t("heading")}</Heading>
      <SubHeading className="text-balance text-center mb-3 ">
        {t("welcome_msg")}
      </SubHeading>

      <FormProvider {...methods}>
        <form
          encType="multipart/form-data"
          method="post"
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex-col-center w-1/5 md:w-10/12 min-w-[450px] md:min-w-[300px] gap-1 border py-5 px-7 border-primary rounded-3xl shadow-xl hover:animated-blob"
        >
          {/** Name  */}
          <TextComponent
            t={t}
            name="name"
            className="w-full"
            label={t("form.name.label")}
            placeholder={t("form.name.placeholder")}
          />
          {/**   Email */}
          <EmailComponent
            t={t}
            name="email"
            className="w-full"
            label={t("form.email.label")}
            placeholder={t("form.email.placeholder")}
          />{" "}
          {/** Password  */}
          <PasswordComponent
            t={t}
            name="password"
            className="w-full"
            label={t("form.password.label")}
            placeholder={t("form.password.placeholder")}
          />
          {/** accept_condition  */}
          <div className=" flex  w-full flex-col items-start justify-start gap-2  min-h-[0px] ">
            <CheckBox
              required
              name="accept_condition"
              label=""
              className="truncate px-0.5 text-sm"
            >
              <div>
                {t("form.terms.txt")}{" "}
                <p className="font-medium underline underline-offset-4 inline cursor-default">
                  {t("form.terms.CTA")}
                </p>
              </div>
            </CheckBox>
          </div>
          <Captcha ref={captchaRef} lang={lang} />
          {/** Submit Button */}
          <Button
            disabled={!methods.formState.isValid || isPending}
            isPending={isPending}
            className="mt-3  w-full"
          >
            {t("form.SubmitBtnComponent.value")}
          </Button>
          <div className="w-full flex justify-center items-center gap-1 text-sm mt-3 ">
            {t("form__bottom.have_an_account")}
            <LangLink
              href={routes.signin}
              className="font-bold text-base cursor-pointer"
            >
              {t("form__bottom.Login")}
            </LangLink>
          </div>
        </form>{" "}
      </FormProvider>
    </section>
  );
}
