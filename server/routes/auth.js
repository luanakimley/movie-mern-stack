const router = require(`express`).Router();

const { googlelogin } = require("../controllers/auth");

router.post("/googlelogin", googlelogin);

module.exports = router;
