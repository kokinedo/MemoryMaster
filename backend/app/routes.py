from flask import Blueprint, jsonify, request
from app import db
from app.models import Game, Move

bp = Blueprint('main', __name__)

@bp.route('/api/game', methods=['POST'])
def save_game():
    data = request.json
    new_game = Game(
        difficulty=data['difficulty'],
        total_moves=len(data['moves']),
        player_id=data['player_id']
    )
    db.session.add(new_game)
    db.session.flush()

    for move in data['moves']:
        new_move = Move(
            game_id=new_game.id,
            card_name=move['card_name'],
            coordinates=move['coordinates'],
            found_match=move['found_match'],
            move_number=move['move_number']
        )
        db.session.add(new_move)
    
    db.session.commit()
    return jsonify({'message': 'Game saved successfully'}), 201

@bp.route('/api/history/<player_id>', methods=['GET'])
def get_history(player_id):
    games = Game.query.filter_by(player_id=player_id).order_by(Game.date_played.desc()).all()
    return jsonify([{
        'id': game.id,
        'difficulty': game.difficulty,
        'total_moves': game.total_moves,
        'date_played': game.date_played.isoformat(),
        'moves': [{
            'card_name': move.card_name,
            'coordinates': move.coordinates,
            'found_match': move.found_match,
            'move_number': move.move_number
        } for move in game.moves]
    } for game in games]), 200