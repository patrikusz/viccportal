# Viccportál Flask Web Application

## Overview
Viccportál is a web application that allows users to browse, submit, and manage jokes. It is built using Flask, a lightweight WSGI web application framework in Python, and utilizes SQLite for data storage.

## Project Structure
```
viccportal-flask
├── app.py                # Main entry point of the Flask application
├── requirements.txt      # Lists project dependencies
├── README.md             # Documentation for the project
├── templates             # Contains HTML templates
│   └── index.html       # Main page of the application
├── static                # Contains static files (CSS, JS)
│   ├── style.css        # Styles for the web application
│   └── script.js        # Client-side JavaScript functionality
├── models                # Contains data models
│   └── joke.py          # Defines the Joke model
└── database              # Contains the SQLite database
    └── jokes.db         # Database file for storing jokes
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd viccportal-flask
   ```

2. **Create a Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Application**
   ```bash
   python app.py
   ```

5. **Access the Application**
   Open your web browser and navigate to `http://127.0.0.1:5000` to view the application.

## Usage
- Users can view a list of jokes, submit new jokes, and navigate through different sections of the application.
- The application supports searching for jokes and toggling between light and dark themes.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for details.