document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const taskInput = document.getElementById("taskInput");
    const taskTable = document.getElementById("taskTable");
    let tasks = []; // Array to store tasks

    // Render tasks in the table
    function renderTasks() {
        taskTable.innerHTML = ""; // Clear the table before rendering

        tasks.forEach((task, index) => {
            const row = document.createElement("tr");

            // Create the row content
            row.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td>${task.title}</td>
        <td>${task.completed ? "Completed" : "In progress"}</td>
        <td>
            <button class="btn btn-warning edit-btn">Edit</button>
            <button class="btn btn-danger delete-btn">Delete</button>
            <button class="btn btn-success ms-1 complete-btn">Finished</button>
        </td>
        `;

            // Add event listeners for the buttons
            row.querySelector(".edit-btn").onclick = function () {
                const newTitle = prompt("Edit the task:", task.title); // Open a prompt to edit the task
                if (newTitle) {
                    tasks[index].title = newTitle; // Update the task title
                    renderTasks(); // Re-render the task list
                }
            };

            row.querySelector(".delete-btn").onclick = function () {
                tasks.splice(index, 1); // Remove the task from the array
                renderTasks(); // Re-render the task list
            };

            row.querySelector(".complete-btn").onclick = function () {
                tasks[index].completed = true; // Mark the task as completed
                renderTasks(); // Re-render the task list
            };

            taskTable.appendChild(row); // Add the row to the table
        });
    }

    // Add a new task
    taskForm.onsubmit = function (e) {
        e.preventDefault(); // Prevent page refresh
        const taskTitle = taskInput.value;

        if (taskTitle.trim() !== "") {
            tasks.push({ title: taskTitle, completed: false }); // Add a new task
            renderTasks(); // Update the task list
            taskForm.reset(); // Clear the input field
        }
    };
});
