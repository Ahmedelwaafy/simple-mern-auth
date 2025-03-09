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

export default function Navbar() {
  const { logOut, isPending } = useHandleLogOut();
  const { data } = useFetchData<IUserData>(GET_PROFILE);
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="font-semibold text-lg">My Application</div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {avatarFallbackName(data?.name ?? "")}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{data?.name}</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button isPending={isPending} variant="ghost" className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogDescription>
                  Are you sure you want to log out of your account? You will
                  need to log in again to access your account.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-4 flex justify-between gap-5">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>

                <Button variant="destructive" onClick={logOut}>
                  Logout
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
