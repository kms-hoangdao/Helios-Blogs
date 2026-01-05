# Notes:

## Objectives

- Implement a rich text editor modal for TFL file comments using Slate React
- Support dual-mode editing (Plain Text and Markdown)
- Enable mode switching with proper content preservation
- Implement validation (empty comments, 32,000 character limit)
- Handle formatted content pasting with style retention/stripping
- Implement comment persistence with local storage (API pending)
- Display success/error toast notifications
- Integrate with existing TFL Viewer and Comment Sidebar

## Technical Specification

- **Functional Requirements:**
  - Comment modal opens when user clicks "Add Comment" button in `CommentSidebar` component
  - Rich text editor with two modes: Plain Text (default) and Markdown
  - Mode toggle switch (Markdown mode off by default, placed in editor toolbar)
  - Real-time character counting displayed prominently (current / 32,000)
  - Character counter visual warning at 95% (30,400 characters) with yellow/warning styling
  - Hard character limit at 32,000 with input prevention (block keypress/paste that exceeds)
  - Paste handling:
    - In Markdown mode: retain bold, italic, lists (ul/ol), headings (h1-h6), links
    - Strip unsupported styles: colors, fonts, background, images, tables
    - Truncate if paste exceeds remaining character space
  - Empty comment validation: disable Save button when editor is empty or only whitespace
  - Save button validation: disabled when empty OR at/over character limit
  - Cancel/close modal: discard all editor content without saving, close dialog
  - Success toast on save: "Comment added successfully" (green toast, 3s duration)
  - Error toast on failure: "Something went wrong. Please try again later." (red toast, 5s duration)
  - Comments stored as plain text (serialized from Slate value) in comment list
  - Comments persist across TFL file sessions using localStorage with file-specific keys
  - Console.log comment payload on save for API integration verification (structured object with fileId, content, timestamp, author)
  - Modal includes header with title "Add Comment" and close button (X icon)
  - Modal footer with Cancel and Save buttons (Save is primary/blue, Cancel is secondary/gray)
  - Editor should autofocus when modal opens for immediate typing

- **Non-Functional Requirements:**
  - **Performance:**
    - Smooth typing experience even at character limit (no input lag)
    - Character counter updates in real-time without debouncing
    - Modal opens/closes with smooth animations (<300ms)
    - Slate editor renders efficiently for long content
  - **Accessibility:**
    - Full keyboard navigation support (Tab, Shift+Tab, Escape to close)
    - ARIA labels on all interactive elements (buttons, toggle, editor)
    - Focus management: trap focus within modal when open, restore focus on close
    - Screen reader announcements for character limit warnings and save/cancel actions
    - Semantic HTML structure (dialog role, heading hierarchy)
  - **Responsive Design:**
    - Modal adapts to viewport: 90% width on mobile, max 600px on desktop
    - Editor maintains minimum height (150px) and grows with content
    - Touch-friendly button sizes (min 44x44px) on mobile devices
    - Horizontal spacing adjusts for small screens
  - **User Experience:**
    - Clear visual feedback for all user actions (button hover states, focus rings)
    - Loading states if save operation takes >200ms
    - Confirmation prompt if user tries to close modal with unsaved content (optional enhancement)
    - Intuitive mode toggle with clear labels (Plain Text / Markdown)
  - **Code Quality:**
    - TypeScript strict mode enabled (no implicit any, strict null checks)
    - Unit test coverage >80% for all components and utilities
    - Storybook stories for all component states and variants
    - JSDoc comments on all public functions and complex logic
    - ESLint and Prettier compliance (enforced via pre-commit hooks)

