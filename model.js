/* TODO:
    Prepare storage for all grades and attendance.
    An array for the eight exercise grades.
    One exam grade.
    Write a method that allows the controller to grade exercises with points.
    Write a method that allows the controller to grade the exam with points.
    Write a method that allows the controller to enter attendance.
    Write a method that checks whether a score is positive.
    Write a method to calculate the total exercise grade.
    Write a method to calculate the final grade...
*/
"use strict";

export const MODEL ={
    // storage
    homeworks : [0,0,0,0,0,0,0,0], // 8 Blocks
    exam : 0,
    attendance : 0,

    gradeHomework(index,points){
        this.homeworks[index] =points;
        this.notify();
    },
    gradeExam(points){
        this.exam =points;
        this.notify();
    },
    gradeAttendance(percentage){
        this.attendance= percentage;
        this.notify();
    },
    isPositivePoints(points){
        return points > 50;
    },

    countPositiveBlocks(){
        let count = 0;
        for(let points of this.homeworks){
            if (this.isPositivePoints(points)){
                count ++;
            }
        } // counts how many out of 8 blocks are positive
        return count;
    },

    sumHomeworkPoints(){
        let sum = 0;
        for (let points of this.homeworks){
            sum += points;
        }
        let worstHomeworkPoints = Math.min(...this.homeworks);
        return sum - worstHomeworkPoints;
    }, // 8 - 1 worst = sum

    homeworkPercentage(){
        let totalH = this.sumHomeworkPoints();
        return (totalH / 700) * 100;
    },

    examPercentage(){
        return this.exam; // input points as %
    },

    gradeSystem(percentage){
        if (percentage <= 50){
            return "NEG";
        } else if (percentage <=61){
            return "GEN";
        } else if (percentage <= 74){
            return "BEF";
        } else if (percentage <= 86){
            return "GUT";
        } else {
            return "SGT"
        }
    },

    finalHomeworkGrade(){
        let percentageH = this.homeworkPercentage();
        let positiveH = this.countPositiveBlocks();
        if (percentageH <=50 || positiveH <6){
            return "NEG";
        }
        return this.gradeSystem(percentageH);
    },

    examGrade(){
        let percentageE = this.examPercentage();
        return this.gradeSystem(percentageE);
    },

    attendanceCheck(){
        let percentageA = this.attendance;
        if (percentageA >= 80){
            return "Positive";
        } else {
            return "Negative";
        }
    },

    finalGradeMark() {
        let percentageH = this.homeworkPercentage();
        let percentageE = this.examPercentage();
        let percentageA = this.attendance;

        if (percentageH <= 50 || this.countPositiveBlocks() < 6) {
            return "NEG";
        }
        if (percentageE <= 50) {
            return "NEG";
        }
        if (percentageA < 80) {
            return "NEG";
        }
        let weightedScore = (percentageH * 0.6) + (percentageE * 0.4);
        return this.gradeSystem(weightedScore);
    },

    getWorstHomework(){
        let worstHomework =Math.min(...this.homeworks);
        return this.homeworks.indexOf(worstHomework);
    },

    notify(){
        const EVENT = new CustomEvent("modelUpdate");
        document.dispatchEvent(EVENT);
    }

};
