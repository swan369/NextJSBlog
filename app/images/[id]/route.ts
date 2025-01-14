import { getImage } from "@/app/lib/fetch";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const paramsAwait = await params;
  const id = paramsAwait.id;

  // already converted to buffer and is an object {data:<Buffer.., type: 'image/png'}
  const image = await getImage(id);

  //   {
  //   data: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 03 24 00 00 01 a7 08 06 00 00 00 46 b1 93 5b 00 00 0a aa 69 43 43 50 49 43 43 20 50 72 6f 66 69 ... 53929 more bytes>,
  //   type: 'image/png'
  // }
  // console.log("in GET:", image);

  if (!image) return new Response("image not found", { status: 404 });

  return new NextResponse(image.data, {
    headers: {
      "Content-Type": image.type,
      "Cache-Control": "public, max-age=31536000",
    },
  });
}
