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

## 🕹️ How to Use

### Set Start and Goal
- Click on any grid cell to mark it as the **start** point (displayed in red).
- Click on another cell to mark it as the **goal** point (displayed in green).

### Add Obstacles
- Click on other cells to place **obstacles** (displayed in grey) that the algorithm will navigate around.

### Run the Algorithm
- Click **Start** to see the A* algorithm in action, finding the shortest path from the start to the goal.
- Click **Restart** to clear the grid and start a new pathfinding session.


## 📁 File Structure
The project consists of the following files:

```plaintext
index.html              
button.js           
grid.js             
main.js             
