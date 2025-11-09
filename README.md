# Chatbot Flow Builder

A modern, interactive flow builder for creating chatbot conversations using React and React Flow. Build complex chatbot workflows with multiple node types, quick reply buttons, and media support.

🌐 **Live Demo**: [https://sidak131singh.github.io/chatbot-Flow-Builder/](https://sidak131singh.github.io/chatbot-Flow-Builder/)

## 🎯 Features

- **Multiple Node Types**: Trigger (keyword-based), Message (text), and Media (images/videos/audio/documents)
- **Quick Reply Buttons**: Add up to 3 interactive buttons per message/media node with individual connection handles
- **Real-time Editing**: Instant synchronization between canvas nodes and settings panel
- **Flow Validation**: Ensures proper structure with suggestions for unconnected elements
- **Export Options**: Download flows as PNG or PDF with high-quality 2x resolution
- **Drag & Drop Interface**: Intuitive node placement and connection system

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sidak131singh/chatbot-Flow-Builder.git
   cd chatbot-Flow-Builder
   ```

2. Install dependencies and start:
   ```bash
   npm install
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

### Adding Nodes

1. **From Node Panel**: Drag nodes to canvas OR click to add at center
2. **Node Types**:
   - **Trigger**: Starting point with keyword triggers
   - **Message**: Text messages with optional buttons
   - **Media**: Images/videos/audio/documents with captions

### Working with Nodes

- **Drag Node**: Click and hold anywhere inside the node to move it
- **Open Settings**: Click inside the node (outside input areas) to open the settings panel
- **Edit Content**: Type directly in canvas textareas or use the settings panel for detailed editing
- **Delete Node**: Click the delete button (trash icon) on the node header

### Connecting Nodes

1. Hover over a node to see connection handles
2. **Drag from**: Right handle (source) or individual button handles
3. **Drag to**: Left handle (target) of another node
4. Each button creates its own conversation path

### Editing Content

**Message/Media Nodes:**
- Edit text directly on canvas or in settings panel (both sync in real-time)
- Add buttons: Click "+ Add Button", enter text (max 3 per node)
- Remove buttons: Click × icon
- Each button gets its own connection handle

**Media Nodes:**
- Select media type from dropdown
- Enter media URL
- Add optional caption and buttons

**Trigger Node:**
- Add/remove keyword phrases
- Keywords trigger the conversation flow

### Validation & Export

1. **Validate Flow**: Click "Validate Flow" button
   - Checks all nodes have incoming connections
   - Shows suggestions for unconnected buttons
   
2. **Download**: Choose PNG or PDF format
   - Auto-fits view before export
   - High-quality output with timestamp

## 🏗️ Project Structure

```
src/
├── components/
│   ├── MessageNode.jsx/css      # Text message node
│   ├── MediaNode.jsx/css        # Media content node
│   ├── TriggerNode.jsx/css      # Keyword trigger node
│   ├── NodePanel.jsx/css        # Node selection panel
│   ├── SettingsPanel.jsx/css    # Message settings
│   ├── MediaSettingsPanel.jsx/css   # Media settings
│   ├── TriggerSettingsPanel.jsx/css # Trigger settings
│   ├── SaveButton.jsx/css       # Validation logic
│   ├── DownloadButton.jsx/css   # Export functionality
│   ├── Toast.jsx/css            # Notifications
│   └── Suggestions.jsx/css      # Suggestion panel
├── App.jsx/css                  # Main application
└── index.js/css
```

## 🔧 Technical Stack

- **React 18.2**: Modern React with hooks
- **React Flow 11.10**: Flow-based interface
- **html2canvas 1.4**: Canvas capture for PNG export
- **jsPDF 3.0**: PDF generation
- **CSS3**: Animations and modern styling

### Key Implementation Details

- **Real-time Sync**: Changes in canvas instantly reflect in settings panel via useEffect watching nodes array
- **Button Handles**: Dynamic handle generation with IDs `button-0`, `button-1`, `button-2`
- **Export System**: `fitView` before capture, 2x scale, extended area with scroll offsets
- **Validation**: Checks node connections and button links, shows persistent suggestions

## 👨‍💻 Author

**Sidak Singh**
- GitHub: [@sidak131singh](https://github.com/sidak131singh)
- Repository: [chatbot-Flow-Builder](https://github.com/sidak131singh/chatbot-Flow-Builder)

