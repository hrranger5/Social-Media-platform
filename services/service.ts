
import { GoogleGenAI, Type } from "@google/genai";
import { SocialData } from "../types";

const generateSocialData = async (): Promise<SocialData> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Generate a JSON object for a mini social media app.
    - It should contain an array of 8 users.
    - It should contain an array of 15 posts.
    - Each post should have between 0 and 5 comments.
    - Users should have a unique string id, name, a creative username, an avatarUrl using https://picsum.photos/seed/{username}/200, a short, interesting bio, and random followers and following counts between 50 and 500.
    - Posts should have a unique string id, an authorId linking to a user, engaging content, an optional imageUrl using https://picsum.photos/seed/{post-id}/600/400, a random number of likes between 0 and 200, an array of comments, and a recent ISO timestamp.
    - Comments should have a unique string id, a postId linking to a post, an authorId linking to a user, some text, and a recent ISO timestamp.
    - Ensure all authorId and postId references are valid. Make the content diverse and engaging, covering topics like technology, art, travel, and food.
  `;
  
  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    users: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                id: { type: Type.STRING },
                                name: { type: Type.STRING },
                                username: { type: Type.STRING },
                                avatarUrl: { type: Type.STRING },
                                bio: { type: Type.STRING },
                                followers: { type: Type.INTEGER },
                                following: { type: Type.INTEGER },
                            },
                            required: ["id", "name", "username", "avatarUrl", "bio", "followers", "following"],
                        },
                    },
                    posts: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                id: { type: Type.STRING },
                                authorId: { type: Type.STRING },
                                content: { type: Type.STRING },
                                // Fix: Removed nullable: true as it's not a valid schema property. Optionality is handled by not being in 'required'.
                                imageUrl: { type: Type.STRING },
                                likes: { type: Type.INTEGER },
                                timestamp: { type: Type.STRING },
                                comments: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            id: { type: Type.STRING },
                                            postId: { type: Type.STRING },
                                            authorId: { type: Type.STRING },
                                            text: { type: Type.STRING },
                                            timestamp: { type: Type.STRING },
                                        },
                                        required: ["id", "postId", "authorId", "text", "timestamp"],
                                    },
                                },
                            },
                            required: ["id", "authorId", "content", "likes", "timestamp", "comments"],
                        },
                    },
                },
                required: ["users", "posts"],
            },
        },
    });
    
    const jsonText = response.text.trim();
    const data: SocialData = JSON.parse(jsonText);
    
    // Simple validation and linking posts to comments
    data.posts.forEach(post => {
        post.comments.forEach(comment => {
            comment.postId = post.id;
        });
    });

    return data;
  } catch (error) {
    console.error("Error generating social data with Gemini:", error);
    throw new Error("Failed to generate social media content. Please check your API key and try again.");
  }
};

export { generateSocialData };
