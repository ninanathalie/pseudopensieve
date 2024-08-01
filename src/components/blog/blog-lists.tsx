import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { format } from "date-fns";
import prisma from "@/lib/db";

export default async function RecentBlogs() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const recentPosts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="flex items-center justify-center flex-col w-10/12 3xl:w-2/4 max-w-[1440px]">
      <div className="flex w-full items-center justify-center mt-6 lg:mt-10 gap-4">
        <BentoGrid className="mx-auto md:auto-rows-[20rem]">
          {recentPosts.map((post, index) => {
            const formattedDate = format(new Date(post.createdAt), "MMMM dd, yyyy");

            const rowIndex = Math.floor(index / 2);
            const isEvenRow = rowIndex % 2 === 0;
            const gridClass = (isEvenRow ? index % 2 === 0 : index % 2 !== 0) ? "md:col-span-2" : "md:col-span-1";

            const body = post.body as string;
            const cleanExcerpt = body
              ?.replace(/<p[^>]*><\/p>/g, "")
              .replace(/<\/?p[^>]*>/g, "")
              .replace(/<h[1-6][^>]*><\/h[1-6]>/g, "")
              .replace(/<\/?h[1-6][^>]*>/g, "")
              .replace(/<br\s*\/?>/g, "")
              .trim();

            return <BentoGridItem key={post.id} title={post.title} description={cleanExcerpt} date={formattedDate} link={`/blogs/${post.id}`} className={gridClass} />;
          })}
        </BentoGrid>
      </div>
    </section>
  );
}