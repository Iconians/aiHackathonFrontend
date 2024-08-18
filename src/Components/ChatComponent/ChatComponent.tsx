import { useEffect, useState } from "react";
import axios from "axios";
import "./ChatComponent.css";

export const ChatComponent = () => {
  const [messages, setMessages] = useState<{ text: string; type: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, type: "user" };
    setMessages([...messages, userMessage]);
    const apiUrl = import.meta.env.VITE_API_URL;
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.post(`${apiUrl}/chat`, {
        prevMessages: messages,
        message: input,
        userId: userId,
      });
      if (response.data.answer) {
        const aiMessage = { text: response.data.answer, type: "ai" };
        setMessages([...messages, userMessage, aiMessage]);
      } else {
        const aiMessage = { text: response.data.response, type: "ai" };
        setMessages([...messages, userMessage, aiMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setInput("");
    }
  };

  useEffect(() => {
    const getHistory = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      const userId = localStorage.getItem("userId");
      const transformedConversations: { text: string; type: string }[] = [];
      try {
        const response = await axios.get(`${apiUrl}/chatHistory`, {
          params: {
            userId: userId,
          },
        });
        response.data.forEach((conversation: { user: string; ai: string }) => {
          transformedConversations.push({
            text: conversation.user,
            type: "user",
          });
          transformedConversations.push({
            text: conversation.ai,
            type: "ai",
          });
        });
        setMessages(transformedConversations);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    getHistory();
  }, []);

  return (
    <div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div>
            <p className="speaker">{msg.type === "user" ? "You" : "AI"}</p>
            <div key={index} className={`chat-bubble ${msg.type}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type your message..."
        className="chat-input"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};
