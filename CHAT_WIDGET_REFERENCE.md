# Chat Widget - Technical Reference

## Overview

The chat widget is a fully integrated AI assistant powered by the Cosentus SDK. It provides real-time responses to questions about Cosentus RCM solutions.

## Architecture

```
User Input → ChatWidget Component → Cosentus SDK → Cosentus API → AI Response
                                         ↓
                                    Event Listeners
                                         ↓
                                    Update UI
```

## Implementation Details

### SDK Loading

**Location:** `app/layout.tsx`

```tsx
<script src="https://cosentusai.vercel.app/cosentus-voice.js" async></script>
```

The SDK is loaded asynchronously in the document head. The chat widget waits for it to be available before initializing.

### Initialization

**Location:** `app/components/ChatWidget.tsx`

```typescript
const chat = window.CosentusVoice.createChatAssistant()

// Event listeners
chat.on('message', (data) => {
  // Handle AI response
})

chat.on('loading', (data) => {
  // Show/hide loading indicator
})

chat.on('error', (data) => {
  // Handle errors
})
```

### Message Flow

1. **User Input**
   - User types message in input field
   - Presses Enter or clicks Send button
   - Input is validated (not empty, not loading, SDK ready)

2. **Send to AI**
   - Message added to UI immediately (optimistic update)
   - `chat.sendMessage(message)` called
   - Loading state set to true

3. **AI Processing**
   - SDK sends request to Cosentus API
   - Loading indicator shows (typing animation)
   - User cannot send new messages while loading

4. **Receive Response**
   - `message` event fires with AI response
   - Response added to UI
   - Loading state set to false
   - Auto-scroll to latest message

## State Management

### Component State

```typescript
const [messages, setMessages] = useState<Message[]>([])      // Chat history
const [inputValue, setInputValue] = useState('')             // Current input
const [isExpanded, setIsExpanded] = useState(false)          // Widget expanded?
const [loading, setLoading] = useState(false)                // AI thinking?
const [chatAssistant, setChatAssistant] = useState<any>(null) // SDK instance
```

### Message Interface

```typescript
interface Message {
  id: string           // Unique identifier
  text: string         // Message content
  sender: 'user' | 'assistant'  // Who sent it
  timestamp: Date      // When it was sent
}
```

## UI States

### 1. Initial State (Collapsed)
- Compact oval-shaped input
- Placeholder: "Ask me anything about RCM solutions..."
- No messages visible
- Widget does not expand until first message

### 2. Loading State
- Input disabled
- Placeholder: "AI is thinking..."
- Send button disabled
- Typing indicator visible in message area

### 3. Expanded State (After First Message)
- Widget expands to show messages
- Scrollable message area (max height: 600px desktop, 500px mobile)
- Messages displayed with user/assistant styling
- Auto-scroll to latest message

### 4. Error State
- Error message displayed in chat
- User can continue sending messages
- Graceful fallback if SDK fails to load

## Styling

### Colors

- **User Messages:** Blue gradient (`#87CEEB` to `#4A90E2`)
- **AI Messages:** Light gray (`#f1f5f9`)
- **Send Button:** Blue gradient (matches user messages)
- **Loading Dots:** Medium gray (`#94a3b8`)

### Animations

1. **Message Slide In**
   ```css
   @keyframes slideIn {
     from { opacity: 0; transform: translateY(10px); }
     to { opacity: 1; transform: translateY(0); }
   }
   ```

2. **Typing Indicator**
   ```css
   @keyframes typing {
     0%, 60%, 100% { transform: translateY(0); opacity: 0.7; }
     30% { transform: translateY(-10px); opacity: 1; }
   }
   ```

3. **Widget Expansion**
   - Smooth transition from oval to rounded rectangle
   - Border radius changes from 50px to 24px
   - Height expands to show messages

## Error Handling

### SDK Load Failure

```typescript
// Check every 100ms for up to 10 seconds
const checkInterval = setInterval(() => {
  if (window.CosentusVoice) {
    initializeChat()
    clearInterval(checkInterval)
  }
}, 100)

setTimeout(() => clearInterval(checkInterval), 10000)
```

### Message Send Failure

```typescript
try {
  await chatAssistant.sendMessage(messageToSend)
} catch (error) {
  // Show error message in chat
  const errorMessage = {
    text: "Sorry, I'm having trouble connecting...",
    sender: 'assistant'
  }
  setMessages(prev => [...prev, errorMessage])
}
```

