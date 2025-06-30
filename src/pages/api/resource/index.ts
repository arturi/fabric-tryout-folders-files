// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Resource } from "@/types/Resource";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

type Data =
  | Resource
  | { error: string };



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  /**
   * Accepts ResourceApiInput
   */
  if (req.method === "POST") {
    const data = JSON.parse(req.body);

    const { name, mimeType, size, kind, parentId } = data;

    ['name', 'mimeType', 'size', 'kind', 'parentId'].forEach((item) => {
      if (data[item] === undefined) {
        return res.status(400).json({ error: `${item} is required` });
      }
    });
    
    return res.status(201).json({
      id: v4(),
      name,
      mimeType,
      size,
      kind,
      parentId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
