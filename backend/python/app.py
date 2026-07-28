from flask import Flask, request, jsonify
import fitz
import re
import spacy

app = Flask(__name__)

nlp = spacy.load("en_core_web_sm")


SKILLS = [

    "React",
    "Angular",
    "Node.js",
    "Express",
    "MongoDB",
    "MySQL",
    "SQL",
    "Java",
    "Python",
    "JavaScript",
    "HTML",
    "CSS",
    "Git",
    "REST API"

]


@app.route("/analyze", methods=["POST"])
def analyze():

    file = request.files["resume"]

    pdf = fitz.open(stream=file.read(), filetype="pdf")

    text = ""

    for page in pdf:

        text += page.get_text()

    doc = nlp(text)

    email = ""

    phone = ""

    name = ""

    email_match = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text
    )

    if email_match:

        email = email_match.group()

    phone_match = re.search(
        r"\+?\d[\d\s-]{8,}",
        text
    )

    if phone_match:

        phone = phone_match.group()

    for ent in doc.ents:

        if ent.label_ == "PERSON":

            name = ent.text

            break

    found_skills = []

    lower_text = text.lower()

    for skill in SKILLS:

        if skill.lower() in lower_text:

            found_skills.append(skill)

    return jsonify({

    "name": name,

    "email": email,

    "phone": phone,

    "skills": found_skills,

    "text": text[:500]

    })


if __name__ == "__main__":

    app.run(port=5001)