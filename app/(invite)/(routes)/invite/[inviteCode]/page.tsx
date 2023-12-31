import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodeProps {
  params: {
    inviteCode: string;
  };
}

const inviteCode = async ({ params: { inviteCode } }: InviteCodeProps) => {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();
  if (!inviteCode) return redirect("/");

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode,
      Member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (existingServer) return redirect(`/servers/${existingServer.id}`);
  const server = await db.server.update({
    where: {
      inviteCode,
    },
    data: {
      Member: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  if (server) return redirect(`/servers/${server.id}`);
  return null;
};

export default inviteCode;
