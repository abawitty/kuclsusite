module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "admin": "admin" });

  eleventyConfig.addCollection("team", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/team/*.md").sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  eleventyConfig.addCollection("announcements", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/announcements/*.md").sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  eleventyConfig.addCollection("events", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/events/*.md").sort((a, b) => new Date(a.data.date) - new Date(b.data.date));
  });

  eleventyConfig.addFilter("dateDisplay", function (dateObj) {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
