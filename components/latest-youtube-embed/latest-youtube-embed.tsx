type LatestVideo = {
  id: string
  url: string
  title?: string | null
  publishedAt?: string | null
  thumbnail?: string | null
}

const API_URL = "https://9iqx4v1ywg.execute-api.eu-central-1.amazonaws.com/latest_youtube"

function toEmbedUrl(videoId: string) {
  // Privacy-enhanced domain + sensible defaults
  const base = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`
  const params = new URLSearchParams({
    // tweak as you like:
    rel: "0",
    modestbranding: "1",
    // si param is not needed when you have the ID already
  })
  return `${base}?${params.toString()}`
}

export default async function LatestYouTubeEmbed() {
  if (!API_URL) {
    // Fail loud on misconfig so you notice in dev
    return (
      <div className="rounded border border-red-300 bg-red-50 p-4 text-sm text-red-800">
        Missing <code>LATEST_YT_API_URL</code> env var.
      </div>
    )
  }

  let data: LatestVideo | null = null
  try {
    const res = await fetch(API_URL, {
      // Revalidate every 5 minutes; adjust to your preference
      next: { revalidate: 300 },
      // If your API needs headers, add them here
    })
    if (!res.ok) throw new Error(`API ${res.status}`)
    data = (await res.json()) as LatestVideo
  } catch (e) {
    return (
      <div className="rounded border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        Couldn’t load the latest video. Try again later.
      </div>
    )
  }

  if (!data?.id) {
    return (
      <div className="rounded border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        No video found for this channel.
      </div>
    )
  }

  const src = toEmbedUrl(data.id)

  return (
    <div className="w-full">
      {/* Optional heading */}
      {data.title ? (
        <h3 className="mb-3 text-base font-medium leading-tight">
          {data.title}
        </h3>
      ) : null}

      {/* 16:9 responsive container */}
      <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute left-0 top-0 h-full w-full rounded-xl"
          src={src}
          title={data.title ?? "Latest YouTube video"}
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  )
}
