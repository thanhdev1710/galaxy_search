"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Star,
  Bookmark,
  Share2,
  Eye,
  Heart,
} from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { use, useEffect } from "react";
import { SVGLoader } from "../ui/loader";
import { useStore } from "@/store/store";
import { useSearchParams } from "next/navigation";
import { useApod } from "@/lib/utils";

export default function CreativeCards({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const setRoot = useStore((state) => state.setRoot);
  const searchParam = useSearchParams();

  const { slug } = use(params);
  const { data, error, isLoading } = useApod(slug, searchParam);

  useEffect(() => {
    if (data?.data?.total?.value != null) {
      setRoot(data);
    }
  }, [data, setRoot]);

  if (error) {
    return (
      <main className="h-full w-full flex items-center justify-center text-white">
        <h1>Error</h1>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="h-full w-full flex items-center justify-center">
        <SVGLoader />
      </main>
    );
  }

  if (!data) {
    return (
      <main className="h-full w-full flex items-center justify-center text-white">
        <h1>Not found data</h1>
      </main>
    );
  }

  const cards = data.data.hits;

  return (
    <ScrollArea className="h-full w-full px-2">
      <motion.div
        className="space-y-6 py-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
        {cards?.map((item) => {
          const card = item._source;
          return (
            <Card
              key={card.id}
              className="group relative overflow-hidden border-0 bg-gradient-to-br from-slate-900 to-slate-800"
            >
              {/* Animated background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-500`}
              />

              {/* Subtle pattern overlay */}
              <div
                className='absolute inset-0
             bg-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjAzIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=")]
             opacity-50'
              />

              <CardContent className="relative p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="relative md:w-80 h-48 md:h-auto overflow-hidden">
                    <Image
                      src={card.image || "/placeholder.svg"}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-900/50 md:to-slate-900/80" />

                    {/* Floating category badge */}
                    <Badge className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-colors">
                      {card.category}
                    </Badge>

                    {/* Action buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6 md:p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2
                          className={`text-2xl md:text-3xl font-bold ${card.accentColor} mb-2 group-hover:text-white transition-colors duration-300`}
                        >
                          {item.highlight?.title?.length
                            ? item.highlight.title.map((fragment, i) => (
                                <span
                                  key={i}
                                  dangerouslySetInnerHTML={{ __html: fragment }}
                                />
                              ))
                            : card.title}
                        </h2>

                        <div className="flex items-center gap-4 text-sm text-slate-300">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {card.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {card.readTime}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-200 leading-relaxed mb-6 text-sm md:text-base">
                      {item.highlight?.description?.length
                        ? item.highlight.description.map((fragment, i) => (
                            <span
                              key={i}
                              dangerouslySetInnerHTML={{ __html: fragment }}
                            />
                          ))
                        : card.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {card.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {card.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {card.likes}
                        </div>
                      </div>

                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        Read More
                        <Star className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>

              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
            </Card>
          );
        })}
      </motion.div>
      <div className="h-36"></div>
    </ScrollArea>
  );
}
