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
markdownCopy# MemoryMaster

MemoryMaster is a modern take on the classic memory card game, built with React, Python (Flask), and PostgreSQL. Test your memory skills across three difficulty levels, track your progress, and compete against yourself to improve your cognitive abilities!

## Features

- Three game modes: Easy, Medium, and Hard
- Responsive design for desktop and mobile play
- Anonymous play - no account required
- Detailed game history and statistics
- Audit trail for each game
- RESTful API for game data management
- Scalable architecture designed to handle millions of games

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
git clone https://github.com/yourusername/memory-master.git
cd memory-master/frontend
Copy2. Install dependencies:
npm install
Copy3. Start the development server:
npm start
Copy
### Backend Setup
1. Navigate to the backend directory:
cd ../backend
Copy2. Create a virtual environment:
python -m venv venv
source venv/bin/activate  # On Windows use venv\Scripts\activate
Copy3. Install dependencies:
pip install -r requirements.txt
Copy4. Set up the database:
- Create a PostgreSQL database named `memory_master`
- Update the `SQLALCHEMY_DATABASE_URI` in `config.py` with your database credentials
5. Initialize the database:
flask shell



from app import db
db.create_all()
exit()



Copy6. Start the Flask server:
python run.py
Copy
## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Choose a game mode: Easy, Medium, or Hard
3. Play the game by flipping cards and finding matches
4. View your game history and statistics on the History page

## API Endpoints

- `POST /game`: Create a new game
- `POST /game/<game_id>/move`: Record a move in an existing game
- `GET /history/<player_id>`: Retrieve game history for a player
- `GET /game/<game_id>`: Get details of a specific game

## Testing

### Frontend
Run the test suite:
npm test
Copy
### Backend
Run the test suite:
python -m unittest discover tests
Copy
## Contributing

We welcome contributions to MemoryMaster! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Card images provided by [Random User Generator API](https://randomuser.me/)
- Inspired by classic memory card games

## Contact

If you have any questions or feedback, please open an issue on this repository.