#!/usr/bin/python3
"""user model"""
from hashlib import md5
from app import db, UserMixin
from .basemodel import BaseModel


class User(BaseModel, UserMixin, db.Model):
    __tablename__ = "users"
    first_name = db.Column(db.String(128), nullable=True)
    last_name = db.Column(db.String(128), nullable=True)
    password = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), nullable=False)
    tests = db.relationship("Test", backref="user")


    def __setattr__(self, name, value):
        if name == "password":
            value = md5(value.encode()).hexdigest()
        return super().__setattr__(name, value)

    def check_password(self, password):
        if self.password == md5(password.encode()).hexdigest():
            return True
        return False