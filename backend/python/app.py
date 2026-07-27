from flask import Flask, request, jsonify
import fitz

app = Flask(__name__)


@app.route("/analyze", methods=["POST"])
def analyze():

    file = request.files["resume"]

    pdf = fitz.open(stream=file.read(), filetype="pdf")

    text = ""

    for page in pdf:
        text += page.get_text()

    return jsonify({
        "text": text[:1000]
    })


if __name__ == "__main__":
    app.run(port=5001)