- **Technical Architecture:**
  - **Components:**
    - `AddCommentDialog`: Main modal container at `src/features/view-tfl-uploaded/components/AddCommentDialog.tsx`
    - `RichTextEditor`: Slate editor wrapper at `src/features/view-tfl-uploaded/components/RichTextEditor/RichTextEditor.tsx`
    - `EditorToolbar`: Formatting toolbar at `src/features/view-tfl-uploaded/components/RichTextEditor/EditorToolbar.tsx`
    - `CharacterCounter`: Count display at `src/features/view-tfl-uploaded/components/RichTextEditor/CharacterCounter.tsx`
    - `ModeToggle`: Plain/Markdown switch at `src/features/view-tfl-uploaded/components/RichTextEditor/ModeToggle.tsx`
    - `CommentList`: Comment display at `src/components/CommentSidebar/CommentList.tsx`
    - `CommentItem`: Individual comment at `src/components/CommentSidebar/CommentItem.tsx`
  - **State Management:**
    - Zustand store at `src/features/view-tfl-uploaded/store.ts`
    - Store shape: `{ commentDialogOpen: boolean, comments: Comment[], editingCommentId: string | null }`
    - Actions: `setCommentDialogOpen`, `addComment`, `updateComment`, `deleteComment`, `loadCommentsFromStorage`, `saveCommentToStorage`
  - **Rich Text Editor:**
    - Slate React v0.119.0 (already installed per package.json)
    - Slate core library (to be installed)
    - Slate history plugin for undo/redo (to be installed)
    - Custom Slate plugins: character limit enforcement, paste filtering
    - Editor state: managed locally within `RichTextEditor` component
  - **UI Framework:**
    - Radix UI Dialog primitives (from `@/components/ui/dialog`)
    - Consistent with existing dialog pattern (CompanyDialog, ProjectDialog)
    - Tailwind CSS for styling (utility classes)
  - **Utilities:**
    - `slateUtils.ts`: Slate editor creation, serialization, deserialization functions
    - `pasteHandler.ts`: Clipboard processing and formatting filters
    - `commentStorage.ts`: localStorage CRUD operations for comments
  - **Storage:**
    - localStorage with key pattern: `tfl_comments_{fileId}`
    - JSON serialized array of Comment objects
    - Storage quota error handling (QuotaExceededError)

- **Data Flow:**
  1. **Comment Dialog Opening:**
     - User clicks "Add Comment" button in `CommentSidebar` component
     - Button onClick calls `useViewTflStore().setCommentDialogOpen(true)`
     - Store updates `commentDialogOpen` state to true
     - `AddCommentDialog` renders (mounted when open=true)
     - Modal appears with Slate editor initialized with empty value
     - Focus automatically moves to editor for immediate typing
  2. **Editing and Real-Time Updates:**
     - User types in editor, Slate handles onChange events
     - Character counter serializes Slate value to plain text and displays count
     - Visual warning appears when count reaches 30,400 (95%)
     - Further input blocked at 32,000 characters
     - User can toggle between Plain Text and Markdown modes
     - Mode toggle preserves existing content, updates rendering style
  3. **Paste Handling:**
     - User pastes content (Ctrl+V or Cmd+V)
     - Paste handler intercepts clipboard event
     - In Markdown mode: extract and convert supported HTML formatting to Slate nodes
     - Strip unsupported styles (colors, fonts, images)
     - Calculate new character count after paste
     - If exceeds limit: truncate content and show warning toast
     - Insert processed content into editor
  4. **Save Operation:**
     - User clicks Save button (enabled only if content is valid)
     - Validate: content not empty AND under 32,000 characters
     - Serialize Slate value to plain text using `serializeToPlainText()`
     - Create Comment object: `{ id: uuid(), fileId: currentFileId, content: plainText, createdAt: ISO string, author: currentUser }`
     - Console.log comment payload for API verification
     - Call `addComment(comment)` to update store
     - Call `saveCommentToStorage(fileId, comment)` to persist
     - Show success toast: "Comment added successfully"
     - Call `setCommentDialogOpen(false)` to close modal
     - Reset editor state to empty
  5. **Cancel/Close Operation:**
     - User clicks Cancel button or close (X) icon
     - Discard all editor content (no save)
     - Call `setCommentDialogOpen(false)` to close modal
     - Reset editor state to empty
  6. **Comment Display:**
     - `CommentList` component subscribes to `comments` array from store
     - Renders list of `CommentItem` components
     - Each `CommentItem` displays: content (plain text), timestamp (formatted), author name
  7. **Persistence and Loading:**
     - When TFL file opens in `DocumentViewer` component
     - useEffect hook calls `loadCommentsFromStorage(fileId)`
     - Load comments from localStorage using key `tfl_comments_{fileId}`
     - Parse JSON array and populate store `comments` array
     - Comments display immediately in `CommentSidebar`

