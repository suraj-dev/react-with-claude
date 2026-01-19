"use client";

/**
 * ChatInput Component
 *
 * Module 3: State Management with useState
 *
 * This component demonstrates how to:
 * - Use the useState hook to manage input value
 * - Handle form submission
 * - Implement input validation
 * - Work with controlled components
 */

// TODO: Import the useState hook from React
// HINT: import { useState } from "react";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
}

export function ChatInput({
  onSendMessage,
  placeholder = "Ask me anything...",
}: ChatInputProps) {
  // TODO: Create state for the input value
  // HINT: const [inputValue, setInputValue] = useState("");
  // The state should be initialized with an empty string

  /**
   * TODO: Implement the handleSubmit function
   *
   * REQUIREMENTS:
   * 1. Prevent the default form submission behavior
   * 2. Trim whitespace from the input value
   * 3. Validate that the message is not empty
   * 4. If valid, call onSendMessage with the trimmed value
   * 5. Clear the input field after sending
   *
   * HINT: Use e.preventDefault() to prevent page reload
   * HINT: Use inputValue.trim() to remove whitespace
   * HINT: Check if trimmed value length is > 0
   */
  const handleSubmit = (e: React.FormEvent) => {
    // TODO: Implement this function
    // e.preventDefault();
    // const trimmedMessage = ...
    // if (trimmedMessage) {
    //   onSendMessage(trimmedMessage);
    //   setInputValue("");
    // }
  };

  /**
   * TODO: Implement the handleInputChange function
   *
   * This function should update the state when the user types
   *
   * HINT: Get the value from e.target.value
   * HINT: Call setInputValue with the new value
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: setInputValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder={placeholder}
        // TODO: Set the value prop to your inputValue state
        // value={inputValue}
        // TODO: Set the onChange prop to your handleInputChange function
        // onChange={handleInputChange}
        className="flex-1"
        aria-label="Message input"
      />
      <Button
        type="submit"
        // TODO: Disable the button when input is empty (after trimming)
        // HINT: disabled={!inputValue.trim()}
      >
        Send
      </Button>
    </form>
  );
}

/**
 * ✓ VERIFY: After completing this component:
 * - Typing in the input updates the state
 * - Submitting sends the message and clears the input
 * - Empty messages (or only whitespace) are not sent
 * - Button is disabled when input is empty
 * - Pressing Enter submits the form
 * - No console errors or warnings
 *
 * TEST IT:
 * <ChatInput onSendMessage={(msg) => console.log('Sent:', msg)} />
 * - Type a message and click Send
 * - Try submitting with only spaces
 * - Try pressing Enter to submit
 */

/**
 * BONUS CHALLENGE:
 * Add these features for extra practice:
 * 1. Character limit (e.g., max 500 characters)
 * 2. Show character count: {inputValue.length}/500
 * 3. Loading state: disable input while message is being sent
 * 4. Add a keyboard shortcut (Cmd/Ctrl + Enter to send)
 */
