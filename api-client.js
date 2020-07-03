const API_URL = "https://wincacademydatabase.firebaseio.com/melvin/tasks";

const someCallToGetAllTasks = async () => {
    try {
        const result = await fetch(`${API_URL}.json`, { method: "GET" });
         console.log("result:", result);
        const data = await result.json();
         console.log("data:", data);
        let tasks = Object.keys(data).map(key => ({
            id: key,
            description: data[key].description,
            done: data[key].done
        }));
         console.log("tasks:", tasks);
        return tasks;
    } catch (error) {
        console.log(error);
    }
}

const clientAddTask = async (task) => {
    try {
        let data = JSON.stringify(task)
         console.log("data:", data);
        const result = await fetch(`${API_URL}.json`, { method: "POST", body: data });
         console.log("result:", result);
        data = await result.json();
         console.log("data:", data);
        return { id: data.name };
    } catch (error) {
        console.log(error);
    }
}

const clientDeleteTask = async (id) => {
    try {
        const result = await fetch(`${API_URL}/${id}.json`, { method: "DELETE" });
         console.log("result:", result);
    } catch (error) {
        console.log(error);
    }
}
