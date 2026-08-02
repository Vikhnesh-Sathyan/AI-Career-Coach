from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz
import re

app = Flask(__name__)

CORS(app)

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
    
@app.route("/job-match", methods=["POST"])
def job_match():

    try:

        if "resume" not in request.files:

            return jsonify({
                "success": False,
                "message": "Resume missing"
            }),400

        resume=request.files["resume"]

        job_description=request.form.get("jobDescription","")

        pdf=fitz.open(
            stream=resume.read(),
            filetype="pdf"
        )

        resume_text=""

        for page in pdf:

            resume_text+=page.get_text()

        pdf.close()

        resume_text=resume_text.lower()
        jd_text=job_description.lower()

        resume_skills=[]

        jd_skills=[]

        for skill in SKILLS:

            if skill.lower() in resume_text:

                resume_skills.append(skill)

            if skill.lower() in jd_text:

                jd_skills.append(skill)

        matched=[]

        missing=[]

        for skill in jd_skills:

            if skill in resume_skills:

                matched.append(skill)

            else:

                missing.append(skill)

        if len(jd_skills)==0:

            score=0

        else:

            score=round(
                (len(matched)/len(jd_skills))*100
            )

        suggestions=[]

        if len(missing)>0:

            suggestions.append(
                "Add missing skills to your resume if you have experience."
            )

        if score<70:

            suggestions.append(
                "Resume needs better keyword optimization."
            )

        if score>=85:

            suggestions.append(
                "Excellent match. Apply confidently."
            )

        return jsonify({

            "success":True,

            "matchScore":score,

            "matchedSkills":matched,

            "missingSkills":missing,

            "suggestions":suggestions

        })

    except Exception as e:

        return jsonify({

            "success":False,

            "message":str(e)

        }),500
        
# -------------------------------
# Interview Evaluation
# -------------------------------

@app.route("/interview-evaluate", methods=["POST"])
def interview_evaluate():

    try:

        data = request.get_json()

        question = data.get("question", "")
        answer = data.get("answer", "")

        answer = answer.strip()

        if answer == "":

            return jsonify({

                "success": False,
                "message": "Answer cannot be empty"

            }),400


        score = 4
        feedback = []
        strengths = []
        improvements = []


        # Length check

        if len(answer) > 80:

            score += 2
            strengths.append("Answer has good length.")

        else:

            improvements.append(
                "Explain your answer in more detail."
            )


        # Technical keywords

        keywords = [

            "component",
            "state",
            "props",
            "hook",
            "useState",
            "useEffect",
            "javascript",
            "virtual dom",
            "render",
            "react"

        ]

        found = 0

        lower = answer.lower()

        for word in keywords:

            if word.lower() in lower:

                found += 1


        score += min(found,4)

        if found >= 3:

            strengths.append(
                "Good technical terminology."
            )

        else:

            improvements.append(
                "Include more technical concepts."
            )


        # Practical examples

        example_words = [

            "example",
            "project",
            "application",
            "used",
            "implemented"

        ]

        has_example = False

        for word in example_words:

            if word in lower:

                has_example = True
                break


        if has_example:

            score += 1

            strengths.append(
                "Practical example included."
            )

        else:

            improvements.append(
                "Add a real-world example."
            )


        if score > 10:

            score = 10


        if score >= 9:

            feedback.append(
                "Excellent interview answer."
            )

        elif score >= 7:

            feedback.append(
                "Good answer with minor improvements."
            )

        else:

            feedback.append(
                "Needs improvement."
            )


        return jsonify({

            "success": True,

            "score": score,

            "feedback": feedback,

            "strengths": strengths,

            "improvements": improvements

        })


    except Exception as e:

        return jsonify({

            "success": False,

            "message": str(e)

        }),500

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5001
    )