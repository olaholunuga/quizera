#!/usr/bin/env python
"""basemodel for all class"""
from app import db
from datetime import datetime
from uuid import uuid4


class BaseModel():
    id = db.Column(db.String(128), primary_key=True, nullable=False, default=uuid4)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __str__(self):
        return "[{:s}] ({:s}) {}".format(self.__class__.__name__, self.id, self.__dict__)
