# Chatbot Flow Builder

A modern, interactive flow builder for creating chatbot conversations using React and React Flow. Build complex chatbot workflows with multiple node types, quick reply buttons, and media support.

🌐 **Live Demo**: [https://sidak131singh.github.io/chatbot-Flow-Builder/](https://sidak131singh.github.io/chatbot-Flow-Builder/)

## 🎯 Features

### Core Functionality
- **Multiple Node Types**: 
  - 🔵 **Trigger Node**: Keyword-based conversation triggers
  - 💬 **Message Node**: Text messages with quick reply buttons
  - 🖼️ **Media Node**: Send images, videos, audio, and documents
- **Drag & Drop Interface**: Easily add nodes to your canvas
- **Visual Flow Design**: Connect nodes to define conversation flow
- **Real-time Editing**: Edit content with instant preview on both node and settings panel
- **Quick Reply Buttons**: Add up to 3 interactive buttons per message/media node
- **Individual Button Connections**: Each button creates its own connection handle

### Advanced Features
- **Flow Validation**: 
  - Ensures proper flow structure before saving
  - Validates all non-trigger nodes have incoming connections
  - Provides suggestions for unconnected buttons
  - Shows persistent suggestion panel with close option
- **Export Options**:
  - 📥 Download flow as PNG image
  - 📄 Download flow as PDF document
  - Auto-fit view before capture for complete flow
  - High-quality 2x resolution exports
- **Smart UI**:
  - Clean, modern interface with smooth animations
  - Separate settings panels for each node type
  - Toast notifications for validation feedback
  - Responsive layout with proper spacing

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sidak131singh/chatbot-Flow-Builder.git
   cd chatbot-Flow-Builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 How to Use

### Creating Nodes

1. **From Node Panel**: 
   - Drag "Message" or "Media" to the canvas, OR
   - Click to add at center
2. **Node Types**:
   - **Trigger**: Keyword-based entry point (automatically placed on start)
   - **Message**: Text messages with optional quick reply buttons
   - **Media**: Send media content (image/video/audio/document) with caption and buttons

### Connecting Nodes

1. Hover over a node to see connection handles (circles on sides)
2. **Drag from**:
   - Right handle (source) for basic connections
   - Individual button handles for button-specific paths
3. **Drag to**: Left handle (target) of another node
4. Multiple nodes can connect to one target
5. Each button creates its own conversation branch

### Editing Content

#### Message Nodes
1. Click on the node to open Settings Panel
2. Edit message text in real-time
3. Add quick reply buttons (max 3):
   - Click "+ Add Button"
   - Enter button text
   - Each button gets its own connection handle
4. Remove buttons with × icon

#### Media Nodes
1. Select media type (Image/Video/Audio/Document)
2. Enter media URL
3. Add caption text
4. Add quick reply buttons (max 3)
5. All changes reflect in real-time on canvas

#### Trigger Node
1. Add keyword phrases that trigger the conversation
2. Use "+ Add Keyword" button
3. Remove keywords with × icon

### Validating & Saving

1. Click **"Validate Flow"** button in header
2. System checks:
   - ✅ All non-trigger nodes have incoming connections
   - ✅ All quick reply buttons are connected (suggestions shown if not)
3. View suggestions in yellow box (can be dismissed)
4. Valid flow data logged to console

### Exporting Flow

1. Click **"Download"** dropdown in header
2. Choose format:
   - **PNG**: High-resolution image (2x scale)
   - **PDF**: A4 format with auto-orientation
3. Flow auto-fits to include all nodes before export
4. File saved with timestamp: `chatbot-flow-YYYY-MM-DD.png/pdf`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── MessageNode.jsx          # Text message node
│   ├── MessageNode.css
│   ├── MediaNode.jsx            # Media content node
│   ├── MediaNode.css
│   ├── TriggerNode.jsx          # Keyword trigger node
│   ├── TriggerNode.css
│   ├── NodePanel.jsx            # Node selection panel
│   ├── NodePanel.css
│   ├── SettingsPanel.jsx        # Message node settings
│   ├── SettingsPanel.css
│   ├── MediaSettingsPanel.jsx   # Media node settings
│   ├── MediaSettingsPanel.css
│   ├── TriggerSettingsPanel.jsx # Trigger node settings
│   ├── TriggerSettingsPanel.css
│   ├── SaveButton.jsx           # Validation logic
│   ├── SaveButton.css
│   ├── DownloadButton.jsx       # Export functionality
│   ├── DownloadButton.css
│   ├── Toast.jsx                # Notification component
│   ├── Toast.css
│   ├── Suggestions.jsx          # Persistent suggestion panel
│   └── Suggestions.css
├── App.jsx                      # Main application
├── App.css
├── index.js
└── index.css
```

## 🎨 UI Components

### Node Types

**Trigger Node** (Cyan header)
- Keyword event input
- Add/remove keywords
- Entry point for conversations

**Message Node** (Cyan header)
- Message text input
- Quick reply buttons (0-3)
- Individual button connection handles
- Default source handle (when no buttons)

**Media Node** (Cyan header)
- Media type selector dropdown
- URL input field
- Caption textarea
- Quick reply buttons (0-3)
- File upload placeholder

### Panels

**Node Panel**
- Display available node types with icons
- Drag & drop or click to add
- Message icon: 💬 (chat bubble)
- Media icon: 🖼️ (image)

**Settings Panels**
- Context-specific editing for each node type
- Real-time synchronization with canvas
- Back button to return to Node Panel
- Input fields update both panel and node

**Suggestions Panel**
- Yellow background with border
- Lists unconnected button suggestions
- Close button (×) to dismiss
- Animates position when toast disappears

### Buttons

**Validate Flow** (Blue)
- Header placement
- Runs comprehensive validation
- Shows toast notification with results
- Displays suggestions if needed

**Download** (Green with dropdown)
- PNG and PDF export options
- Dropdown menu with icons
- Auto-fit view before capture
- High-quality output (2x scale)

## 🔧 Technical Details

### Technologies Used
- **React 18.2**: Modern React with hooks
- **React Flow 11.10**: Flow-based programming interface
- **html2canvas 1.4**: Canvas screenshot capture
- **jsPDF 3.0**: PDF generation library
- **CSS3**: Modern styling with animations and flexbox

### Key Features Implementation

**Real-time Sync**: 
- `onUpdateNode` callback updates both nodes and selectedNode state
- Changes in settings panel instantly reflect on canvas

**Button Handles**:
- Dynamic handle generation based on button array
- Individual handles with IDs: `button-0`, `button-1`, `button-2`
- Default handle hidden when buttons exist

**Export System**:
- `fitView` with padding before capture
- Configurable wait time for render completion
- Extended capture area with scroll offsets
- A4 PDF with landscape/portrait auto-detection

**Validation Logic**:
- Checks all non-trigger nodes for incoming connections
- Identifies unconnected quick reply buttons
- Separate toast (auto-dismiss) and suggestions (persistent)


## 👨‍💻 Author

**Sidak Singh**
- GitHub: [@sidak131singh](https://github.com/sidak131singh)
- Repository: [chatbot-Flow-Builder](https://github.com/sidak131singh/chatbot-Flow-Builder)
