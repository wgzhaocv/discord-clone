import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { v4 as uuid } from "uuid";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("not Authrized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profieId: profile.id,
        name,
        imageUrl,
        inviteCode: uuid(),
        Channel: {
          create: [{ name: "general", profileId: profile.id }],
        },
        Member: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[ERROR POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
