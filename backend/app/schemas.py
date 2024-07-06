from app import ma

class MoveSchema(ma.Schema):
    class Meta:
        fields = ('id', 'card_name', 'coordinates', 'found_match', 'move_number')

class GameSchema(ma.Schema):
    moves = ma.Nested(MoveSchema, many=True)
    
    class Meta:
        fields = ('id', 'mode', 'moves', 'date_played', 'player_id', 'moves')

move_schema = MoveSchema()
moves_schema = MoveSchema(many=True)
game_schema = GameSchema()
games_schema = GameSchema(many=True)