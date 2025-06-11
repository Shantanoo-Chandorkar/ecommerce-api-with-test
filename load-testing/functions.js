let lastPageCursor = null;   // For createdAt-based cursor
let lastIdCursor = null;     // For _id-based cursor

module.exports = {
  // CreatedAt-based cursor pagination (existing)
  generatePage: function (context, events, done) {
    const limit = 20;
    let url = `/api/products?limit=${limit}`;

    if (lastPageCursor) {
      url += `&after=${lastPageCursor}`;
    }

    context.vars.url = url;
    return done();
  },

  updatePage: function (req, res, context, ee, next) {
    try {
      const body = JSON.parse(res.body);
      if (body.nextCursor) {
        lastPageCursor = body.nextCursor;
      } else {
        lastPageCursor = null; // no more pages
      }
    } catch (err) {
      console.error("❌ Failed to parse response body:", err);
      lastPageCursor = null;
    }
    return next();
  },

  // _id-based cursor pagination (new)
  generateCursor: function (context, events, done) {
    const limit = 20;
    let url = `/api/products?limit=${limit}`;

    if (lastIdCursor) {
      url += `&after=${lastIdCursor}`;
    }

    context.vars.url = url;
    return done();
  },

  updateCursor: function (req, res, context, ee, next) {
    try {
      const body = JSON.parse(res.body);
      if (body.nextCursor) {
        lastIdCursor = body.nextCursor;
      } else {
        lastIdCursor = null; // no more pages
      }
    } catch (err) {
      console.error("❌ Failed to parse response body:", err);
      lastIdCursor = null;
    }

    return next();
  }
};
