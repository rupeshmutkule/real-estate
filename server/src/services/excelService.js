const xlsx = require("xlsx");
const Contact = require("../models/Contact");

const parseExcel = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);
  
  return data;
};

const normalizePhone = (phone) => {
  if (!phone) return "";
  const cleaned = String(phone).replace(/\D/g, "");
  
  if (cleaned.startsWith("91") && cleaned.length === 12) {
    return cleaned;
  }
  
  if (cleaned.length === 10) {
    return "91" + cleaned;
  }
  
  return cleaned;
};

const normalizeEmail = (email) => {
  if (!email) return "";
  return String(email).trim().toLowerCase();
};

const validateContacts = (data) => {
  const contacts = [];
  const errors = [];
  
  data.forEach((row, index) => {
    const contact = {
      name: row.Name || row.name || "",
      phone: normalizePhone(row.Phone || row.phone),
      email: normalizeEmail(row.Email || row.email),
      property: row.Property || row.property || "",
      city: row.City || row.city || "",
    };
    
    if (!contact.phone && !contact.email) {
      errors.push(`Row ${index + 1}: Missing phone and email`);
    } else {
      contacts.push(contact);
    }
  });
  
  return { contacts, errors };
};

const checkDuplicates = async (contacts) => {
  const phones = contacts.filter(c => c.phone).map(c => c.phone);
  const emails = contacts.filter(c => c.email).map(c => c.email);
  
  const existingContacts = await Contact.find({
    $or: [
      { phone: { $in: phones } },
      { email: { $in: emails } },
    ],
  });
  
  const existingPhones = new Set(existingContacts.map(c => c.phone));
  const existingEmails = new Set(existingContacts.map(c => c.email));
  
  const newContacts = contacts.filter(
    c => !existingPhones.has(c.phone) && !existingEmails.has(c.email)
  );
  
  const duplicates = contacts.length - newContacts.length;
  
  return { newContacts, duplicates };
};

module.exports = {
  parseExcel,
  validateContacts,
  checkDuplicates,
};
