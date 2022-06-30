#!/usr/bin/python3
from email import message
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, EqualTo, Email, Length

class SignUpForm(FlaskForm):
    first_name = StringField(
        "First name",
        validators=[DataRequired()]
    )

    last_name = StringField(
        "Last name",
        validators=[DataRequired()]
    )

    email = StringField(
        "Email",
        validators=[
            Length(min=6),
            Email(message="Enter a valid email."),
            DataRequired()
        ]
    )

    password = PasswordField(
        "Password",
        validators=[
            Length(min=8, message="Enter a stronger password"),
            DataRequired()
        ]
    )

    confirm = PasswordField(
        "Confirm Your Password",
        validators=[
            DataRequired(),
            EqualTo("password", message="Passwords must match")
        ]
    )

    submit = SubmitField("Register")

class LoginForm(FlaskForm):
    email = StringField(
        "Email",
        validators=[
            DataRequired()
        ]
    )

    password = PasswordField(
        "Password",
        validators=[
            DataRequired()
        ]
    )

    submit = SubmitField("Log In")