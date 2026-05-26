"use strict";
 /*
 Grader 3000
Business Logic
Build a grading software for your favorite professor. Follow the MVC pattern.
Please work alone today. The software should represent the grading system of the ISC course and output the correct grade after all data has been entered.
The grading scheme is already known, but here is a summary again:
Each exercise can have a maximum of 100 points.
The worst exercise result is ignored.
Therefore, the maximum achievable score is:
(numberOfExercises - 1) * 100
Passing always means more than 50%, not greater than or equal to 50%.
75% of all exercises must be passed (= at least 51 points) so that the overall grade can still be positive.
In addition to the exercise grade, there is also an exam grade. Both grades (exercise grade and exam grade) must be positive for the overall grade to be positive.
The exam grade has a weight of 40%, the exercise grade a weight of 60%.
The following grading scale applies to the final grade:
Percentage	Grade
0–50%	Fail
up to 61%	Sufficient
up to 74%	Satisfactory
up to 86%	Good
up to 100%	Very Good
Additionally, attendance must also be checked. Attendance must be >= 80% for the grade to remain unchanged.
User Interface
Build a simple but clear interface for the Grader 3000. Construct the view so that there is an input field for every exercise and for the exam (with min/max values; default value may be 0).
Every time an input field changes (on change), the overall grade should be recalculated.
The dropped result (“Streichergebnis”) should be clearly visible. It should also be clear to the user why and whether something is graded negatively.
Example:
Exercise grade: 100%
Exam grade: 40%
Overall grade:
(100×0.6)+(40×0.4)=76
…but still negative because the exam result is negative.
Procedure
Create a new project
Prepare HTML and JS (MVC) files (including import/export).
  */

/* TODO:
    Integrate model and view.
    Organize all necessary event listeners on input fields as efficiently as possible.
    When inputs change, the controller should pass the changes to the model accordingly.
    Make sure the controller reacts when the overall grades in the model change and communicates this to the view accordingly.
    (Hint: Custom Event)
 */
"use strict";

import { MODEL } from "./model.js";
import { VIEW } from "./view.js";

const CONTROLLER = {
    init() {
        VIEW.init();

        const CLAMP = (val) => Math.min(100, Math.max(0, parseInt(val) || 0));

        // listenener for homeworkk
        VIEW.hwList.addEventListener("input", (e) => {
            if (e.target.classList.contains("hw-input")) {
                const POINTS = CLAMP(e.target.value);
                e.target.value = POINTS; // visual update
                const INDEX = e.target.closest(".hw-row").dataset.index;
                MODEL.gradeHomework(INDEX, POINTS);
            }
        });

        // exam attn listeners
        document.addEventListener("input", (e) => {
            if (e.target.id === "exam-val") {
                const P = CLAMP(e.target.value);
                e.target.value = P;
                MODEL.gradeExam(P);
            } else if (e.target.id === "attn-val") {
                const P = CLAMP(e.target.value);
                e.target.value = P;
                MODEL.gradeAttendance(P);
            }
        });

        // custom event listener
        document.addEventListener("modelUpdate", () => {
            VIEW.render(MODEL);
        });

        VIEW.render(MODEL);
    }
};

CONTROLLER.init();



