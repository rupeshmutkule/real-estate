const express = require("express");
const {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
  uploadExcel,
  importContacts,
  uploadMiddleware,
} = require("../controllers/contactController");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);

router.get("/", getAllContacts);
router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);
router.post("/upload", uploadMiddleware, uploadExcel);
router.post("/import", importContacts);

module.exports = router;
