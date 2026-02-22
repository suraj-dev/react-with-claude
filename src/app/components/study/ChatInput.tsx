"use client";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function ChatInput({
  onSendMessage,
  placeholder = "Ask me anything...",
  disabled = false,
}: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = inputValue.trim();
    if (trimmedMessage) {
      onSendMessage(trimmedMessage);
      setInputValue("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        className="flex-1"
        aria-label="Message input"
        disabled={disabled}
      />
      <Button type="submit" disabled={!inputValue.trim() || disabled}>
        Send
      </Button>
    </form>
  );
}
