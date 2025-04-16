
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    { text: "Hi! I'm your GroceryScout assistant. How can I help you today?", isUser: false }
  ]);
  const [inputText, setInputText] = useState("");
  
  const handleSend = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: inputText, isUser: true }]);
    
    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "I can help you find recipes based on ingredients you have.",
        "Would you like me to suggest some seasonal vegetables?",
        "Our fresh produce is delivered daily for maximum freshness.",
        "You can use the recipe assistant to find dishes based on your preferences.",
        "Is there anything specific you're looking for today?",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isUser: false }]);
    }, 1000);
    
    setInputText("");
  };
  
  return (
    <>
      <Button
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle size={24} />
      </Button>
      
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-30 animate-scale-in">
          <div className="bg-green-500 text-white p-3 flex justify-between items-center">
            <h3 className="font-medium">GroceryScout Assistant</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-white hover:bg-green-600"
              onClick={() => setIsOpen(false)}
            >
              <X size={16} />
            </Button>
          </div>
          
          <div className="h-80 overflow-y-auto p-3 bg-gray-50">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-3 flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    msg.isUser 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t border-gray-200 flex">
            <Input
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 mr-2"
            />
            <Button 
              onClick={handleSend}
              className="bg-green-500 hover:bg-green-600 text-white"
              size="icon"
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
