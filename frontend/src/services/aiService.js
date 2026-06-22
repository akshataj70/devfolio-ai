/**
 * REAL AI Service - Uses AI API for summary generation
 * Note: You need to set up a backend endpoint for this
 */

export const aiService = {
  /**
   * Generate professional summary using AI
   * This calls your backend which then calls OpenAI/Claude
   */
  generateSummary: async (data) => {
    try {
      console.log('🚀 Generating AI summary for:', data);
      
      // Call your backend API
      const response = await fetch('/api/ai/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name || 'Candidate',
          title: data.title || 'Professional',
          skills: data.skills || [],
          experience: data.experience || 0,
          industry: data.industry || 'Technology',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }

      const result = await response.json();
      return result.summary;

    } catch (error) {
      console.error('AI Summary error:', error);
      // Fallback to template-based summary
      return generateFallbackSummary(data);
    }
  },

  /**
   * Generate bullet points from description
   */
  generateBulletPoints: async (description) => {
    try {
      const response = await fetch('/api/ai/generate-bullets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate bullet points');
      }

      const result = await response.json();
      return result.bullets;

    } catch (error) {
      console.error('Bullet generation error:', error);
      return generateFallbackBullets(description);
    }
  },

  /**
   * Generate ATS keywords
   */
  generateKeywords: async (jobTitle) => {
    try {
      const response = await fetch('/api/ai/generate-keywords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobTitle }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate keywords');
      }

      const result = await response.json();
      return result.keywords;

    } catch (error) {
      console.error('Keyword generation error:', error);
      return getFallbackKeywords(jobTitle);
    }
  },

  /**
   * Score resume against job description
   */
  scoreResume: async (resumeData, jobDescription) => {
    try {
      const response = await fetch('/api/ai/score-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeData, jobDescription }),
      });

      if (!response.ok) {
        throw new Error('Failed to score resume');
      }

      const result = await response.json();
      return result;

    } catch (error) {
      console.error('Resume scoring error:', error);
      return {
        score: 75,
        strengths: ['Good technical skills', 'Relevant experience'],
        improvements: ['Add more quantifiable achievements', 'Optimize keywords'],
      };
    }
  },
};

// ─── Fallback Functions (when AI is unavailable) ───

function generateFallbackSummary(data) {
  const skills = (data.skills || []).slice(0, 4).join(', ');
  const experience = data.experience || '5+';
  
  const templates = [
    `Experienced ${data.title || 'professional'} with ${experience} years of expertise in ${skills || 'technology'}. Proven track record of delivering high-quality solutions and leading successful projects. Passionate about innovation and continuous learning.`,
    
    `Results-driven ${data.title || 'professional'} with ${experience} years of experience in ${skills || 'software development'}. Strong background in building scalable applications and mentoring teams. Committed to writing clean, maintainable code and following best practices.`,
    
    `Dedicated ${data.title || 'professional'} with ${experience} years of experience in ${skills || 'technology'}. Skilled in architecting solutions, optimizing performance, and driving technical excellence. Passionate about leveraging technology to solve complex problems.`,
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateFallbackBullets(description) {
  return [
    `• Led the development of key features that improved user engagement by 30%`,
    `• Architected scalable solutions using modern technologies`,
    `• Mentored junior developers and conducted code reviews`,
    `• Collaborated with cross-functional teams to deliver projects on time`,
    `• Implemented best practices and improved code quality`,
  ];
}

function getFallbackKeywords(jobTitle) {
  const keywordMap = {
    developer: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'CI/CD', 'API', 'Microservices'],
    designer: ['Figma', 'UI/UX', 'Prototyping', 'Wireframing', 'Design Systems', 'User Research'],
    manager: ['Project Management', 'Agile', 'Scrum', 'Team Leadership', 'Strategic Planning'],
    analyst: ['Data Analysis', 'SQL', 'Python', 'Tableau', 'Excel', 'Business Intelligence'],
  };
  
  const found = Object.keys(keywordMap).find(key => 
    jobTitle?.toLowerCase().includes(key)
  );
  
  return keywordMap[found] || keywordMap.developer;
}