import { useState } from "react";
import axios from "axios";

export const ChatComponent = ({ userId }: { userId: string | null }) => {
  const [messages, setMessages] = useState<{ text: string; type: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, type: "user" };
    setMessages([...messages, userMessage]);

    try {
      console.log(messages);
      const response = await axios.post("http://localhost:3000/chat", {
        prevMessages: messages,
        message: input,
        userId: userId,
      });
      console.log(response);
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

  return (
    <div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type your message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};
