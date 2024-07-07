from app import db
from datetime import datetime

class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    difficulty = db.Column(db.String(10), nullable=False)
    total_moves = db.Column(db.Integer, nullable=False)
    date_played = db.Column(db.DateTime, default=datetime.utcnow)
    player_id = db.Column(db.String(36), nullable=False)
    moves = db.relationship('Move', backref='game', lazy=True)

class Move(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable=False)
    card_name = db.Column(db.String(100), nullable=False)
    coordinates = db.Column(db.String(10), nullable=False)
    found_match = db.Column(db.Boolean, nullable=False)
    move_number = db.Column(db.Integer, nullable=False)