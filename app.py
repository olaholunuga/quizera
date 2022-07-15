#!/usr/bin/env python
"""Quizera app"""

from flask import Flask, render_template
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, current_user
from flask_sqlalchemy import SQLAlchemy
from os import getenv
from config import Config


app = Flask(__name__)
app.config.from_object(Config)


CORS(app, resources={r"/*": {"origins": "0.0.0.0"}})
login_manager = LoginManager(app)
db = SQLAlchemy(app)

from auth import auth
from main import main

app.register_blueprint(auth)
app.register_blueprint(main)

login_manager.login_view = "auth.login"

from models.user import User
from models.test import Test

db.create_all()


# @app.route("/")
# def landing():
#     return render_template(
#         "index.html",
#         current_user=current_user
#     )

@login_manager.user_loader
def user_loader(user_id):
    
    if user_id is not None:
        return User.query.get(user_id)
    return None

@app.teardown_appcontext
def teardown_app(exc):
    pass


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, threaded=True)
