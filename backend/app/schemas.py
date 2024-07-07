from app import ma
from app.models import Game, Move

class MoveSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Move

class GameSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Game
        include_fk = True
    moves = ma.Nested(MoveSchema, many=True)

game_schema = GameSchema()
games_schema = GameSchema(many=True)