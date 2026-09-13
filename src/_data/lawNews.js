const SITE_URL = "https://www.thelawplatform.online";
const MAX_ITEMS = 12;

const FALLBACK_ITEMS = [
  {
    title: "Visit The Law Platform for the latest Ghana legal news",
    link: SITE_URL,
    source: "The Law Platform",
  },
];

// The Law Platform is a Next.js app; article title+link pairs are embedded as
// JSON inside self.__next_f.push([...]) script chunks (React Server
// Components flight data), not in plain HTML or an RSS feed.
async function extractArticles(html) {
  const chunkPattern = /self\.__next_f\.push\((\[.*?\])\)<\/script>/gs;
  const pairPattern = /"href":"(\/post\/[^"]+)"(?:(?!"href").){1,800}?"h2",null,\{"className":"[^"]*","children":"([^"]+)"/gs;

  const seen = new Set();
  const items = [];

  let chunkMatch;
  while ((chunkMatch = chunkPattern.exec(html)) !== null) {
    let decoded;
    try {
      const arr = JSON.parse(chunkMatch[1]);
      if (arr.length === 2 && typeof arr[1] === "string") {
        decoded = arr[1];
      }
    } catch {
      continue;
    }
    if (!decoded) continue;

    let pairMatch;
    pairPattern.lastIndex = 0;
    while ((pairMatch = pairPattern.exec(decoded)) !== null) {
      const [, href, title] = pairMatch;
      if (seen.has(href)) continue;
      seen.add(href);
      items.push({
        title: title.trim(),
        link: SITE_URL + href,
        source: "The Law Platform",
      });
    }
  }

  return items;
}

module.exports = async function () {
  try {
    const res = await fetch(SITE_URL, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; KUCLSU-site-build/1.0)" },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const items = await extractArticles(html);
    return items.length ? items.slice(0, MAX_ITEMS) : FALLBACK_ITEMS;
  } catch (err) {
    console.warn("lawNews: fetch/parse failed, using fallback —", err.message);
    return FALLBACK_ITEMS;
  }
};
