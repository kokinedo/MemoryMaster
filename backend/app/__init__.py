from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_migrate import Migrate

db = SQLAlchemy()
ma = Marshmallow()
migrate = Migrate()

def create_app(config_class=None):
    app = Flask(__name__)
    
    # Configure the app
    if config_class:
        app.config.from_object(config_class)
    
    # Initialize extensions
    db.init_app(app)
    ma.init_app(app)
    CORS(app)
    migrate.init_app(app, db)
    
    # Register blueprints
    from app import routes
    app.register_blueprint(routes.bp)
    
    return app