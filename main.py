#!/usr/bin/python3
"""main blueprint"""

from unicodedata import category
from flask_login import login_required, current_user
from flask import Blueprint, abort, jsonify, redirect, render_template, url_for, request
from models.test import Test


main = Blueprint("main", __name__)

# @main.route("/")
# def index():
#     """welcome page for all users"""
#     return "Hello World"
#     return render_template(
#         "index.html",
#         current_user=current_user
#     )


@main.route("/")
def landing():
    return render_template(
        "index.html",
        current_user=current_user,
        title="Quizera Landing"
    )

@main.route("/dashboard")
@login_required
def dashboard():
    """user info page"""
    return render_template(
        "dashboard.html",
        current_user=current_user,
        title="Quizera Dashboard"
    )

@main.route("/tests", methods=["GET", "POST"])
@main.route("/tests/<id>", methods=["GET", "PUT"])
@login_required
def test_view(id):
    """main test method"""
    if id:
        pass

    # if request.method == "GET":
    #     test = Test.query.filter_by(id=id).first()
    #     if not test or len(options.split("_")) > 3 or len(options.split("_")) < 3:
    #         abort(404)
    #     category, difficulty, country = options.split("_")
    #     return render_template(
    #         "test.html",
    #         category=category,
    #         difficulty=difficulty,
    #         country=country
    #     )


@main.route("/test", methods=["GET"])
@login_required
def test_form():
    """test method"""
    # if request.method == "POST":
    #     category = request.form.get("category")
    #     difficulty = request.form.get("difficulty")
    #     country = request.form.get("country")
    #     user = current_user._get_current_object()
    #     test = Test(
    #         user_id = user.id,
    #         subject = str(category)
    #     )
    #     return redirect("/test/{:s}/{:s}_{:s}_{:s}".format(test.id, category, difficulty, country))

    return render_template( 
        "test.html",
        current_user=current_user,
        title="Test",
    )