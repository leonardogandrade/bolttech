const tasks = [
    { "taksName": "taks-01", "status": 1 },
    { "taksName": "task-02", "status": 0 },
    { "taksName": "task-02", "status": 0 }
]

const filtered = tasks.filter((item, i) => i !== 0)

console.log(filtered);