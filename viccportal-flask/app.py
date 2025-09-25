from flask import Flask, render_template, request, jsonify
import sqlite3
import os

app = Flask(__name__, static_folder='static', template_folder='templates')
DATABASE = os.path.join(os.path.dirname(__file__), 'database/jokes.db')

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/submit')
def submit():
    return render_template('submit.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/categories')
def categories():
    return render_template('categories.html')

@app.route('/jokes', methods=['GET'])
def get_jokes():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT jokes.id, jokes.text, categories.name AS category, jokes.author, jokes.email, jokes.newsletter, jokes.timestamp
        FROM jokes
        JOIN categories ON jokes.category_id = categories.id
    """)
    jokes = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in jokes])

@app.route('/jokes', methods=['POST'])
def add_joke():
    data = request.get_json()
    text = data.get('text')
    category = data.get('category')
    author = data.get('author', 'Névtelen')
    email = data.get('email', '')
    newsletter = int(data.get('newsletter', False))
    timestamp = data.get('timestamp')

    if not text or not category:
        return jsonify({'error': 'A vicc szövege és kategória kötelező!'}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO jokes (text, category, author, email, newsletter, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
        (text, category, author, email, newsletter, timestamp)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Vicc sikeresen beküldve!"}), 201

if __name__ == '__main__':
    app.run(debug=True)


