const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

function urlExists(req, res, next) {
  const urlId = Number(req.params.urlId);
  const foundUrl = urls.find((url) => url.id === urlId);
  if (foundUrl) {
    res.locals.url = foundUrl;
    return next();
  }
  next({
    status: 404,
    message: `Url id not found: ${req.params.urlId}`,
  });
}

function bodyHasHrefProperty(req, res, next) {
  const { data: { href } = {} } = req.body;
  if (href) {
    return next();
  }
  next({
    status: 400,
    message: "A 'href' property is required.",
  });
}

function create(req, res) {
  const { data: { href } = {} } = req.body;
  const newUrlId = urls.length + 1;
  const newUrl = { id: newUrlId, href: href };
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
}

function read(req, res) {
  const newUseId = uses.length + 1;
  const newUse = {
    id: newUseId,
    urlId: Number(req.params.urlId),
    time: Date.now(),
  };
  uses.push(newUse);
  res.json({ data: res.locals.url });
}

function update(req, res) {
  const url = res.locals.url;
  const { data: { href } = {} } = req.body;
  url.href = href;

  res.json({ data: url });
}

function list(req, res) {
  res.json({ data: urls });
}

module.exports = {
  create: [bodyHasHrefProperty, create],
  update: [urlExists, bodyHasHrefProperty, update],
  list,
  read: [urlExists, read],
  urlExists,
};
