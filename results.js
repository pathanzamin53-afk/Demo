const results = {
  '10th:1045231': { name: 'Mohammad Aryan Khan', father: 'Mohammad Salim Khan', section: 'A', subjects: [{ sub: 'Hindi', max: 100, obt: 82 }, { sub: 'English', max: 100, obt: 74 }, { sub: 'Mathematics', max: 100, obt: 91 }, { sub: 'Science', max: 100, obt: 87 }, { sub: 'Social Science', max: 100, obt: 78 }, { sub: 'Sanskrit', max: 100, obt: 69 }] },
  '10th:1045232': { name: 'Aisha Fatima Siddiqui', father: 'Abdul Rahman Siddiqui', section: 'B', subjects: [{ sub: 'Hindi', max: 100, obt: 95 }, { sub: 'English', max: 100, obt: 88 }, { sub: 'Mathematics', max: 100, obt: 77 }, { sub: 'Science', max: 100, obt: 83 }, { sub: 'Social Science', max: 100, obt: 92 }, { sub: 'Sanskrit', max: 100, obt: 85 }] },
  '10th:1045233': { name: 'Rahul Sharma', father: 'Rajesh Sharma', section: 'A', subjects: [{ sub: 'Hindi', max: 100, obt: 60 }, { sub: 'English', max: 100, obt: 55 }, { sub: 'Mathematics', max: 100, obt: 38 }, { sub: 'Science', max: 100, obt: 52 }, { sub: 'Social Science', max: 100, obt: 61 }, { sub: 'Sanskrit', max: 100, obt: 44 }] },
  '10th:1045234': { name: 'Priya Gupta', father: 'Suresh Gupta', section: 'C', subjects: [{ sub: 'Hindi', max: 100, obt: 89 }, { sub: 'English', max: 100, obt: 91 }, { sub: 'Mathematics', max: 100, obt: 96 }, { sub: 'Science', max: 100, obt: 94 }, { sub: 'Social Science', max: 100, obt: 88 }, { sub: 'Sanskrit', max: 100, obt: 90 }] },
  '12th:2045101': { name: 'Neha Verma', father: 'Vinod Verma', stream: 'Science (PCM)', subjects: [{ sub: 'Hindi', max: 100, obt: 79 }, { sub: 'English', max: 100, obt: 83 }, { sub: 'Physics', max: 100, obt: 88 }, { sub: 'Chemistry', max: 100, obt: 85 }, { sub: 'Mathematics', max: 100, obt: 92 }] },
  '12th:2045102': { name: 'Sameer Hussain', father: 'Jabir Hussain', stream: 'Arts', subjects: [{ sub: 'Hindi', max: 100, obt: 84 }, { sub: 'English', max: 100, obt: 77 }, { sub: 'History', max: 100, obt: 88 }, { sub: 'Geography', max: 100, obt: 80 }, { sub: 'Civics', max: 100, obt: 76 }] },
  '12th:2045103': { name: 'Anjali Singh', father: 'Rajendra Singh', stream: 'Commerce', subjects: [{ sub: 'Hindi', max: 100, obt: 72 }, { sub: 'English', max: 100, obt: 68 }, { sub: 'Accountancy', max: 100, obt: 91 }, { sub: 'Business Studies', max: 100, obt: 84 }, { sub: 'Economics', max: 100, obt: 78 }] },
  '12th:2045105': { name: 'Divya Agarwal', father: 'Anil Agarwal', stream: 'Science (PCM)', subjects: [{ sub: 'Hindi', max: 100, obt: 93 }, { sub: 'English', max: 100, obt: 96 }, { sub: 'Physics', max: 100, obt: 98 }, { sub: 'Chemistry', max: 100, obt: 95 }, { sub: 'Mathematics', max: 100, obt: 99 }] },
};

module.exports = (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const roll = String(req.query.roll || '').trim();
  const className = req.query.class === '12th' ? '12th' : req.query.class === '10th' ? '10th' : '';
  if (!/^\d{7}$/.test(roll) || !className) return res.status(400).json({ error: 'Valid class and 7-digit roll number are required' });
  const result = results[`${className}:${roll}`];
  if (!result) return res.status(404).json({ error: 'Result not found' });
  return res.status(200).json({ roll, className, ...result });
};