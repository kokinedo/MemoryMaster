# MemoryMaster

MemoryMaster is a modern take on the classic memory card game, built with React, Python (Flask), and PostgreSQL. Test your memory skills across three difficulty levels, track your progress, and compete against yourself to improve your cognitive abilities!

## Features

- Three game modes: Easy, Medium, and Hard
- Responsive design for desktop and mobile play
- Anonymous play - no account required
- Detailed game history and statistics
- Audit trail for each game
- RESTful API for game data management
- Scalable architecture designed to handle millions of games

## Demo

Check out a video demo of the app [here](https://drive.google.com/file/d/123iMFl0kKiibnRYyzEIMbJI4OL3rgnIu/view?usp=sharing).

## Tech Stack

### Frontend
- React
- React Router for navigation
- Axios for API requests
- CSS for styling (with responsive design)

### Backend
- Python 3.8+
- Flask web framework
- SQLAlchemy ORM
- Flask-Marshmallow for serialization
- PostgreSQL database

## Installation

### Prerequisites
- Node.js and npm
- Python 3.8+
- PostgreSQL

### Frontend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/kokinedo/memory-master.git
    cd memory-master/frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm start
    ```

### Backend Setup
1. Navigate to the backend directory:
    ```bash
    cd ../backend
    ```
2. Create a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use venv\Scripts\activate
    ```
3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4. Set up the database:
    - Create a PostgreSQL database named `memory_master`
    - Update the `SQLALCHEMY_DATABASE_URI` in `config.py` with your database credentials
5. Initialize the database:
    ```python
    flask shell
    from app import db
    db.create_all()
    exit()
    ```
6. Start the Flask server:
    ```bash
    python run.py
    ```

### PostgreSQL Setup
1. Install PostgreSQL on your machine. Refer to the [official PostgreSQL documentation](https://www.postgresql.org/docs/) for installation instructions.
2. Create a new PostgreSQL database named `memorymaster`:
    ```sql
    CREATE DATABASE memory_master;
    ```
3. Update the `SQLALCHEMY_DATABASE_URI` in `backend/config.py` with your PostgreSQL database credentials:
    ```python
    SQLALCHEMY_DATABASE_URI = 'postgresql://username:password@localhost/memorymaster'
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Choose a game mode: Easy, Medium, or Hard
3. Play the game by flipping cards and finding matches
4. View your game history and statistics on the History page


## API Endpoints

### Save a game
- **URL:** `/api/game`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "difficulty": "easy",
    "player_id": "player1",
    "moves": [
      {
        "card_name": "John Doe",
        "coordinates": "[0, 1]",
        "found_match": true,
        "move_number": 1
      }
    ]
  }

### Get game history
- **URL:** `/api/history/<player_id>`
- **Method:** `GET`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "difficulty": "easy",
      "total_moves": 24,
      "date_played": "2024-07-08T00:22:48",
      "moves": [
        {
          "card_name": "John Doe",
          "coordinates": "[0, 1]",
          "found_match": true,
          "move_number": 1
        }
      ]
    }
  ]

## Acknowledgments

-   Card images provided by [Random User Generator API](https://randomuser.me/)
-   Inspired by classic memory card games