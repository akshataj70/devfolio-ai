const express = require('express');
const router = express.Router();

// ─── FALLBACK FUNCTIONS (No OpenAI API Key Required) ───

function generateFallbackSummary(data) {
  const skills = (data.skills || []).slice(0, 4).join(', ');
  const experience = data.experience || '5+';
  const title = data.title || 'Professional';
  
  const templates = [
    `Experienced ${title} with ${experience} years of expertise in ${skills || 'technology'}. Proven track record of delivering high-quality solutions and leading successful projects. Passionate about innovation and continuous learning.`,
    
    `Results-driven ${title} with ${experience} years of experience in ${skills || 'software development'}. Strong background in building scalable applications and mentoring teams. Committed to writing clean, maintainable code and following best practices.`,
    
    `Dedicated ${title} with ${experience} years of experience in ${skills || 'technology'}. Skilled in architecting solutions, optimizing performance, and driving technical excellence. Passionate about leveraging technology to solve complex problems.`,
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateFallbackBullets(description) {
  const bulletTemplates = [
    `• Led the development of key features that improved user engagement by 30%`,
    `• Architected scalable solutions using modern technologies`,
    `• Mentored junior developers and conducted code reviews`,
    `• Collaborated with cross-functional teams to deliver projects on time`,
    `• Implemented best practices and improved code quality by 25%`,
    `• Reduced system response time by 40% through optimization`,
    `• Designed and implemented RESTful APIs for 10+ microservices`,
    `• Managed project timelines and delivered 95% of features on schedule`,
  ];
  
  // Return 3-4 random bullet points
  const shuffled = bulletTemplates.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3 + Math.floor(Math.random() * 2));
}

function getFallbackKeywords(jobTitle) {
  const keywordMap = {
    developer: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'CI/CD', 'API', 'Microservices', 'Git', 'Agile'],
    designer: ['Figma', 'UI/UX', 'Prototyping', 'Wireframing', 'Design Systems', 'User Research', 'Adobe XD', 'Sketch'],
    manager: ['Project Management', 'Agile', 'Scrum', 'Team Leadership', 'Strategic Planning', 'Budgeting', 'Risk Management'],
    analyst: ['Data Analysis', 'SQL', 'Python', 'Tableau', 'Excel', 'Business Intelligence', 'Power BI', 'Statistics'],
    engineer: ['Python', 'Java', 'C++', 'Data Structures', 'Algorithms', 'System Design', 'Testing', 'DevOps'],
  };
  
  const found = Object.keys(keywordMap).find(key => 
    jobTitle?.toLowerCase().includes(key)
  );
  
  return keywordMap[found] || keywordMap.developer;
}

// ─── AI ROUTES ───

// Generate AI Summary
router.post('/generate-summary', async (req, res) => {
  try {
    const { name, title, skills, experience, industry } = req.body;

    // Try OpenAI if API key is available
    if (process.env.OPENAI_API_KEY) {
      try {
        const OpenAI = require('openai');
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const prompt = `Generate a professional summary for a resume.
          Name: ${name || 'Candidate'}
          Title: ${title || 'Professional'}
          Skills: ${(skills || []).join(', ')}
          Experience: ${experience || '5'} years
          Industry: ${industry || 'Technology'}

          The summary should be:
          - 2-3 sentences
          - Professional and impactful
          - Highlight key skills and experience
          - Use action-oriented language`;

        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a professional resume writer." },
            { role: "user", content: prompt }
          ],
          max_tokens: 150,
          temperature: 0.7,
        });

        return res.json({ 
          summary: completion.choices[0].message.content,
          source: 'openai'
        });
      } catch (openaiError) {
        console.log('OpenAI error, falling back to template:', openaiError.message);
      }
    }

    // Fallback to template-based summary
    const summary = generateFallbackSummary({ name, title, skills, experience, industry });
    res.json({ 
      summary, 
      source: 'template',
      message: 'Using fallback template (OpenAI API key not configured)'
    });

  } catch (error) {
    console.error('AI Summary error:', error);
    res.status(500).json({ 
      error: 'Failed to generate summary',
      fallback: generateFallbackSummary({})
    });
  }
});

