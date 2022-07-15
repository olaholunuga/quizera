#!/usr/bin/python3
"""main blueprint"""

from unicodedata import category
from flask_login import login_required, current_user
from flask import Blueprint, abort, jsonify, redirect, render_template, url_for, request
from models.test import Test


main = Blueprint("main", __name__)


from app import db, login_manager

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
    user = current_user._get_current_object()
    user_tests = user.tests
    return render_template(
        "dashboard.html",
        current_user=current_user,
        tests=user_tests,
        title="Quizera Dashboard"
    )


@main.route("/tests/<id>", methods=["GET", "PUT"])
@login_required
def tests_view(id):
    """main test method"""
    user = current_user._get_current_object()
    data = request.get_json()
    if id:
        tests = user.tests
        for test in tests:
            if test.id == id:
                single_test = test
        if request.method == "GET":
            if single_test:
                return jsonify(single_test)
            else:
                abort(404)
        else:
            if not data:
                return jsonify({"error": "No data sent"})
            for k, v in data.items():
                if k != "user_id":
                    setattr(single_test, k, v)
            db.session.add(single_test)
            db.session.commit()
            return jsonify(single_test)
    else:
        return jsonify({"error": "no valid id"})


@main.route("/tests", methods=["GET", "POST"])
@login_required
def test_view():
    """main test method"""
    user = current_user._get_current_object()
    data = request.get_json()

    if request.method == "GET":
        user_tests = user.tests
        test_list = []
        for test in user_tests:
            test_list.append(test.to_dict())
        return jsonify(test_list)
    else:
        user_id = user.id
        data["user_id"] = user_id
        test = Test(**data)
        db.session.add(test)
        db.session.commit()
        return jsonify(test.to_dict())


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