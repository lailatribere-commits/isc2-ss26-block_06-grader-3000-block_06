/* TODO:
    Prepare storage for all grades and attendance.
    An array for the eight exercise grades.
    One exam grade.
    Write a method that allows the controller to grade exercises with points.
    Write a method that allows the controller to grade the exam with points.
    Write a method that allows the controller to enter attendance.
    Write a method that checks whether a score is positive.
    Write a method to calculate the total exercise grade.
    Write a method to calculate the final grade.
 */

// arrays
let homeworkTable = [{
    title: "Homework Nr.",
    name: "Block1",
}];


function createTable() {
    let headers = ["Homework Nr.", "Points (max 100)"]
    let table = document.createElement("table");

    for (let i =0; i < table.length; i++){
        let row = table.insertRow(i);
        row.insertCell(0).innerHTML = homeworkTable[i].title;

    }
}