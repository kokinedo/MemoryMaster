import json
import pytest
from app import create_app, db
from app.models import Game, Move

@pytest.fixture
def client():
    app = create_app('testing')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.drop_all()

def test_save_game(client):
    game_data = {
        'difficulty': 'easy',
        'player_id': 'player1',
        'moves': [
            {
                'card_name': 'John Doe',
                'coordinates': '[0, 1]',
                'found_match': True,
                'move_number': 1
            }
        ]
    }
    response = client.post('/api/game', data=json.dumps(game_data), content_type='application/json')
    assert response.status_code == 201
    assert b'Game saved successfully' in response.data

def test_get_history(client):
    # First, add a game to the database
    game = Game(difficulty='easy', total_moves=1, player_id='player1')
    move = Move(game_id=1, card_name='John Doe', coordinates='[0, 1]', found_match=True, move_number=1)
    with client.application.app_context():
        db.session.add(game)
        db.session.add(move)
        db.session.commit()

    response = client.get('/api/history/player1')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data) == 1
    assert data[0]['difficulty'] == 'easy'
    assert data[0]['total_moves'] == 1
    assert len(data[0]['moves']) == 1
    assert data[0]['moves'][0]['card_name'] == 'John Doe'
