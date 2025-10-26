"use client";

import { useEffect, useState } from "react";

type LatestVideo = {
  id: string;
  url: string;
  title?: string | null;
  publishedAt?: string | null;
  thumbnail?: string | null;
};

const API_URL = "https://9iqx4v1ywg.execute-api.eu-central-1.amazonaws.com/latest_youtube";


// Build a privacy-enhanced embed URL
function toEmbedUrl(videoId: string) {
  const base = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`;
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
  });
  return `${base}?${params.toString()}`;
}

export default function LatestYouTubeEmbedClient() {
  const [video, setVideo] = useState<LatestVideo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch(API_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`API ${res.status}`);
        const json = (await res.json()) as LatestVideo;
        setVideo(json);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load latest video");
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, []);

  if (loading) {
    return ( <>Loading latest youtube video...</>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        Couldn’t load the latest video: {error}
      </div>
    );
  }

  if (!video?.id) {
    return (
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        No video found for this channel.
      </div>
    );
  }

  const src = toEmbedUrl(video.id);

  return (
    <div className="w-full">
      {/* 16:9 responsive box */}
      <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute left-0 top-0 h-full w-full rounded-xl"
          src={src}
          title={video.title ?? "Latest YouTube video"}
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}
