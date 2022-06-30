#!/usr/bin/python3
"""authentication module"""

from flask_login import login_required, logout_user, current_user, login_user
from flask import Blueprint, flash, redirect, render_template, request, url_for
from forms import SignUpForm, LoginForm

auth = Blueprint("auth", import_name=__name__, url_prefix="/auth")



from app import db, login_manager
from models.user import User

@auth.route("/signup", methods=["GET", "POST"])
def signup():

    form = SignUpForm()
    if form.validate_on_submit():
        existing_user = User.query.filter_by(email=form.email.data).first()
        if existing_user is None:
            user = User(
                first_name = form.first_name.data,
                last_name = form.last_name.data,
                email = form.email.data,
                password = form.password.data
            )

            db.session.add(user)
            db.session.commit()
            login_user(user)
            return redirect(url_for("main.dashboard"))
        flash("A User already exist with that email")
    return render_template(
        "signup.html",
        form=form,
        title="Quizera SignUp"
    )

@auth.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        remember = True if request.form.get("remember") else False
        if user and user.check_password(str(form.password.data)):
            login_user(user, remember=remember)
            next_page = request.args.get("next")
            return redirect(next_page or url_for("main.dashboard"))
        flash("Invalid User/Password combination")
    return render_template(
        "login.html",
        form=form,
        title="Quizera Login"
    )


@auth.route("/logout")
@login_required
def logout():
    """logout function"""
    logout_user()
    return redirect(url_for("main.landing"))

# @login_manager.user_loader
# def user_loader(user_id):
    
#     if user_id is not None:
#         return User.query.get(user_id)
#     return None


@login_manager.unauthorized_handler
def unauthorized():
    
    flash("You must be loged in to view that page")
    redirect("auth.login")
