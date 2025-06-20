import { createUploadthing, type FileRouter } from "uploadthing/next";
import { NextRequest } from "next/server";

const f = createUploadthing();

export const ourFileRouter = {
  productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => ({}))
    .onUploadComplete(async ({ file }) => {
      // You can store file.url in your DB if needed
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

// Next.js API route handler
import { createNextRouteHandler } from "uploadthing/next";

export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
}); 