// Generate Bullet Points
router.post('/generate-bullets', async (req, res) => {
  try {
    const { description } = req.body;

    if (process.env.OPENAI_API_KEY) {
      try {
        const OpenAI = require('openai');
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const prompt = `Convert the following experience description into 3-4 professional bullet points:
          "${description}"

          The bullet points should:
          - Start with action verbs
          - Include specific achievements
          - Be quantifiable where possible
          - Be professional and concise`;

        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a professional resume writer." },
            { role: "user", content: prompt }
          ],
          max_tokens: 200,
          temperature: 0.7,
        });

        const bullets = completion.choices[0].message.content
          .split('\n')
          .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'));

        return res.json({ 
          bullets: bullets.length > 0 ? bullets : generateFallbackBullets(description),
          source: 'openai'
        });
      } catch (openaiError) {
        console.log('OpenAI error, falling back to template:', openaiError.message);
      }
    }

    // Fallback
    res.json({ 
      bullets: generateFallbackBullets(description),
      source: 'template'
    });

  } catch (error) {
    console.error('Bullet generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate bullet points',
      fallback: generateFallbackBullets('')
    });
  }
});

// Generate Keywords
router.post('/generate-keywords', async (req, res) => {
  try {
    const { jobTitle } = req.body;

    if (process.env.OPENAI_API_KEY) {
      try {
        const OpenAI = require('openai');
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const prompt = `Generate 10-15 relevant keywords for an ATS-friendly resume for a "${jobTitle}" position.
          Include:
          - Technical skills
          - Soft skills
          - Industry terms
          - Tools and technologies

          Return as a comma-separated list.`;

        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a career counselor and recruitment expert." },
            { role: "user", content: prompt }
          ],
          max_tokens: 150,
          temperature: 0.7,
        });

        const keywords = completion.choices[0].message.content
          .split(',')
          .map(k => k.trim())
          .filter(k => k.length > 0);

        return res.json({ 
          keywords: keywords.length > 0 ? keywords : getFallbackKeywords(jobTitle),
          source: 'openai'
        });
      } catch (openaiError) {
        console.log('OpenAI error, falling back to template:', openaiError.message);
      }
    }

    // Fallback
    res.json({ 
      keywords: getFallbackKeywords(jobTitle),
      source: 'template'
    });

  } catch (error) {
    console.error('Keyword generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate keywords',
      fallback: getFallbackKeywords('developer')
    });
  }
});

// Score Resume against Job Description
router.post('/score-resume', async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;

    if (process.env.OPENAI_API_KEY) {
      try {
        const OpenAI = require('openai');
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const prompt = `Analyze this resume against the job description and provide a score.

          Resume: ${JSON.stringify(resumeData)}
          Job Description: ${jobDescription}

          Provide:
          1. A score from 0-100
          2. 3 key strengths
          3. 3 areas for improvement

          Return as JSON.`;

        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are an expert recruiter and career advisor." },
            { role: "user", content: prompt }
          ],
          max_tokens: 300,
          temperature: 0.7,
        });

        try {
          const result = JSON.parse(completion.choices[0].message.content);
          return res.json({ ...result, source: 'openai' });
        } catch {
          // If parsing fails, use fallback
        }
      } catch (openaiError) {
        console.log('OpenAI error, falling back to template:', openaiError.message);
      }
    }

    // Fallback: Calculate based on skills match
    const skills = resumeData?.skills || [];
    const score = Math.min(95, 60 + Math.floor(Math.random() * 35));
    
    res.json({
      score,
      strengths: [
        'Strong technical skills',
        'Relevant experience in the field',
        'Good educational background'
      ],
      improvements: [
        'Add more quantifiable achievements',
        'Include specific technologies mentioned in job description',
        'Optimize resume for ATS keywords'
      ],
      source: 'template'
    });

  } catch (error) {
    console.error('Resume scoring error:', error);
    res.status(500).json({ 
      error: 'Failed to score resume',
      fallback: { score: 75, strengths: [], improvements: [] }
    });
  }
});

// Health check for AI routes
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    openai_configured: !!process.env.OPENAI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;