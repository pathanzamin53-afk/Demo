const { insertRow } = require('./_lib/supabase');
const text = (value, max = 200) => String(value || '').trim().slice(0, max);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const body = req.body || {};
  const applicantName = text(body.name);
  const post = text(body.post, 100);
  const phone = text(body.phone, 15);
  if (!applicantName || !post || !/^\d{10}$/.test(phone)) return res.status(400).json({ error: 'Name, post and valid 10-digit phone are required' });
  try {
    await insertRow('career_applications', { applicant_name: applicantName, gender: text(body.gender, 20), post, phone, email: text(body.email, 160), previous_institution: text(body.previousInstitution), experience: text(body.experience), qualification: text(body.qualification, 100), address: text(body.address, 500), cv_name: text(body.cvName, 160) });
    return res.status(201).json({ message: 'Career application submitted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to save application right now' });
  }
};