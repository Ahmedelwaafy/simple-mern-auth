import { cn } from "@/lib/utils";
import { IFormElementProps } from "@/types";
import { faCircleInfo, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormContext } from "react-hook-form";
import FieldError from "./FieldError";

function TextComponent({
  name,
  label = "",
  placeholder,
  required = true,
  inputStyle,
  dir,
  Bgcolor = "light",
  alignment = "vertical",
  withIcon = true,
  icon,
  disabled = false,
  className,
  tooltip,
}: IFormElementProps) {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext();
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
          className={`text-base flex items-center gap-1 whitespace-nowrap ${
            alignment === "vertical" ? "min-w-fit " : "min-w-[210px] truncate"
          } trns ${errors?.[name] ? " text-error " : ""}`}
        >
          {label}{" "}
          {tooltip && (
            <FontAwesomeIcon
              className="text-sm max-w-[20px] max-h-[20px] pt-0.5"
              title={tooltip}
              icon={faCircleInfo}
            />
          )}
        </h3>
      )}
      <div className="flex-col items-start  justify-center gap-0 w-full ">
        <input
          dir={dir}
          disabled={disabled}
          className={`w-full peer ${
            withIcon && "pl-9 focus:pl-9 rtl:pl-0 rtl:pr-9 rtl:focus:pr-9 "
          }  ${
            Bgcolor === "dark" ? "dark-bg-inputs" : "light-bg-inputs"
          } ${inputStyle} ${
            errors?.[name]
              ? "shadow-error focus:shadow-error text-error focus:text-error placeholder:text-error focus:placeholder:text-error "
              : ""
          }`}
          type="text"
          id={name}
          placeholder={placeholder}
          autoComplete="off"
          {...register(`${name}`, {
            required: required,
          })}
        />{" "}
        {withIcon && (
          <FontAwesomeIcon
            className={`.input__icon w-4 trns absolute left-3 rtl:left-auto rtl:right-3   peer-focus:opacity-100 peer-focus:animate-jump   ${
              dirtyFields?.[name] ? "opacity-100" : "opacity-50"
            } ${label ? "top-[45px]" : "top-[11px]"} ${
              errors?.[name] ? " text-error " : ""
            }`}
            icon={icon ? icon : faUser}
          />
        )}
        <FieldError error={errors?.[name]?.message as string} />
      </div>
    </label>
  );
}

export default TextComponent;
