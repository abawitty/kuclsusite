const Parser = require("rss-parser");

const FEED_URL = "https://www.myjoyonline.com/feed/";
const MAX_ITEMS = 12;

const LAW_KEYWORDS = [
  "court", "judge", "justice", "judiciary", "judicial", "bar association",
  "attorney", "lawyer", "legal", "law school", "verdict", "ruling",
  "supreme court", "constitutional", "appeal", "prosecut", "tribunal",
  "bill into law", "acquit", "remand", "sentenc", "magistrate", "moot",
];

const FALLBACK_ITEMS = [
  {
    title: "Ghana Bar Association news and updates",
    link: "https://www.myjoyonline.com/",
    source: "MyJoyOnline",
  },
  {
    title: "Supreme Court of Ghana — recent rulings",
    link: "https://www.myjoyonline.com/",
    source: "MyJoyOnline",
  },
  {
    title: "Judicial Service of Ghana — news",
    link: "https://judicial.gov.gh/",
    source: "Judicial Service of Ghana",
  },
];

module.exports = async function () {
  try {
    const parser = new Parser({ timeout: 8000 });
    const feed = await parser.parseURL(FEED_URL);
    const items = (feed.items || []).map((item) => ({
      title: (item.title || "").trim(),
      link: item.link,
      source: "MyJoyOnline",
    }));

    const lawItems = items.filter((item) => {
      const t = item.title.toLowerCase();
      return LAW_KEYWORDS.some((kw) => t.includes(kw));
    });

    let selected = lawItems;
    if (selected.length < 4) {
      const extra = items.filter((item) => !selected.includes(item));
      selected = selected.concat(extra).slice(0, MAX_ITEMS);
    } else {
      selected = selected.slice(0, MAX_ITEMS);
    }

    return selected.length ? selected : FALLBACK_ITEMS;
  } catch (err) {
    console.warn("lawNews: feed fetch failed, using fallback —", err.message);
    return FALLBACK_ITEMS;
  }
};
