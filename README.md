# Chatbot Flow Builder

A modern, interactive flow builder for creating chatbot conversations using React and React Flow.

## 🎯 Features

- **Drag & Drop Interface**: Easily add message nodes to your canvas
- **Visual Flow Design**: Connect nodes to define message flow
- **Real-time Editing**: Edit message text with instant preview
- **Flow Validation**: Ensures proper flow structure before saving
- **Responsive UI**: Clean, modern interface with smooth interactions

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Open terminal in the project directory
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

1. **Drag from Panel**: Drag the "Message" item from the right panel to the canvas
2. **Click to Add**: Click the "Message" item to add a node at the center

### Connecting Nodes

1. Hover over a node to see connection handles (circles on left and right)
2. Click and drag from the right handle (source) to another node's left handle (target)
3. Each node can have only ONE outgoing connection (source)
4. Each node can have MULTIPLE incoming connections (target)

### Editing Messages

1. Click on any node to select it
2. The Settings Panel will appear on the right
3. Edit the text in the textarea
4. Changes are applied instantly to the node

### Saving the Flow

1. Click the "Save Changes" button in the top-right corner
2. The system validates your flow:
   - ✅ **Valid**: Only one node has no incoming connections (start node)
   - ❌ **Invalid**: Multiple nodes with no incoming connections
3. If valid, flow data is logged to the console

## 🏗️ Project Structure

```
src/
├── components/
│   ├── MessageNode.jsx       # Custom node component
│   ├── MessageNode.css       # Node styling
│   ├── NodePanel.jsx         # Panel for adding nodes
│   ├── NodePanel.css         # Panel styling
│   ├── SettingsPanel.jsx     # Node editing panel
│   ├── SettingsPanel.css     # Settings styling
│   ├── SaveButton.jsx        # Save & validation logic
│   └── SaveButton.css        # Button styling
├── App.jsx                   # Main application component
├── App.css                   # Main app styling
├── index.js                  # React entry point
└── index.css                 # Global styles
```

## 🎨 UI Components

### Message Node
- Header with icon and title
- Body with message text
- Connection handles (left: target, right: source)
- Hover and selection states

### Node Panel
- Displays available node types
- Drag & drop or click to add
- Extensible for future node types

### Settings Panel
- Replaces Node Panel when node is selected
- Text input for message editing
- Back button to return to Node Panel
- Node information display

### Save Button
- Located in header
- Validates flow before saving
- Shows error alerts for invalid flows
- Logs flow data to console

## 🔧 Technical Details

### Technologies Used
- **React 18**: Latest React with hooks
- **React Flow 11**: Flow-based programming interface
- **CSS3**: Modern styling with flexbox and transitions

### Key React Flow Hooks
- `useNodesState`: Manages nodes state
- `useEdgesState`: Manages edges state
- `ReactFlowProvider`: Context provider for React Flow

### Validation Logic
The flow is considered valid if:
1. There are 0 or 1 nodes (trivial case)
2. Exactly ONE node has no incoming connections (start node)

Invalid flows trigger an alert and prevent saving.

## 🎯 Future Enhancements

- Add more node types (Decision, API Call, etc.)
- Export/Import flow as JSON
- Undo/Redo functionality
- Node search and filtering
- Flow templates
- Backend integration for persistence

## 📝 Notes

- This is a UI-only implementation
- No messaging API integration (WhatsApp, etc.)
- Flow data is logged to console (not persisted)
- Designed to be easily extensible

## 🐛 Troubleshooting

### Nodes won't connect
- Ensure you're dragging from source (right) to target (left)
- Check if source already has an outgoing connection

### Can't save flow
- Verify that only one node has no incoming connections
- Check browser console for validation messages

### Styling issues
- Clear browser cache
- Ensure all CSS files are properly imported

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ using React and React Flow
