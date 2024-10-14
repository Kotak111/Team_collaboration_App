const taskController= require("../controller/task.controller");
const { auth, IsUser } = require("../utils/auth");
const router=require("express").Router();

/**
 * @swagger
 * /taskadd:
 *   post:
 *     summary: Add a new task
 *     description: Creates a new task for the authenticated user.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []  # Define the authentication method
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New Task"
 *               description:
 *                 type: string
 *                 example: "Description of the new task."
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-15"
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/taskadd",auth,IsUser,taskController.createTask)
/**
 * @swagger
 * /taskview:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieves a list of all tasks for the authenticated user.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []  # Define the authentication method
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   dueDate:
 *                     type: string
 *                     format: date
 *                   status:
 *                     type: string
 *                     example: "Pending"
 */
router.get("/taskview",auth,taskController.getAllTasks)
/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a task by ID
 *     description: Retrieves a task by its ID.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []  # Define the authentication method
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 dueDate:
 *                   type: string
 *                   format: date
 *                 status:
 *                   type: string
 *       404:
 *         description: Task not found
 */

router.get("/:id",auth,taskController.getTaskById)
/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     description: Deletes a task by its ID.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []  # Define the authentication method
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */

router.delete("/:id",auth,taskController.deleteTaskById)
/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a task by ID
 *     description: Updates a task by its ID.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []  # Define the authentication method
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       400:
 *         description: Invalid input
 */

router.put("/:id",auth,IsUser,taskController.updateTaskById)
/**
 * @swagger
 * /:
 *   get:
 *     summary: Filter and sort tasks
 *     description: Retrieves tasks based on filtering and sorting criteria.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []  # Define the authentication method
 *     responses:
 *       200:
 *         description: A list of filtered and sorted tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   dueDate:
 *                     type: string
 *                     format: date
 *                   status:
 *                     type: string
 */
router.get('/', auth,taskController.filterSorting);
module.exports=router;