- **Implementation Strategy:**
  - **Approach Selected:** Modular component architecture with Zustand state management and localStorage persistence
  - **Rationale:**
    - **Consistency:** Follows existing project patterns (Radix Dialog, Zustand stores, feature-based structure)
    - **Flexibility:** Slate React provides extensible rich text editing with full control
    - **Progressive Enhancement:** localStorage enables immediate testing without backend API dependency
    - **Maintainability:** Clear separation of concerns (editor logic, storage, state management)
    - **Type Safety:** TypeScript interfaces ensure compile-time type checking
    - **Testability:** Modular design allows isolated unit testing of components and utilities
    - **Future-Proof:** Store actions designed to easily swap localStorage with API calls
  - **Alternative Approaches Considered:**
    1. **TipTap Editor:**
       - Pros: Rich features, better documentation, ProseMirror-based
       - Cons: Larger bundle size (~100KB gzipped), heavier dependency
       - Rejected: Bundle size concern for single-use feature
    2. **Draft.js:**
       - Pros: Facebook-backed, mature library
       - Cons: Deprecated and no longer maintained since 2020
       - Rejected: Long-term maintenance risk
    3. **Quill:**
       - Pros: Easy to use, good performance
       - Cons: Limited TypeScript support, harder to customize
       - Rejected: TypeScript integration issues
    4. **Plain Textarea with Markdown Preview:**
       - Pros: Lightweight, simple
       - Cons: Poor UX for formatting, no WYSIWYG
       - Rejected: UX requirements demand rich editing

- **Success Criteria:**
  - **Functional Success:**
    - ✅ User can open comment modal from "Add Comment" button in sidebar
    - ✅ Editor supports typing with smooth performance
    - ✅ Character counter displays current count and shows warning at 95%
    - ✅ Character limit prevents input beyond 32,000 characters
    - ✅ Mode toggle switches between Plain Text and Markdown
    - ✅ Paste handling retains supported formatting and strips unsupported styles
    - ✅ Empty comments cannot be saved (Save button disabled)
    - ✅ Comments persist across page reloads (localStorage)
    - ✅ Success toast displays on successful save
    - ✅ Error toast displays on save failure
    - ✅ Console logs comment payload for API verification
    - ✅ Comments display correctly in comment list
    - ✅ Modal closes on cancel/close without saving
  - **Quality Success:**
    - ✅ Unit test coverage ≥80% for all components and utilities
    - ✅ Storybook stories demonstrate all component states
    - ✅ TypeScript compilation passes with strict mode
    - ✅ ESLint and Prettier checks pass
    - ✅ No console errors or warnings in development
  - **Performance Success:**
    - ✅ Typing latency <50ms at character limit
    - ✅ Modal open/close animation <300ms
    - ✅ Character counter updates without lag
  - **Accessibility Success:**
    - ✅ Keyboard navigation works (Tab, Escape)
    - ✅ Screen reader announces all interactions
    - ✅ Focus management prevents focus loss

- **Risk Considerations:**
  1. **Slate Learning Curve:**
     - **Risk:** Team unfamiliar with Slate API, potential development delays
     - **Mitigation:** Review official Slate documentation and examples before implementation; start with minimal editor, add features incrementally
     - **Contingency:** If Slate proves too complex, fallback to simpler textarea with Markdown preview
  2. **Character Counting with Formatting:**
     - **Risk:** Slate internal representation (JSON) vs. plain text length mismatch
     - **Mitigation:** Always serialize to plain text before counting characters; validate count logic with unit tests
     - **Contingency:** Add buffer (e.g., 31,500 char display limit) to prevent edge cases
  3. **Paste Handling Complexity:**
     - **Risk:** Different browsers provide different clipboard formats (HTML, RTF, plain text)
     - **Mitigation:** Implement incremental paste filters; test on Chrome, Firefox, Safari; handle clipboard API inconsistencies
     - **Contingency:** Strip all formatting on paste as fallback behavior
  4. **localStorage Size Limits:**
     - **Risk:** localStorage quota (5-10MB) may be exceeded with many long comments
     - **Mitigation:** Add quota checks; catch QuotaExceededError; show error toast; implement comment pagination or archiving
     - **Contingency:** Warn users when storage nears limit; suggest deleting old comments
  5. **API Integration Changes:**
     - **Risk:** Backend API contract may differ from localStorage structure
     - **Mitigation:** Design store actions with abstract persistence layer; use adapter pattern for API calls; console.log current structure for early validation
     - **Contingency:** Create migration utility to transform localStorage data to API format
  6. **Cross-Browser Compatibility:**
     - **Risk:** Slate behavior varies across browsers (especially Safari)
     - **Mitigation:** Test on Chrome, Firefox, Safari, Edge; use Slate's browser-specific plugins; check for DOM API polyfills
     - **Contingency:** Display browser compatibility warning if issues detected
  7. **Performance with Large Comment Lists:**
     - **Risk:** Rendering many comments in sidebar may cause lag
     - **Mitigation:** Implement virtual scrolling or pagination for comment list; lazy load comments on demand
     - **Contingency:** Limit displayed comments to most recent 50, add "Load More" button

