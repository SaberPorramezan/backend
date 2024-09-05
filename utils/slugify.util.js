const slugify = require("slugify");

function generateSlug(text) {
  return slugify(text, {
    lower: true,
    strict: true,
    replacement: "-",
  });
}

module.exports = { generateSlug };
