const express = require("express")
const router = express.Router()

const tukangController = require("../controller/tukang-controller")

router.get("/", tukangController.getAll)
router.get("/:id", tukangController.getById)
router.post("/", tukangController.create)
router.put("/:id", tukangController.update)
router.delete("/:id", tukangController.delete)

module.exports = router