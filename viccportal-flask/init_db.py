import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), 'database/jokes.db')
conn = sqlite3.connect(db_path)
c = conn.cursor()

# Viccek tábla
c.execute('''
CREATE TABLE IF NOT EXISTS jokes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    category_id INTEGER NOT NULL,
    author TEXT,
    email TEXT,
    newsletter INTEGER DEFAULT 0,
    timestamp TEXT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
)
''')

# Kategóriák tábla
c.execute('''
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
)
''')

# Alap kategóriák hozzáadása (ha még nincsenek)
default_categories = ['Állatos', 'Rendőrös', 'Pistike', 'Szőke nős', 'Munkahelyi', 'Egyéb']
for cat in default_categories:
    c.execute('INSERT OR IGNORE INTO categories (name) VALUES (?)', (cat,))

conn.commit()
conn.close()