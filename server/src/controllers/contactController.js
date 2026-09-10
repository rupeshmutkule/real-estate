const Contact = require("../models/Contact");
const multer = require("multer");
const path = require("path");
const { parseExcel, validateContacts, checkDuplicates } = require("../services/excelService");

const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".xlsx" && ext !== ".xls") {
      return cb(new Error("Only Excel files allowed"));
    }
    cb(null, true);
  },
});

exports.uploadMiddleware = upload.single("file");

exports.getAllContacts = async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    
    const query = {};
    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { phone: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ];
    }
    
    const contacts = await Contact.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Contact.countDocuments(query);
    
    res.json({
      success: true,
      contacts,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    
    res.status(201).json({
      success: true,
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
    
    res.json({
      success: true,
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
    
    res.json({
      success: true,
      message: "Contact deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    
    const data = parseExcel(req.file.path);
    const { contacts, errors } = validateContacts(data);
    
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }
    
    const { newContacts, duplicates } = await checkDuplicates(contacts);
    
    res.json({
      success: true,
      preview: newContacts.slice(0, 10),
      total: contacts.length,
      new: newContacts.length,
      duplicates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.importContacts = async (req, res) => {
  try {
    const { contacts } = req.body;
    
    const imported = await Contact.insertMany(contacts);
    
    res.json({
      success: true,
      imported: imported.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
