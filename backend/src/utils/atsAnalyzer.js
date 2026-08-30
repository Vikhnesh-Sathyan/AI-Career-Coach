// ==========================================
// NORMAL ATS ANALYZER
// ==========================================

const skillKeywords = [

    "javascript",
    "typescript",
    "react",
    "angular",
    "node",
    "node.js",
    "express",
    "mongodb",
    "mysql",
    "sql",
    "html",
    "css",
    "java",
    "python",
    "git",
    "github",
    "rest api",
    "api",
    "firebase",
    "docker",
    "aws"

];


// ==========================================
// ANALYZE RESUME
// ==========================================

export const analyzeResumeText =
    (resumeText = "") => {


        const text =
            resumeText.toLowerCase();


        // ======================================
        // SKILLS
        // ======================================

        const foundSkills =
            skillKeywords.filter(
                (skill) =>
                    text.includes(skill)
            );


        // Remove duplicates
        const skills =
            [...new Set(foundSkills)];


        // ======================================
        // KEYWORD MATCH
        // ======================================

        const keywordMatch =
            Math.min(

                100,

                Math.round(
                    (skills.length /
                        skillKeywords.length) *
                    100
                )

            );


        // ======================================
        // FORMATTING
        // ======================================

        let formatting = 0;


        if (
            resumeText.length >= 500
        ) {

            formatting += 30;

        }


        if (
            resumeText.length >= 1000
        ) {

            formatting += 20;

        }


        const formattingKeywords = [

            "education",
            "skills",
            "experience",
            "project",
            "projects"

        ];


        formattingKeywords.forEach(
            (keyword) => {

                if (
                    text.includes(keyword)
                ) {

                    formatting += 10;

                }

            }
        );


        formatting =
            Math.min(
                formatting,
                100
            );


        // ======================================
        // READABILITY
        // ======================================

        let readability = 0;


        const words =
            resumeText
                .trim()
                .split(/\s+/)
                .filter(Boolean);


        if (
            words.length >= 100
        ) {

            readability += 30;

        }


        if (
            words.length >= 250
        ) {

            readability += 30;

        }


        if (
            words.length >= 400
        ) {

            readability += 20;

        }


        if (
            words.length >= 600
        ) {

            readability += 20;

        }


        readability =
            Math.min(
                readability,
                100
            );


        // ======================================
        // PROJECT SCORE
        // ======================================

        let projects = 0;


        if (
            text.includes("project") ||
            text.includes("projects")
        ) {

            projects += 40;

        }


        const projectKeywords = [

            "github",
            "react",
            "angular",
            "node",
            "mongodb",
            "mysql",
            "api"

        ];


        const projectKeywordCount =
            projectKeywords.filter(
                (keyword) =>
                    text.includes(keyword)
            ).length;


        projects +=
            Math.min(
                projectKeywordCount * 10,
                60
            );


        projects =
            Math.min(
                projects,
                100
            );


        // ======================================
        // FINAL ATS SCORE
        // ======================================

        const atsScore =
            Math.round(

                (
                    keywordMatch * 0.30 +
                    formatting * 0.25 +
                    readability * 0.20 +
                    projects * 0.25
                )

            );


        // ======================================
        // SUGGESTIONS
        // ======================================

        const suggestions = [];


        if (
            keywordMatch < 50
        ) {

            suggestions.push(
                "Add more relevant technical skills and keywords to your resume."
            );

        }


        if (
            formatting < 70
        ) {

            suggestions.push(
                "Add clear resume sections such as Skills, Education and Projects."
            );

        }


        if (
            readability < 70
        ) {

            suggestions.push(
                "Add more relevant professional details to improve resume completeness."
            );

        }


        if (
            projects < 70
        ) {

            suggestions.push(
                "Add detailed projects with technologies and responsibilities."
            );

        }


        if (
            skills.length === 0
        ) {

            suggestions.push(
                "Include a dedicated technical skills section."
            );

        }


        // ======================================
        // MISSING SKILLS
        // ======================================

        const missingSkills =
            skillKeywords
                .filter(
                    (skill) =>
                        !skills.includes(skill)
                )
                .slice(0, 8);


        // ======================================
        // RETURN RESULT
        // ======================================

        return {

            atsScore,

            skills,

            analysis: {

                keywordMatch,

                formatting,

                readability,

                projects,

                suggestions,

                missingSkills

            }

        };

    };