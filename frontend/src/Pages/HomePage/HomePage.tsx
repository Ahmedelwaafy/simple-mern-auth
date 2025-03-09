"use client";

import type React from "react";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useTranslation } from "react-i18next";
import { HelmetTags } from "@/components/MainComponents";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchData, usePostData } from "@/Hooks/useFetch";
import { ADD_SUBJECT, GET_SUBJECTS_LIST } from "@/services/api/queries";
import { ScrollArea } from "@/components/ui/scroll-area";

type Subject = {
  name: string;
  user: string;
};

export function Component() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation("HomePage");
  const queryClient = useQueryClient();

  const { data: subjects, isPending } =
    useFetchData<Subject[]>(GET_SUBJECTS_LIST);
  console.log(subjects);
  const { mutate: addSubject, isPending: isPendingAddingSubject } = usePostData<
    Subject,
    { name: string }
  >(ADD_SUBJECT, {
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [GET_SUBJECTS_LIST],
      });
      // Clear the input
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const subject = inputRef.current?.value.trim();
    if (!subject) return;
    addSubject;

    addSubject({ body: { name: subject } });
  };

  return (
    <>
      <HelmetTags
        title={t("tab.title")}
        description={"meta_description"}
        canonical=""
      />

      {/* Main Content */}
      <section className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center">
            Welcome to the application.
          </h1>

          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Enter your favorite subject"
                className="flex-1   h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                disabled={isPendingAddingSubject}
              />
              <Button
                type="submit"
                disabled={isPendingAddingSubject}
                isPending={isPendingAddingSubject}
                className="min-w-20"
              >
                Add Subject
              </Button>
            </form>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Your Favorite Subjects</h2>

              {isPending ? (
                // Skeleton loading state
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, item) => (
                    <Skeleton key={item} className="h-12 w-full rounded-md" />
                  ))}
                </div>
              ) : subjects?.length === 0 ? (
                <p className="text-muted-foreground">No subjects added yet.</p>
              ) : (
                <ScrollArea className="h-[280px]  p-4 rounded-md border">
                  <ul className="space-y-2">
                    {subjects?.map((item, index) => (
                      <li key={index} className="p-2 rounded-md border text-sm">
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
