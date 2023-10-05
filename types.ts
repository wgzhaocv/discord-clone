import { Server, Member, Profile } from "@prisma/client";

export type ServerWithMemberWithProfiles = Server & {
  Member: (Member & { profile: Profile })[];
};
