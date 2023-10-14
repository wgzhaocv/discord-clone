// import { currentProfilePages } from "@/lib/current-profile-pages";
// import { db } from "@/lib/db";
// import { NextApiResponseWithServerIO } from "@/types";
// import { NextApiRequest } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponseWithServerIO
// ) {
//   if (req.method !== "POST")
//     return res.status(405).json({ message: "Method not allowed" });
//   try {
//     const profile = await currentProfilePages(req);
//     const { content, fileUrl } = req.body;
//     const { conversationId } = req.query;
//     if (!profile) return res.status(401).json({ message: "Unauthorized" });
//     if (!conversationId)
//       return res.status(400).json({ message: "Conversation id  missing" });

//     if (!content)
//       return res.status(400).json({ message: "Content id  missing" });

//     const server = await db.server.findFirst({
//       where: {
//         id: serverId as string,
//         Member: {
//           some: {
//             profileId: profile.id,
//           },
//         },
//       },

//       include: {
//         Member: true,
//       },
//     });
//     if (!server) return res.status(404).json({ message: "Server not found" });

//     const member = server.Member.find(
//       (member) => member.profileId === profile.id
//     );
//     if (!member) return res.status(404).json({ message: "Member not found" });

//     const message = await db.message.create({
//       data: {
//         content,
//         fileUrl,
//         channelId: channelId as string,
//         memberId: member.id,
//       },
//       include: {
//         member: {
//           include: {
//             profile: true,
//           },
//         },
//       },
//     });

//     const channelKey = `chat:${channelId}:messages`;
//     res.socket.server.io.emit(channelKey, message);
//     return res.status(200).json(message);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// }
