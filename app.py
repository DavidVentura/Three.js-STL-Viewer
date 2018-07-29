#!/usr/bin/env python3
import os
from flask import Flask, render_template
app = Flask(__name__)

def get_file_list():
    return os.listdir('models/')

@app.route("/")
def hello():
    return render_template('index.html', template_folder='templates/')

app.jinja_env.globals.update(get_file_list=get_file_list)

if __name__ == '__main__':
   app.run()