### API Errors

The SDK's `error` event listener catches API errors:

```typescript
chat.on('error', (data) => {
  console.error('Chat error:', data.error)
  // Display user-friendly error in chat
})
```

## Performance Optimizations

1. **Async SDK Loading** - Doesn't block page render
2. **Lazy Initialization** - Chat only initializes when SDK is ready
3. **Optimistic Updates** - User messages appear immediately
4. **Auto-scroll** - Only triggers when messages change
5. **Memoization** - Event listeners set up once on mount

## Accessibility

- ✅ Keyboard navigation (Enter to send)
- ✅ Disabled states for loading/unavailable
- ✅ Clear visual feedback for all states
- ✅ Descriptive button titles/tooltips
- ✅ Semantic HTML structure

## Mobile Responsiveness

### Breakpoint: 768px

**Desktop (>768px):**
- Max height: 600px
- Message bubbles: 75% max width
- Full padding and spacing

**Mobile (≤768px):**
- Max height: 500px
- Message bubbles: 85% max width
- Adjusted padding for smaller screens

## Testing Checklist

### Functionality
- [ ] Widget appears on page load
- [ ] Can type in input field
- [ ] Send button works
- [ ] Enter key sends message
- [ ] Widget expands on first message
- [ ] AI responds to messages
- [ ] Loading indicator appears
- [ ] Messages are scrollable
- [ ] Error handling works

### Visual
- [ ] Colors match design (baby blue, white, gray)
- [ ] Animations are smooth
- [ ] Responsive on mobile
- [ ] Messages are readable
- [ ] Icons display correctly

### Edge Cases
- [ ] Empty message doesn't send
- [ ] Multiple rapid messages handled
- [ ] SDK load failure handled
- [ ] API error handled
- [ ] Long messages wrap correctly
- [ ] Many messages scroll correctly

## Debugging

### Check SDK Loaded

```javascript
// In browser console
console.log(window.CosentusVoice)
// Should show object with createChatAssistant method
```

### Check Chat Instance

```javascript
// In React DevTools
// Find ChatWidget component
// Check chatAssistant state (should not be null)
```

### Check Network Requests

1. Open DevTools → Network tab
2. Send a message
3. Look for requests to `cosentusai.vercel.app`
4. Check request/response payloads

### Common Issues

**Widget not appearing:**
- Check if ChatWidget component is rendered in page.tsx
- Check CSS modules are imported correctly

**SDK not loading:**
- Check network tab for 404 or CORS errors
- Verify script tag in layout.tsx
- Check console for JavaScript errors

**Messages not sending:**
- Check if chatAssistant is initialized (not null)
- Check if loading state is stuck
- Check network tab for API errors

**AI not responding:**
- Check `message` event listener is set up
- Check console for event data
- Verify API is not rate limited

## Future Enhancements

Potential improvements for later:

- [ ] Message persistence (localStorage)
- [ ] Conversation history across sessions
- [ ] Markdown support in messages
- [ ] File/image upload
- [ ] Voice input
- [ ] Suggested prompts/quick replies
- [ ] Chat reset button
- [ ] Export conversation
- [ ] Typing indicator for user
- [ ] Read receipts
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Custom themes

## API Reference

### SDK Methods Used

```typescript
// Create chat instance
CosentusVoice.createChatAssistant()

// Send message
await chat.sendMessage(message: string)

// Event listeners
chat.on('message', callback)
chat.on('loading', callback)
chat.on('error', callback)
chat.on('initialized', callback)
chat.on('reset', callback)
```

### Event Data Structures

**message event:**
```typescript
{
  content: string,      // AI response text
  role: 'assistant',    // Always 'assistant'
  messageId: string     // Unique ID
}
```

**loading event:**
```typescript
{
  isLoading: boolean    // true when processing, false when done
}
```

**error event:**
```typescript
{
  error: string         // Error message
}
```

## File Locations

- **Component:** `app/components/ChatWidget.tsx`
- **Styles:** `app/components/ChatWidget.module.css`
- **SDK Script:** Loaded in `app/layout.tsx`
- **Used In:** `app/page.tsx`

## Dependencies

**Runtime:**
- Cosentus Voice SDK (loaded from CDN)
- React 18.2.0
- Next.js 14.2.35

**No npm packages needed!** The SDK is loaded via script tag.

---

**Last Updated:** January 8, 2026  
**Status:** Production Ready ✅

