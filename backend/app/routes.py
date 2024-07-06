from flask import Blueprint, request, jsonify
from app import db
from app.models import Game, Move
from app.schemas import game_schema, games_schema
import uuid

bp = Blueprint('main', __name__)

@bp.route('/game', methods=['POST'])
def create_game():
    data = request.json
    player_id = data.get('player_id') or str(uuid.uuid4())
    new_game = Game(mode=data['mode'], moves=0, player_id=player_id)
    db.session.add(new_game)
    db.session.commit()
    return game_schema.jsonify(new_game), 201

@bp.route('/game/<int:game_id>/move', methods=['POST'])
def add_move():
    game = Game.query.get_or_404(game_id)
    data = request.json
    new_move = Move(
        game_id=game.id,
        card_name=data['card_name'],
        coordinates=data['coordinates'],
        found_match=data['found_match'],
        move_number=game.moves + 1
    )
    game.moves += 1
    db.session.add(new_move)
    db.session.commit()
    return game_schema.jsonify(game), 200

@bp.route('/history/<string:player_id>', methods=['GET'])
def get_history(player_id):
    games = Game.query.filter_by(player_id=player_id).order_by(Game.date_played.desc()).all()
    return games_schema.jsonify(games), 200

@bp.route('/game/<int:game_id>', methods=['GET'])
def get_game(game_id):
    game = Game.query.get_or_404(game_id)
    return game_schema.jsonify(game), 200