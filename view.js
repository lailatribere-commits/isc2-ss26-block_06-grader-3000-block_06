/* TODO:
    Write a method that can be used to create a points input field (e.g. for an exam or exercises).
    Write a method that can be used to enter attendance.
    Write two methods responsible for visually highlighting:
    negative results
    the dropped result (“Streichergebnis”)
 */
"use strict";

export const VIEW = {
    hwList: document.getElementById("homework-list"),
    examInput: document.getElementById("exam-input"),
    attendanceInput: document.getElementById("attendance-input"),
    finalGradeInput: document.getElementById("final-grade-input"),

    init() {
        // homw table
        this.hwList.innerHTML = `
            <div class="row header">
                <span>Homework Nr.</span>
                <span>Points (max 100)</span>
            </div>`;

        for (let i = 0; i < 8; i++) {
            this.hwList.innerHTML += `
                <div class="row hw-row" data-index="${i}">
                    <span>Block ${i + 1}</span>
                    <input type="number" class="hw-input" value="0" min="0" max="100">
                </div>`;
        }
        this.hwList.innerHTML += `<div class="row grade-row"><span>Grade:</span><span id="hw-total-grade">-</span></div>`;

        //inputs
        this.examInput.innerHTML = `
            <div class="row header"><span>Exam points</span><span>Grade</span></div>
            <div class="row exam-data-row">
                <input type="number" id="exam-val" value="0" min="0" max="100">
                <span id="exam-grade">-</span>
            </div>`;

        this.attendanceInput.innerHTML = `
            <div class="row header"><span>Attendance</span><span>Positive/Negative</span></div>
            <div class="row attn-data-row">
                <input type="number" id="attn-val" value="0" min="0" max="100">
                <span id="attn-status">-</span>
            </div>`;
    },

    render(model) {
        const hwROWS = document.querySelectorAll(".hw-row");
        const worstINDEX = model.getWorstHomework();

        // homw table r
        model.homeworks.forEach((points, i) => {
            let row = hwROWS[i];
            row.className = "row hw-row";

            // background colors
            if (points > 0) {
                if (i === worstINDEX) {
                    row.classList.add("ignored");
                } else if (!model.isPositivePoints(points)) {
                    row.classList.add("negative");
                } else {
                    row.classList.add("positive");
                }
            }
        });

        document.getElementById("hw-total-grade").textContent = model.finalHomeworkGrade();
        document.getElementById("exam-grade").textContent = model.examGrade();
        document.getElementById("attn-status").textContent = model.attendanceCheck();

        // attn. exam colors
        let examDataRow = document.querySelector(".exam-data-row");
        examDataRow.className = "row exam-data-row " + (model.exam > 0 ? (model.examGrade() === "NEG" ? "negative" : "positive") : "");

        let attnDataRow = document.querySelector(".attn-data-row");
        attnDataRow.className = "row attn-data-row " + (model.attendance > 0 ? (model.attendanceCheck() === "Negative" ? "negative" : "positive") : "");

        //final grade
        let finalMark = model.finalGradeMark();
        let finalPercent = Math.round((model.homeworkPercentage() * 0.6) + (model.examPercentage() * 0.4));

        this.finalGradeInput.innerHTML = `<h2>${finalPercent}% ${finalMark}</h2>`;
        this.finalGradeInput.className = (finalMark === "NEG") ? "fail-box" : "pass-box";
    }
};