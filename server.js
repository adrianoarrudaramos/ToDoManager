// Express - framework de api's para o nodejs
const express = require('express');

// Body-Parser - biblioteca paa converter requisição em  conteúdo json
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
    res.send('Hello world Tasks API');
});

const tasks = [];

// Método POST para criar as tarefas
app.post('/tasks', (req, res) => {
    const {
        body
    } = req;

    // Verifica se foi enviado parâmetros corretos para title
    if (!body.title || body.title.length < 1) {
        res.status(400).send('Title is required!');
        return;
    }

    const task = {
        id: Math.random().toString().replace('0.', ''),
        title: body.title,
        resume: body.resume,
        isDone: body.isDone,
        isPriority: body.isPriority
    };
    tasks.push(task);
    res.status(201);
    res.send(task);
})

// Método GET para consultar todas as tarefas criadas no servidor
app.get('/tasks', (req, res) => {
    res.send(tasks);
})

// Método GET para consulta de tarefa com parâmetro
app.get('/tasks/:taskId', (req, res) => {
    const task = tasks.find(t => t.id == req.params.taskId);
    if (task) {
        res.status(200);
        res.send(task);
    } else {
        res.status(404);
        res.send();
    }
})

// Método PUT para atualização de tarefa específica
app.put('/tasks/:taskId', (req, res) => {
    const {
        body
    } = req;
    const task = tasks.find(t => t.id == req.params.taskId);

    if (task) {
        task.title = body.title;
        task.resume = body.resume;
        task.isDone = body.isDone;
        task.isPriority = body.isPriority;
        res.send(task);
    } else {
        res.status(404);
        res.send();
    }
});

// Método DELETE para excluir determinada tarefa
app.delete('/tasks/:taskId', (req, res) => {
    const task = tasks.find(t => t.id == req.params.taskId);
    if (task) {
        tasks.pop(task);
        res.send(task);
    } else {
        res.status(404);
        res.send();
    }
})

// Deixando a porta preparada para ambiente de produção
// Porta dinâmica do ambiente ou a porta 3000 localhost
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));