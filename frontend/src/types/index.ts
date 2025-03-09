import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { AxiosError } from "axios";
import { TFunction } from "i18next";
export * from "./api";

export interface IFormElementProps {
  name: string;
  placeholder: string;
  t: TFunction;
  //! index signature
  required?: true | false;
  validations?: object;
  dir?: "rtl" | "ltr";
  Bgcolor?: "light" | "dark";
  label?: string;
  alignment?: "vertical" | "horizontal";
  disabled?: true | false;
  ServerErrors?: AxiosError | null;
  inputStyle?: string;
  value?: string | number;
  rows?: number;
  withIcon?: true | false;
  icon?: IconProp;
  confirmName?: string;
  confirmName2?: string;
  className?: string;
  btnText?: string;
  serverFileSrc?: string;
  fileFor?: string;
  confirmFor?: string;
  tooltip?: string;
  disableFormatting?: boolean;
}

export interface IUserData {
  _id: number;
  name: string;
  email: string;
}

export interface IHeadingsProps {
  children: React.ReactNode | string;
  className?: string;
  colored?: true | false;
}