# Ticket Id:

[USER TO INPUT - TFL Comment System with Rich Text Editor]

# Task List

- [x] **High-Level Task 1: Setup Slate dependencies and core editor infrastructure**
  - [x] 1.1: Install Slate packages - Run `npm install slate slate-history` to add missing Slate core and history packages (slate-react@0.119.0 already installed per package.json)
  - [x] 1.2: Create Slate TypeScript type extensions at `src/features/view-tfl-uploaded/types/slate.d.ts` with custom type declarations extending Slate's `Editor`, `Element` (paragraph, heading, list, list-item), and `Text` (bold, italic, code) types for TypeScript autocomplete and type safety
  - [x] 1.3: Create Slate utility functions file at `src/features/view-tfl-uploaded/utils/slateUtils.ts` containing: `createEditor()` function returning Slate editor with history plugin, `initialEditorValue` constant (empty paragraph node), `serializeToPlainText(nodes)` function converting Slate nodes to plain text string, `serializeToMarkdown(nodes)` function converting Slate nodes to Markdown string, and `deserializeFromMarkdown(markdown)` function parsing Markdown to Slate nodes
  - [x] 1.4: Create character counting utility function `countCharacters(nodes)` in `slateUtils.ts` that serializes Slate nodes to plain text and returns character count (used for real-time counter validation)

- [x] **High-Level Task 2: Extend Zustand store with comment management**
  - [x] 2.1: Create Comment type definition in `src/features/view-tfl-uploaded/types.ts` with interface containing: `id: string`, `fileId: string`, `content: string` (plain text), `createdAt: string` (ISO 8601 timestamp), `updatedAt: string`, `author: { id: string, name: string }`, `version: number` (for future optimistic updates)
  - [x] 2.2: Update `src/features/view-tfl-uploaded/store.ts` to add comment state properties: `commentDialogOpen: boolean` (default false), `comments: Comment[]` (default empty array), `editingCommentId: string | null` (default null for future edit feature)
  - [x] 2.3: Implement store action `setCommentDialogOpen(open: boolean)` updating `commentDialogOpen` state
  - [x] 2.4: Implement store action `addComment(comment: Comment)` that: appends comment to `comments` array, sorts by createdAt descending, calls `saveCommentToStorage()` helper (from task 7.1)
  - [x] 2.5: Implement store action `loadCommentsFromStorage(fileId: string)` that: calls `loadComments(fileId)` utility (from task 7.1), updates `comments` state with loaded array, handles errors gracefully
  - [x] 2.6: Add store selector `getCommentsByFileId(fileId: string)` returning filtered comments array for specific TFL file (preparation for multi-file support)

- [x] **High-Level Task 3: Build RichTextEditor component with character counter**
  - [x] 3.1: Create `RichTextEditor` component at `src/features/view-tfl-uploaded/components/RichTextEditor/RichTextEditor.tsx` with props: `value: Descendant[]` (Slate nodes), `onChange: (value: Descendant[]) => void`, `maxCharacters: number` (default 32000), `disabled: boolean`, `autoFocus: boolean`, accepting Slate editor instance with history plugin, rendering Slate `<Editable>` component with custom renderElement and renderLeaf functions
  - [x] 3.2: Implement custom `renderElement` function in `RichTextEditor` supporting element types: paragraph (default), heading (h1-h6), bulleted-list, numbered-list, list-item, with appropriate HTML tags and Tailwind CSS classes
  - [x] 3.3: Implement custom `renderLeaf` function in `RichTextEditor` supporting text marks: bold, italic, code, with appropriate styling (font-weight-bold, italic, monospace font)
  - [x] 3.4: Add character limit enforcement in `RichTextEditor` onChange handler: calculate character count using `countCharacters()` (from task 1.4), prevent updates if new count exceeds maxCharacters, show toast warning when limit reached
  - [x] 3.5: Create `CharacterCounter` component at `src/features/view-tfl-uploaded/components/RichTextEditor/CharacterCounter.tsx` with props: `count: number`, `maxCount: number`, displaying "X / 32,000 characters" with conditional styling (text-gray-600 normal, text-yellow-600 at ≥95%, text-red-600 at 100%)
  - [x] 3.6: Integrate `CharacterCounter` (from task 3.5) into `RichTextEditor` component, positioned below editor area with right alignment
  - [x] 3.7: Add accessibility features to `RichTextEditor`: aria-label="Comment editor", aria-describedby pointing to character counter, role="textbox", aria-multiline="true"
  - [x] 3.8: Export `RichTextEditor` from `src/features/view-tfl-uploaded/components/RichTextEditor/index.ts`

