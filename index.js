const express = require("express");
const app = express();

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

const Student = require("./models/Student");

app.listen(3000);

app.get("/student", async (req, res) => {
  try {
    const student = await Student.findAll();
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/student", async (req, res) => {
  const { name, email, course } = req.body;
  try {
    const newStudent = await Student.create({ name, email, course });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/student/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, course } = req.body;

  const student = await Student.findByPk(id);
  try {
    if (student) {
      student.name = name || student.name;
      student.email = email || student.email;
      student.course = course || student.course;

      await student.save();
      res.status(201).json(student);
    }
  } catch {
    res.status(404).json({ error: error.message });
  }
});

app.delete('/student/:id', async (req, res) => {
  const { id } = req.params;

  const student = await Student.findByPk(id);
  try {
    if(student) {
      await student.destroy();
      res.status(201).json({message : "row deleted"});
    }
  }
  catch {
    res.status(404).json({message : "invalid id"});
  }
})