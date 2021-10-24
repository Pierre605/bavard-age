#! /usr/bin/env python
from app.views import app

if __name__ == "__main__":
    # socketio.run(app, debug=True)
    app.run(host='0.0.0.0', debug=True)
    print("run run.py")