- [x] **High-Level Task 4: Implement mode toggle and editor toolbar**
  - [x] 4.1: Create `EditorMode` type in `src/features/view-tfl-uploaded/types.ts` as union type: `'plain' | 'markdown'`
  - [x] 4.2: Create `ModeToggle` component at `src/features/view-tfl-uploaded/components/RichTextEditor/ModeToggle.tsx` with props: `mode: EditorMode`, `onModeChange: (mode: EditorMode) => void`, `disabled: boolean`, rendering Radix UI Switch component (from `@/components/ui/switch`) with labels "Plain Text" and "Markdown"
  - [x] 4.3: Add mode state management to `RichTextEditor` component: useState for `mode: EditorMode` (default 'plain'), callback `handleModeChange` that preserves editor content when switching modes
  - [x] 4.4: Create `EditorToolbar` component at `src/features/view-tfl-uploaded/components/RichTextEditor/EditorToolbar.tsx` with props: `editor: Editor`, `disabled: boolean`, rendering formatting buttons: Bold (Cmd+B), Italic (Cmd+I), Heading (dropdown), Bulleted List, Numbered List, using lucide-react icons (Bold, Italic, Heading, List, ListOrdered from `lucide-react`)
  - [x] 4.5: Implement toolbar button handlers in `EditorToolbar` using Slate Transforms API: `toggleBold()`, `toggleItalic()`, `toggleHeading(level)`, `toggleBulletedList()`, `toggleNumberedList()` modifying editor nodes
  - [x] 4.6: Conditionally render `EditorToolbar` (from task 4.4) in `RichTextEditor` only when mode is 'markdown', positioned above Slate Editable component
  - [x] 4.7: Integrate `ModeToggle` (from task 4.2) into `RichTextEditor` component, positioned in top-right corner of editor container
  - [x] 4.8: Update editor rendering based on mode: in 'plain' mode disable all formatting (renderLeaf returns plain text), in 'markdown' mode enable full formatting with toolbar

- [x] **High-Level Task 5: Implement paste handling with format filtering**
  - [x] 5.1: Create paste handler utility file at `src/features/view-tfl-uploaded/utils/pasteHandler.ts` with function `processPaste(event: ClipboardEvent, editor: Editor, maxCharacters: number): boolean` returning true if paste was processed
  - [x] 5.2: Implement clipboard data extraction in `processPaste()`: read `event.clipboardData.getData('text/html')` for rich text, fallback to `getData('text/plain')` for plain text
  - [x] 5.3: Create HTML-to-Slate converter function `htmlToSlate(html: string): Descendant[]` in `pasteHandler.ts` that: parses HTML using DOMParser, traverses DOM nodes, converts supported tags (p, h1-h6, ul, ol, li, strong, em, b, i) to Slate nodes, strips unsupported elements (style, script, img, table, font tags) and attributes (style, color, class)
  - [x] 5.4: Implement character limit check in `processPaste()`: calculate current character count, calculate pasted content character count, if total exceeds maxCharacters truncate pasted content to fit remaining space, show warning toast "Pasted content truncated to fit character limit"
  - [x] 5.5: Add paste event handler to `RichTextEditor` Editable component: onPaste={(e) => processPaste(e, editor, maxCharacters)}, preventDefault if processPaste returns true
  - [x] 5.6: Handle paste in plain text mode: strip ALL formatting, insert only plain text content

