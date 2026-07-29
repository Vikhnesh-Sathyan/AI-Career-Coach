from flask import Flask, request, jsonify
import fitz
import re

app = Flask(__name__)

# -------------------------------
# Skill Categories
# -------------------------------

FRONTEND_SKILLS = [
    "React.js",
    "Angular",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Bootstrap"
]

BACKEND_SKILLS = [
    "Node.js",
    "Express.js",
    "REST API",
    "JWT"
]

DATABASE_SKILLS = [
    "MongoDB",
    "MySQL",
    "SQL",
    "PostgreSQL",
    "Workbench"
]

PROGRAMMING_LANGUAGES = [
    "Java",
    "Python",
    "javaScript",
]

AI_SKILLS = [
    "NLP",
    "spaCy",
    "Machine Learning",
    "Artificial Intelligence"
]

TOOLS = [
    "Git",
    "GitHub",
    "VS Code",
    "Postman"
]

SKILLS = (
    FRONTEND_SKILLS
    + BACKEND_SKILLS
    + DATABASE_SKILLS
    + PROGRAMMING_LANGUAGES
    + AI_SKILLS
    + TOOLS
)


# -------------------------------
# ATS Score
# -------------------------------

def calculate_ats(skills):

    score = 50

    score += len(skills) * 4

    if score > 100:
        score = 100

    suggestions = []

    if "Git" not in skills:
        suggestions.append("Add Git to your resume.")

    if "REST API" not in skills:
        suggestions.append("Mention REST API experience.")

    if not any(db in skills for db in DATABASE_SKILLS):
        suggestions.append("Add database technologies.")

    if len(skills) < 8:
        suggestions.append("Add more technical skills.")

    return score, suggestions


# -------------------------------
# Resume Analysis API
# -------------------------------

@app.route("/analyze", methods=["POST"])
def analyze():

    try:

        if "resume" not in request.files:
            return jsonify({
                "success": False,
                "message": "No resume file uploaded"
            }), 400

        file = request.files["resume"]

        pdf = fitz.open(
            stream=file.read(),
            filetype="pdf"
        )

        text = ""

        for page in pdf:
            text += page.get_text()

        pdf.close()

        lines = [
            re.sub(r"\s+", " ", line).strip()
            for line in text.split("\n")
            if line.strip()
        ]

        # -----------------------
        # Name
        # -----------------------

        name = ""

        for line in lines:

            clean_line = line.strip(" .-|:_")

            if not clean_line:
                continue

            if "@" in clean_line:
                continue

            if re.search(r"\d{8,}", clean_line):
                continue

            if (
                "linkedin" in clean_line.lower()
                or "github" in clean_line.lower()
                or "http" in clean_line.lower()
            ):
                continue

            if clean_line.lower() in [
                "resume",
                "curriculum vitae",
                "cv",
                "profile",
                "summary",
                "objective"
            ]:
                continue

            if 1 <= len(clean_line.split()) <= 4:

                if re.match(r"^[A-Za-z .]+$", clean_line):

                    name = clean_line.title()

                    break

        # -----------------------
        # Email
        # -----------------------

        email = ""

        email_match = re.search(
            r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
            text
        )

        if email_match:
            email = email_match.group()

        # -----------------------
        # Phone
        # -----------------------

        phone = ""

        phone_match = re.search(
            r"\+?\d[\d\s-]{8,}",
            text
        )

        if phone_match:
            phone = phone_match.group().strip()

        # -----------------------
        # Skills
        # -----------------------

        lower_text = text.lower()

        found_skills = []

        for skill in SKILLS:

            if skill.lower() in lower_text:

                found_skills.append(skill)

        found_skills = list(dict.fromkeys(found_skills))

        # -----------------------
        # ATS Score
        # -----------------------

        score, suggestions = calculate_ats(found_skills)

        return jsonify({

            "success": True,

            "name": name,

            "email": email,

            "phone": phone,

            "skills": found_skills,

            "atsScore": score,

            "suggestions": suggestions

        })

    except Exception as error:

        return jsonify({

            "success": False,

            "message": str(error)

        }), 500


# -------------------------------
# Run
# -------------------------------

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5001
    )