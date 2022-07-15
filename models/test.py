#!/usr/bin/python3
"""test model"""
from email.policy import default
from app import db
from .basemodel import BaseModel

class Test(BaseModel, db.Model):
    __tablename__ = "tests"
    user_id = db.Column(db.String(128), db.ForeignKey("users.id"), nullable=False)
    subject = db.Column(db.String(128), nullable=True)
    score = db.Column(db.Integer, nullable=False, default=0)