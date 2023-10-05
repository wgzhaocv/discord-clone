import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import ServerHeader from "./server-header";

interface ServerSidebarProps {
  serverId: string;
}

const ServerSIdeBar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();
  if (!profile) return redirect("/");
  const server = await db.server.findUnique({
    where: {
      id: serverId,
      Member: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      Channel: {
        orderBy: { createdAt: "asc" },
      },
      Member: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
  if (!server) return redirect("/");
  const textChannels = server.Channel.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server.Channel.filter(
    (channel) => channel.type === ChannelType.AUDIOE
  );
  const videoChannels = server.Channel.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const members = server.Member.filter(
    (member) => member.profileId !== profile.id
  );

  const role = server.Member.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};

export default ServerSIdeBar;
