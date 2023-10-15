"use client";

import qs from "query-string";

import { Video, VideoOff } from "lucide-react";

import { ActionTooltip } from "../action-tooltip";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const ChatVideoButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isVideo = searchParams?.get("video");

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: {
          video: isVideo ? undefined : true,
        },
      },
      { skipNull: true }
    );
    router.push(url);
  };

  const Icon = isVideo ? VideoOff : Video;
  const tooltipLabel = isVideo ? "Turn off video" : "Turn on video";
  return (
    <ActionTooltip side="bottom" label={tooltipLabel}>
      <button className="hover:opacity-75 transition mr-4" onClick={onClick}>
        <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
      </button>
    </ActionTooltip>
  );
};
