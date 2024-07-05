import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash, Edit } from "lucide-react";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");

  const addTask = () => {
    setTasks([...tasks, { id: Date.now(), name: newTask }]);
    setNewTask("");
  };

  const updateTask = () => {
    setTasks(tasks.map(task => task.id === editTask.id ? { ...task, name: editTaskName } : task));
    setEditTask(null);
    setEditTaskName("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <Input 
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Task Name"
              className="mb-4"
            />
            <Button onClick={addTask}>Save</Button>
          </DialogContent>
        </Dialog>
      </header>
      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          tasks.map(task => (
            <Card key={task.id} className="flex justify-between items-center">
              <CardHeader>
                <CardTitle>{task.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => { setEditTask(task); setEditTaskName(task.name); }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Task</DialogTitle>
                    </DialogHeader>
                    <Input 
                      value={editTaskName}
                      onChange={(e) => setEditTaskName(e.target.value)}
                      placeholder="Task Name"
                      className="mb-4"
                    />
                    <Button onClick={updateTask}>Save</Button>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="icon" onClick={() => deleteTask(task.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Index;