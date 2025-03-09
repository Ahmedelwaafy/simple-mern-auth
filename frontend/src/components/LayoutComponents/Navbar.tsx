"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { GET_PROFILE } from "@/services/api/queries";
import { useFetchData } from "@/Hooks/useFetch";
import { avatarFallbackName } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import useHandleLogOut from "@/Hooks/useHandleLogOut";
import { IUserData } from "@/types";
import { ModeToggle } from "./ModeToggle";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { logOut, isPending } = useHandleLogOut();
  const { t, i18n } = useTranslation("Layout");
  const lng = i18n.language;
  const { data } = useFetchData<IUserData>(GET_PROFILE);
  function changeLanguage(lang: string) {
    if (lng !== lang) {
      i18n.changeLanguage(lang);
      const temp = window.location.href.split("/");
      temp[3] = lang;
      console.log(temp);
      window.location.replace(temp.join("/"));
    }
  }
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="font-semibold text-lg">{t("Navbar.title")}</div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {avatarFallbackName(data?.name ?? "")}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{data?.name}</span>
          </div>{" "}
          <div className="Navbar__top--actions--LanguageChanger flex gap-1 lg:hidden">
            <button
              className={`trns hover:opacity-100  ${
                lng === "en" ? "font-bold " : "opacity-70"
              }`}
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>
            /
            <button
              className={`trns hover:opacity-100  ${
                lng === "ar" ? "font-bold " : "opacity-70"
              }`}
              onClick={() => changeLanguage("ar")}
            >
              AR
            </button>
          </div>
          <ModeToggle />
          <Dialog>
            <DialogTrigger asChild>
              <Button isPending={isPending} variant="ghost" className="gap-2">
                <LogOut className="h-4 w-4" />
                {t("Navbar.Logout")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t("LogOutPopUp.title")}</DialogTitle>
                <DialogDescription>
                  {t("LogOutPopUp.subtitle")}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-4 flex justify-between gap-5">
                <DialogClose asChild>
                  <Button variant="outline">{t("LogOutPopUp.Cancel")}</Button>
                </DialogClose>

                <Button variant="destructive" onClick={logOut}>
                  {t("LogOutPopUp.Confirm")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
