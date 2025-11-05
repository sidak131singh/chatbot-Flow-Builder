# Quick Start Guide - Chatbot Flow Builder

## ✅ Installation Complete!

Your chatbot flow builder is now running at: **http://localhost:3000**

## 🎮 Quick Tutorial

### 1. Add Your First Node
- **Method 1**: Drag the "Message" button from the right panel onto the canvas
- **Method 2**: Click the "Message" button to add a node at the center

### 2. Add More Nodes
- Add 2-3 more message nodes using the same methods
- Nodes will be named "test message 1", "test message 2", etc.

### 3. Connect Nodes
1. Hover over any node - you'll see two circles (handles)
   - **Left circle** (Target Handle): Receives incoming connections
   - **Right circle** (Source Handle): Creates outgoing connections
2. Click and drag from the **right handle** of one node to the **left handle** of another
3. A curved line (edge) will connect them

**Important**: Each node can have only ONE outgoing connection (from right handle)

### 4. Edit Message Text
1. Click on any node to select it (it will highlight with blue border)
2. The right panel changes to "Settings Panel"
3. Edit the text in the textarea
4. Watch the node update in real-time!
5. Click the back arrow (←) to return to the Node Panel

### 5. Save Your Flow
1. Click the **"Save Changes"** button in the top-right corner
2. The system validates your flow:
   - ✅ If valid: Success message + flow data logged to console
   - ❌ If invalid: Error alert explaining the issue

## 🚨 Validation Rules

Your flow is **VALID** when:
- You have 0 or 1 node (trivial case), OR
- Exactly ONE node has no incoming connections (this is your start node)

Your flow is **INVALID** when:
- Multiple nodes have no incoming connections
- This creates ambiguity about where the flow starts

**Example of VALID flow:**
```
[Start Node] → [Message 1] → [Message 2]
                    ↓
               [Message 3]
```
Only "Start Node" has no incoming connections ✅

**Example of INVALID flow:**
```
[Node A] → [Node B]

[Node C] → [Node D]
```
Both "Node A" and "Node C" have no incoming connections ❌

## 🎨 UI Features

### Canvas Controls (Bottom-left)
- **+/-**: Zoom in/out
- **🔲**: Fit view to show all nodes
- **🔒**: Toggle interaction lock

### Mini Map (Bottom-right)
- Shows overview of entire flow
- Click to navigate to different areas
- Drag the viewport rectangle

### Keyboard Shortcuts
- **Delete/Backspace**: Delete selected node or edge
- **Cmd/Ctrl + Mouse Wheel**: Zoom
- **Space + Drag**: Pan canvas

## 💡 Tips & Tricks

1. **Organize Your Flow**: Drag nodes to arrange them neatly
2. **Multiple Incoming**: A node can receive connections from multiple sources
3. **One Outgoing Only**: Each node can only send to one target
4. **Real-time Updates**: Text changes appear instantly - no save needed for editing
5. **Console Inspection**: Check browser console (F12) after saving to see JSON structure

## 🐛 Common Issues

### "Can't connect nodes"
- Make sure you're dragging from right handle to left handle
- Check if the source node already has an outgoing connection

### "Can't save flow"
- Look for nodes with no incoming connections
- You should have exactly one "start" node
- Connect or delete extra unconnected nodes

### "Panel won't switch"
- Click on empty canvas area to deselect and show Node Panel
- Click on a node to show Settings Panel

## 📊 Flow Data Structure

When you save, the flow data is logged as JSON:
```json
{
  "nodes": [
    {
      "id": "node_1",
      "type": "message",
      "position": { "x": 100, "y": 100 },
      "data": { "message": "Hello!" }
    }
  ],
  "edges": [
    {
      "id": "edge_1",
      "source": "node_1",
      "target": "node_2"
    }
  ]
}
```

## 🔧 Development Commands

```bash
# Start development server
npm start

# Build for production
npm build

# Run tests
npm test
```

## 🎯 Next Steps

1. Try creating a simple 3-node conversation flow
2. Experiment with branching (one node connecting to multiple targets)
3. Test the validation by creating an invalid flow
4. Check the console to see your saved flow data

## 📝 Component Architecture

```
App.jsx (Main container)
├── Header
│   └── SaveButton (Validation & Save)
├── FlowCanvas (React Flow)
│   └── MessageNode × N (Custom nodes)
└── SidePanel
    ├── NodePanel (Default view)
    └── SettingsPanel (When node selected)
```

## 🚀 Ready to Build!

Your chatbot flow builder is fully functional. Start by adding a few nodes and connecting them to create your first conversation flow!

Need help? Check the README.md for more detailed documentation.

---

Happy Flow Building! 🎉
