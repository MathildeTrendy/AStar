This project provides an interactive visualization of the **A* algorithm**, showing how it finds the shortest path between two points on a grid.

---

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [How to Use](#how-to-use)
- [File Structure](#file-structure)
- [Customization Options](#customization-options)
- [References](#references)

---

## 📖 Overview
The **A* (A-star) Algorithm** is widely used in applications like game development, navigation, and mapping to determine the shortest path from a starting point to a goal, avoiding obstacles. This project demonstrates the algorithm visually, allowing users to select start, goal, and obstacles to see the pathfinding in action.

---

## 🌟 Features
- **Interactive grid setup**: Select **start** and **goal** points and place obstacles.
- **Real-time visualization**: Watch the A* algorithm as it explores and finds the optimal path.
- **User-friendly controls**: Simple Start and Restart buttons for easy operation.

---

## 🚀 Getting Started

1. **Clone the Repository**  
   Download or clone this repository:
   ```bash
   git clone https://github.com/your-username/astar-visualization.git

🕹️ How to Use
Set Start and Goal

Click on any grid cell to mark it as the start.
Click on another cell to mark it as the goal.
Add Obstacles

Click other cells to place obstacles (grey cells) that the pathfinding algorithm will navigate around.
Run the Algorithm

Click Start to see the A* algorithm find the shortest path.
Click Restart to clear the grid and start over.
📁 File Structure
index.html: The main HTML page.
js/button.js: Handles button interactions.
js/grid.js: Manages the grid and cell properties.
js/main.js: Implements the A* algorithm logic and controls the visualization.