- [x] **High-Level Task 6: Create AddCommentDialog modal component**
  - [x] 6.1: Create `AddCommentDialog` component at `src/features/view-tfl-uploaded/components/AddCommentDialog.tsx` with props: `open: boolean`, `onOpenChange: (open: boolean) => void`, `fileId: string`, using Radix UI Dialog components from `@/components/ui/dialog` (Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter)
  - [x] 6.2: Initialize local state in `AddCommentDialog`: `editorValue: Descendant[]` (default to `initialEditorValue` from task 1.3), `isSaving: boolean` (default false)
  - [x] 6.3: Integrate `RichTextEditor` (from task 3.1) into dialog content area with props: value={editorValue}, onChange={setEditorValue}, autoFocus={true}, maxCharacters={32000}
  - [x] 6.4: Implement save validation in `AddCommentDialog`: create `canSave` computed boolean checking editorValue is not empty (serializeToPlainText not empty/whitespace) AND character count ≤32000
  - [x] 6.5: Implement `handleSave` async function in `AddCommentDialog` that: sets isSaving=true, serializes editorValue to plain text using `serializeToPlainText()` (from task 1.3), gets current user from auth store (useAuthStore), creates Comment object with id (crypto.randomUUID()), fileId, content (plain text), createdAt (new Date().toISOString()), author (current user), console.logs comment object, calls `addComment()` store action (from task 2.4), shows success toast "Comment added successfully" using `triggerToast()` from `@/components/Toast`, calls onOpenChange(false), resets editorValue to initial, catches errors and shows error toast "Something went wrong. Please try again later."
  - [x] 6.6: Implement `handleCancel` function that: resets editorValue to initial, calls onOpenChange(false)
  - [x] 6.7: Add dialog footer buttons: Cancel button (variant="outline", onClick={handleCancel}), Save button (variant="default", onClick={handleSave}, disabled={!canSave || isSaving}, shows loading spinner when isSaving)
  - [x] 6.8: Add DialogTitle "Add Comment" in DialogHeader with close button (X icon)
  - [x] 6.9: Add keyboard shortcuts: Escape to close (built-in Radix Dialog), Cmd+Enter / Ctrl+Enter to save (if canSave)
  - [x] 6.10: Export `AddCommentDialog` from `src/features/view-tfl-uploaded/components/AddCommentDialog.tsx`

- [x] **High-Level Task 7: Implement localStorage persistence utilities**
  - [x] 7.1: Create storage utility file at `src/features/view-tfl-uploaded/utils/commentStorage.ts` with functions: `saveComment(fileId: string, comment: Comment): void`, `loadComments(fileId: string): Comment[]`, `deleteComment(fileId: string, commentId: string): void`, using localStorage API with key pattern `tfl_comments_{fileId}`
  - [x] 7.2: Implement `saveComment()` function in `commentStorage.ts` that: loads existing comments array from localStorage, appends new comment, stringifies JSON, attempts localStorage.setItem, catches QuotaExceededError and throws custom error with message "Storage quota exceeded. Please delete old comments."
  - [x] 7.3: Implement `loadComments()` function that: reads from localStorage using key `tfl_comments_{fileId}`, parses JSON, validates structure (array of Comment objects), returns empty array if key doesn't exist or parsing fails, sorts comments by createdAt descending
  - [x] 7.4: Implement `deleteComment()` function that: loads comments array, filters out comment with matching id, saves updated array back to localStorage
  - [x] 7.5: Add storage quota check utility `checkStorageQuota(): { used: number, remaining: number }` calculating localStorage usage, estimating remaining space
  - [x] 7.6: Update store action `saveCommentToStorage()` (from task 2.4) to use `saveComment()` utility and handle QuotaExceededError by showing error toast

- [x] **High-Level Task 8: Integrate comment modal with CommentSidebar**
  - [x] 8.1: Update `src/components/CommentSidebar/CommentSidebar.tsx` to import: `useViewTflStore` hook from `@/features/view-tfl-uploaded/store`, `AddCommentDialog` component (from task 6.1)
  - [x] 8.2: Get comment dialog state in `CommentSidebar`: destructure `commentDialogOpen` and `setCommentDialogOpen` from `useViewTflStore()`
  - [x] 8.3: Get current TFL file ID in `CommentSidebar`: access from parent component props or route params (e.g., `fileId: string` prop)
  - [x] 8.4: Update "Add Comment" button onClick handler in `CommentSidebar` to call `setCommentDialogOpen(true)`
  - [x] 8.5: Render `AddCommentDialog` component in `CommentSidebar` with props: open={commentDialogOpen}, onOpenChange={setCommentDialogOpen}, fileId={fileId}
  - [x] 8.6: Create `CommentList` component at `src/components/CommentSidebar/CommentList.tsx` with props: `comments: Comment[]`, rendering list of comments with EmptyState message "No comments yet" when empty, using virtualized list if comments.length >50
  - [x] 8.7: Create `CommentItem` component at `src/components/CommentSidebar/CommentItem.tsx` with props: `comment: Comment`, displaying: author name (bold), timestamp (formatted with dayjs relative time e.g., "2 hours ago"), comment content (plain text, truncated to 3 lines with "Read more"), using Card component from `@/components/ui/card`
  - [x] 8.8: Integrate `CommentList` (from task 8.6) into `CommentSidebar` rendering comments from store: `useViewTflStore().comments`
  - [x] 8.9: Add useEffect in `CommentSidebar` to load comments when component mounts or fileId changes: call `loadCommentsFromStorage(fileId)` (from task 2.5)

