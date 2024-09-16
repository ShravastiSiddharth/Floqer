require('dotenv').config();

const gorqChat = async (req,res) => {

    const { query, contextData } = req.body;

    try {
        const response = await axios.post('https://api.groq.com/llm-endpoint',
            {
                prompt: query,
                context: contextData,  
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.GORQ_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        
        res.json({ message: response.data });
    } catch (error) {
        console.error('Error querying Groq API:', error);
        res.status(500).json({ error: 'Failed to fetch response from Groq API' });
    }
}

module.exports = { gorqChat }