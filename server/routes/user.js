const router = require(`express`).Router();

const { googlelogin } = require("../controllers/user");

router.post("/googlelogin", googlelogin);

module.exports = router;
