from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Joke(db.Model):
    __tablename__ = 'jokes'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    author = db.Column(db.String, nullable=True)

    def __init__(self, content, author=None):
        self.content = content
        self.author = author

    def __repr__(self):
        return f'<Joke {self.id}: {self.content}>' 

    @classmethod
    def create_joke(cls, content, author=None):
        new_joke = cls(content=content, author=author)
        db.session.add(new_joke)
        db.session.commit()
        return new_joke

    @classmethod
    def get_all_jokes(cls):
        return cls.query.all()

    @classmethod
    def get_joke_by_id(cls, joke_id):
        return cls.query.get(joke_id)

    @classmethod
    def update_joke(cls, joke_id, content, author=None):
        joke = cls.query.get(joke_id)
        if joke:
            joke.content = content
            joke.author = author
            db.session.commit()
        return joke

    @classmethod
    def delete_joke(cls, joke_id):
        joke = cls.query.get(joke_id)
        if joke:
            db.session.delete(joke)
            db.session.commit()
        return joke