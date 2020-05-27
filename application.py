import os

from flask import Flask, render_template, request, redirect, url_for,flash
from flask_session import Session
from flask_socketio import SocketIO, emit, join_room
from datetime import datetime
from collections import defaultdict

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

all_channels = {'General'}
all_messages = defaultdict(list)



@app.route("/")
def index():
    return render_template("index.html", all_channels=all_channels)


@app.route("/channels", methods=['POST'])
def channels():
    new_channel = request.form.get('new_channel')
   
    if request.method == 'POST':
        if new_channel in all_channels:
            flash('channel already exist', 'danger')
            return redirect(url_for("index"))
        else:
             all_channels.add(new_channel)
             return redirect(url_for("index"))
    else:
        return redirect(url_for("index"))


@socketio.on('message sent')
def handle_message(data):
    name = data["name"]
    message = data["message"]
    date = datetime.now().strftime("%a %H:%M ")
    sid = request.sid
    act_message = sid+message + ' (' + name + ', '+ date +')'
    room = data['room']
    if len(all_messages[room]) >= 100:
        del all_messages[room][0]
    all_messages[room].append(act_message)
    emit("prt message", act_message, room=room)


@socketio.on('join')
def on_join(data):
    name = data["name"]
    room = data["room"]
    join_room(room)
    sid = request.sid
    message = sid+name + ' has joined room ' + room
    for i in all_messages[room]:
        emit('prt message', i, room=sid)
    emit('prt message', message, room=room)
    


if __name__ == '__main__':
    socketio.run(app)