- [x] **High-Level Task 9: Add API integration preparation layer**
  - [x] 9.1: Create API service file at `src/features/view-tfl-uploaded/services/commentApi.ts` with TypeScript function signatures (not implemented): `createComment(fileId: string, content: string): Promise<Comment>`, `getComments(fileId: string): Promise<Comment[]>`, `updateComment(commentId: string, content: string): Promise<Comment>`, `deleteComment(commentId: string): Promise<void>`
  - [x] 9.2: Define API request/response types in `src/features/view-tfl-uploaded/types.ts`: `CommentApiRequest` interface with `fileId: string`, `content: string`, `CommentApiResponse` interface with `id: string`, `fileId: string`, `content: string`, `createdAt: string`, `updatedAt: string`, `author: { id: string, name: string, email: string }`
  - [x] 9.3: Add TODO comments in store actions (from task 2.4, 2.5) with specific instructions: "// TODO: Replace saveCommentToStorage with commentApi.createComment()", "// TODO: Replace loadCommentsFromStorage with commentApi.getComments()"
  - [x] 9.4: Add console.log statements in `handleSave` (from task 6.5) logging structured payload: `{ action: 'createComment', fileId, content, author, timestamp, metadata: { characterCount, mode } }` for API integration debugging

- [ ] **High-Level Task 10: Enhance error handling and edge cases**
  - [ ] 10.1: Add error boundary around `AddCommentDialog` to catch Slate editor crashes, render fallback UI with "Editor failed to load. Please refresh and try again."
  - [ ] 10.2: Implement debounced autosave draft to localStorage: save editor content every 5 seconds while user is typing, load draft on dialog open, clear draft on successful save or cancel
  - [ ] 10.3: Add confirmation dialog when user tries to close modal with unsaved content: show Radix AlertDialog with "Discard unsaved comment?" message, "Cancel" and "Discard" buttons
  - [ ] 10.4: Handle edge case of empty editor with only whitespace: update validation to trim content before checking isEmpty
  - [ ] 10.5: Add loading state for comment list while loading from storage: show skeleton loaders (3 placeholder comment cards)
  - [ ] 10.6: Implement retry logic for localStorage operations: wrap in try-catch, retry up to 3 times with exponential backoff on failures
  - [ ] 10.7: Add browser compatibility check: detect if Slate is supported (check for required DOM APIs), show warning banner if unsupported browser detected

# Current Goal

**High-Level Task 10: Enhance error handling and edge cases**

Focus on implementing error boundaries, autosave functionality, confirmation dialogs, edge case handling, loading states, retry logic, and browser compatibility checks for robust production-ready code.

# Notes for Testing & Documentation Workflows

**Unit Testing Requirements** (to be handled by separate testing workflow):

- Test `AddCommentDialog` component: dialog open/close, save validation, character limit enforcement, toast messages
- Test `RichTextEditor` component: typing behavior, mode toggle functionality, character counter accuracy, paste handling
- Test `slateUtils` functions: serialization accuracy, editor creation, markdown conversion
- Test `commentStorage` utilities: localStorage operations, quota error handling, data integrity
- Test store actions: comment CRUD operations, state updates, storage integration

**Documentation Requirements** (to be handled by separate documentation workflow):

- Create Storybook story for `AddCommentDialog` with states: empty, with content, character limit reached, error state
- Create Storybook story for `RichTextEditor` with Plain Text mode and Markdown mode variants
- Update/create Storybook story for `CommentSidebar` showing comment modal integration
- Add JSDoc comments to all public functions and components with usage examples and parameter descriptions
