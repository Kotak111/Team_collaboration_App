const Task = require("../models/task.model");


const checkAndUpdateOverdueTasks = async () => {
    const now = new Date();

   
    const overdueTasks = await Task.find({ 
        status: 'pending', 
        dueDate: { $lt: now } 
    });

    overdueTasks.forEach(async (task) => {
        task.status = 'completed';
        await task.save();
    });
};

module.exports = { checkAndUpdateOverdueTasks };
