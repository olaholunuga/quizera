#!/usr/bin/env python
"""Quizera app"""

from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager, UserMixin
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from os import getenv

QZR_MYSQL_USER = getenv("QZR_MYSQL_USER")
QZR_MYSQL_PWD = getenv("QZR_MYSQL_PWD")
QZR_MYSQL_HOST = getenv("QZR_MYSQL_HOST")
QZR_MYSQL_DB = getenv("QZR_MYSQL_DB")


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://{}:{}@{}/{}".format(
                                                                    QZR_MYSQL_USER,
                                                                    QZR_MYSQL_PWD,
                                                                    QZR_MYSQL_HOST,
                                                                    QZR_MYSQL_DB)


CORS(app, resources={r"/*": {"origins": "0.0.0.0"}})
login_manager = LoginManager(app)
db = SQLAlchemy(app)

from models.user import User
from models.test import Test

db.create_all()


@app.route("/")
def landing():
    return "<h1> hello, you are on the landing page <h1>"



@app.teardown_appcontext
def teardown_app(exc):
    pass


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, threaded=True)
