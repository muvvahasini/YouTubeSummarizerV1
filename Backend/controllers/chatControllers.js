import { askRagQuestion } from "../services/aiclientService.js";

// Simple in-memory session storage
const sessions = new Map();

export const askQuestion = async (req, res) => {
    try {
        const { sessionId, question } = req.body;
        console.log('Chat request - sessionId:', sessionId, 'question:', question);

        if (!sessionId || !question) return res.status(400).json({ error: 'sessionId and question are required' });

        // Get videoId from session storage
        const session = sessions.get(sessionId);
        const videoId = session ? session.videoId : null;

        console.log('Retrieved session:', session);
        console.log('VideoId for chat:', videoId);

        const answer = await askRagQuestion(sessionId, question, videoId);
        return res.json(answer);
    } catch (err) {
        console.error('Chat controller error:', err);
        return res.status(500).json({ error: err.message || 'Failed to get answer' });
    }
};

// Helper function to store session data
export const storeSessionData = (sessionId, videoId, videoUrl) => {
    console.log('Storing session data:', { sessionId, videoId, videoUrl });
    sessions.set(sessionId, { videoId, videoUrl });
    console.log('Current sessions:', Array.from(sessions.entries()));
};

// Helper function to get session data
export const getSessionData = (sessionId) => {
    return sessions.get(sessionId);
};