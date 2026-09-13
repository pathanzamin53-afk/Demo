const { insertRow } = require('./_lib/supabase');
const text = (value, max = 200) => String(value || '').trim().slice(0, max);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const body = req.body || {};
  const studentName = text(body.studentName);
  const fatherName = text(body.fatherName);
  const className = text(body.className, 40);
  const phone = text(body.phone, 15);
  if (!studentName || !fatherName || !className || !/^\d{10}$/.test(phone)) return res.status(400).json({ error: 'Student name, father name, class and valid 10-digit phone are required' });
  try {
    await insertRow('admission_enquiries', { student_name: studentName, father_name: fatherName, mother_name: text(body.motherName), date_of_birth: body.dateOfBirth || null, gender: text(body.gender, 20), class_name: className, previous_school: text(body.previousSchool), phone, email: text(body.email, 160), address: text(body.address, 500) });
    return res.status(201).json({ message: 'Admission enquiry submitted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to save enquiry right now' });
  }
};