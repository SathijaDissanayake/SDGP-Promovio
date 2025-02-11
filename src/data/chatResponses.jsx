export const chatResponses = {
    greetings: {
      patterns: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
      responses: [
        "Hello! How can I assist you with your digital marketing needs today?",
        "Hi there! I'm here to help you optimize your marketing strategy. What would you like to know?",
        "Welcome! I'm your digital marketing assistant. How can I help you today?",
        "Greetings! I'm ready to help you boost your marketing efforts. What's on your mind?",
      ],
    },
  
    marketing_strategy: {
      patterns: ["strategy", "plan", "marketing plan", "improve", "better"],
      responses: [
        "Based on current trends, I recommend focusing on these key areas:\n1. Content Marketing\n2. Social Media Engagement\n3. Email Automation\n4. SEO Optimization\nWhich area would you like to explore first?",
        "To improve your marketing strategy, consider:\n- Developing a strong brand voice\n- Creating valuable content\n- Engaging with your audience\n- Analyzing metrics\nWould you like me to elaborate on any of these points?",
        "Here's a strategic approach for your marketing:\n1. Define your target audience\n2. Create compelling content\n3. Choose the right platforms\n4. Measure and adjust\nShall we discuss these in detail?",
      ],
    },
  
    social_media: {
      patterns: ["social media", "facebook", "instagram", "twitter", "linkedin", "post"],
      responses: [
        "For social media success, consider these proven strategies:\n- Post consistently (3-5 times per week)\n- Use trending hashtags strategically\n- Engage with your followers within 24 hours\n- Share behind-the-scenes content\nWould you like specific examples for any of these?",
        "Here's what's working well on social media right now:\n1. Short-form video content\n2. User-generated content\n3. Interactive polls and questions\n4. Live streaming\nWhich of these would you like to implement?",
        "To boost your social media presence, try:\n- Creating platform-specific content\n- Using analytics to post at optimal times\n- Running targeted ad campaigns\n- Collaborating with influencers\nNeed more details about any of these strategies?",
      ],
    },
  
    content_marketing: {
      patterns: ["content", "blog", "article", "video", "post"],
      responses: [
        "For effective content marketing, consider:\n1. Blog posts optimized for SEO\n2. Engaging video content\n3. Informative infographics\n4. Email newsletters\nWhich type of content would you like to focus on?",
        "Here's a content strategy that drives results:\n- Regular blog updates\n- Video tutorials\n- Case studies\n- Industry insights\nLet me know which area interests you most.",
        "Content marketing best practices include:\n- Solving customer problems\n- Using data-driven insights\n- Maintaining consistent quality\n- Promoting across channels\nWould you like specific examples?",
      ],
    },
  
    email_marketing: {
      patterns: ["email", "newsletter", "campaign", "subscribers"],
      responses: [
        "To improve your email marketing:\n1. Segment your audience\n2. Personalize content\n3. A/B test subject lines\n4. Track engagement metrics\nWould you like to know more about any of these?",
        "Effective email marketing strategies:\n- Welcome email sequences\n- Abandoned cart recovery\n- Regular newsletters\n- Promotional campaigns\nShall we discuss implementation?",
        "Email marketing tips:\n- Write compelling subject lines\n- Optimize for mobile\n- Include clear CTAs\n- Monitor analytics\nNeed more specific guidance?",
      ],
    },
  
    analytics: {
      patterns: ["analytics", "metrics", "data", "performance", "results"],
      responses: [
        "Key metrics to track:\n1. Conversion rates\n2. Engagement levels\n3. ROI\n4. Customer acquisition cost\nWould you like to learn how to improve any of these?",
        "For data-driven marketing:\n- Set clear KPIs\n- Track user behavior\n- Analyze competition\n- Make data-backed decisions\nLet's discuss your specific metrics.",
        "Important analytics to monitor:\n- Website traffic\n- Social media engagement\n- Email open rates\n- Sales conversions\nWhich metrics matter most to you?",
      ],
    },
  
    default: {
      responses: [
        "I understand you're interested in digital marketing. Could you please provide more details about your specific needs?",
        "I'm here to help with your marketing strategy. Could you elaborate on what you're looking to achieve?",
        "Let me assist you better. What specific aspect of digital marketing would you like to explore?",
        "I can help with various marketing aspects like social media, content, email, and analytics. What area interests you most?",
      ],
    },
  }
  
  export function findBestResponse(message) {
    
    const input = message.toLowerCase()
  
    
    if (chatResponses.greetings.patterns.some((pattern) => input.includes(pattern))) {
      const timeOfDay = getTimeOfDay()
      const responses = chatResponses.greetings.responses
      return `Good ${timeOfDay}! ${responses[Math.floor(Math.random() * responses.length)]}`
    }
  
    
    for (const [category, data] of Object.entries(chatResponses)) {
      if (category === "greetings" || category === "default") continue
  
      if (data.patterns && data.patterns.some((pattern) => input.includes(pattern))) {
        const responses = data.responses
        return responses[Math.floor(Math.random() * responses.length)]
      }
    }
  
    
    const defaultResponses = chatResponses.default.responses
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }
  
  function getTimeOfDay() {
    const hour = new Date().getHours()
    if (hour < 12) return "morning"
    if (hour < 17) return "afternoon"
    return "evening"
  }
  
  