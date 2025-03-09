import { cn } from "@/lib/utils";
import { IFormElementProps } from "@/types";
import {
  faEye,
  faEyeSlash,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import FieldError from "./FieldError";
function PasswordComponent({
  name,
  label = "",
  placeholder,
  required = true,
  className,
  inputStyle,
  dir,
  Bgcolor = "light",
  alignment = "vertical",
  withIcon = true,
  disabled,
}: IFormElementProps) {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext();
  const [hide, setHide] = useState(false);
  return (
    <label
      className={cn(
        `flex w-1/2 md:w-full   ${
          alignment === "vertical"
            ? "flex-col gap-[10px] items-start "
            : "gap-6   md:h-auto  items-center md:flex-col md:gap-2 md:items-start"
        } ${label ? "h-[98px]" : "h-[64px]"} justify-start relative  `,
        className
      )}
      htmlFor={name}
    >
      {label && (
        <h3
          className={`text-base  ${
            alignment === "vertical" ? "min-w-fit " : "min-w-[210px] truncate"
          } trns ${errors?.[name] ? " text-error " : ""}`}
        >
          {label}
        </h3>
      )}
      <div className="flex-col items-start  justify-center gap-0 w-full ">
        <div className="w-full relative">
          <input
            disabled={disabled}
            dir={dir}
            className={`w-full peer ${
              withIcon
                ? "px-9  focus:px-9  "
                : "pr-9 focus:pr-9 rtl:pr-auto rtl:pl-9 rtl:focus:pl-9"
            }  ${
              Bgcolor === "dark" ? "dark-bg-inputs" : "light-bg-inputs"
            }  ${inputStyle} ${
              errors?.[name]
                ? "shadow-error focus:shadow-error text-error focus:text-error placeholder:text-error focus:placeholder:text-error "
                : ""
            } ${disabled && "opacity-50 cursor-not-allowed"}`}
            type={`${hide ? "text" : "password"}`}
            id={name}
            placeholder={placeholder}
            autoComplete="off"
            {...register(`${name}`, {
              required: required,
            })}
          />
          {withIcon && (
            <FontAwesomeIcon
              className={`.input__icon w-4 trns absolute left-3 rtl:left-auto rtl:right-3   peer-focus:opacity-100 peer-focus:animate-jump  ${
                dirtyFields?.[name] ? "opacity-100" : "opacity-50"
              } ${label ? "top-[11px]" : "top-[11px]"} ${
                errors?.[name] ? " text-error " : ""
              }`}
              icon={dirtyFields?.[name] ? faUnlock : faLock}
            />
          )}
          <FontAwesomeIcon
            onClick={() => setHide(!hide)}
            className={`absolute right-3 rtl:right-auto rtl:left-3 -translate-y-1/2 top-1/2 h-4 w-4 cursor-pointer ${
              errors?.[name] ? " text-error " : ""
            }`}
            icon={hide ? faEye : faEyeSlash}
          />
        </div>
        <FieldError error={errors?.[name]?.message as string} />
      </div>
    </label>
  );
}

export default PasswordComponent;
