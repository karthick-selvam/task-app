const { Tasks } = require("../../services/db");

exports.getAllTasks = async (req, res) => {
  try {
    // Extract pagination parameters from query string
    const { page = 1, pageSize = 20 } = req.query;

    // Convert page and pageSize to integers
    const pageNumber = parseInt(page);
    const limit = parseInt(pageSize);

    // Fetch user details from request
    const user = req.user;
    let filters = {};
    if (user.role === "admin") {
      filters["orgId"] = user.orgId;
    } else {
      filters["orgId"] = user.orgId;
      filters["assigneeId"] = user._id;
    }
    // Create separate query objects for counting and fetching tasks
    let countQuery = Tasks.countDocuments(filters);
    let tasksQuery = Tasks.find(filters);

    // Query total count of tasks
    const totalTasks = await countQuery;

    // Calculate total pages
    const totalPages = Math.ceil(totalTasks / limit);

    // Calculate skip value to implement pagination
    const skip = (pageNumber - 1) * limit;

    // Query tasks from the database with pagination
    const tasks = await tasksQuery.skip(skip).limit(limit).exec();

    // Return paginated tasks along with total pages and current page
    return res.json({
      tasks,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Tasks.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { assignee, designation, taskDescription, ETC } = req.body;

    // Fetch user details from request
    const user = req.user;

    if (!assignee || !designation || !taskDescription || !ETC) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new task with user's userId and orgId
    const newTask = new Tasks({
      assigneeName: assignee.username,
      assigneeId: assignee._id,
      designation,
      taskDescription,
      ETC,
      assignorId: user._id, // Assuming userId is stored in _id field of the user document
      orgId: user.orgId, // Assuming orgId is stored in orgId field of the user document
    });
    await newTask.save();

    return res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid data provided" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.json(task);
  } catch (error) {
    return res.status(400).json({ message: "Invalid data provided" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Tasks.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
