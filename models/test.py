#!/usr/bin/python3
"""test model"""
from app import db, UserMixin
from basemodel import BaseModel

class Test(BaseModel, UserMixin, db.Model):
    subject = db.Column(db.String(128), nullable=False)
    score = db.Column(db.Integer, nullable=False)