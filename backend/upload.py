from flask import Flask, request
import os

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World'

@app.route('/uploadVideo', methods=["POST"])
def uploadVideo():
    video = request.files['video'].stream.read()
    name = request.form['fileName']
    if not files_exists(name, 1):
        file_path = os.getcwd() + '\\videos\\' + name
        with open(file_path, 'ab') as f:
            f.write(video)
        return 'upload success'
    else:
        return 'already exist'


@app.route('/uploadImage', methods=["POST"])
def uploadImage():
    video = request.files['photo'].stream.read()
    name = request.form['fileName']
    if not files_exists(name, 2):
        file_path = os.getcwd() + '\\images\\' + name
        with open(file_path, 'ab') as f:
            f.write(video)
        return 'upload success'
    else:
        return 'already exist'

# 判断文件是否已经存在
def files_exists(file_name, choice):
    if choice == 1:
        path = os.getcwd() + '\\videos\\'
        video_path = os.path.join(path, file_name)
        return os.path.isfile(video_path)
    else:
        path = os.getcwd() + '\\images\\'
        image_path = os.path.join(path, file_name)
        return os.path.isfile(image_path)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
