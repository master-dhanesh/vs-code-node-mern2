var express = require("express");
var router = express.Router();

const path = require("path");
const fs = require("fs");

/* GET / page. */
router.get("/", function (req, res, next) {
  const dirdata = fs.readdirSync(
    path.join(__dirname, "..", "public", "files"),
    "utf-8"
  );

  res.render("index", { data: "", dirdata, filename: "" });
});

/* GET /:file page. */
router.get("/:file", function (req, res, next) {
  const dirdata = fs.readdirSync(
    path.join(__dirname, "..", "public", "files"),
    "utf-8"
  );

  const filename = req.params.file;

  const data = fs.readFileSync(
    path.join(__dirname, "..", "public", "files", filename),
    "utf-8"
  );
  res.render("index", { data, dirdata, filename });
});

/* POST create page. */
router.post("/create", function (req, res, next) {
  fs.writeFileSync(
    path.join(__dirname, "..", "public", "files", req.body.filename),
    ""
  );
  res.redirect(`/${req.body.filename}`);
});

/* POST save page. */
router.post("/save/:file", function (req, res, next) {
  fs.writeFileSync(
    path.join(__dirname, "..", "public", "files", req.params.file),
    req.body.filedata
  );
  res.redirect(`/${req.params.file}`);
});

/* GET delete page. */
router.get("/delete/:file", function (req, res, next) {
  fs.unlinkSync(path.join(__dirname, "..", "public", "files", req.params.file));
  res.redirect(`/`);
});

module.exports = router;
