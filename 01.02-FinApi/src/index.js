const express = require('express');
const { v4: uuidV4 } = require("uuid")

const app = express();
app.use(express.json())

app.get("/", (request, response) => {
    return response.json({ status: "Connected!🔥" })
});

function verifyIfAccountExists(request, response, next) {
    const { cpf } = request.headers;

    const costumer = costumers.find(c => c.cpf === cpf);

    if (!costumer) {
        return response.status(404).json({ message: "Not Allowed" })
    }

    request.costumer = costumer;

    next();
}

let costumers = [];

app.get("/accounts", verifyIfAccountExists, (request, response) => {
    return response.json(costumers);
})

app.get("/accounts/:id", verifyIfAccountExists, (request, response) => {
    const { id } = request.params;

    return response.json(costumers.find(c => c.id === id));
})

app.delete("/accounts", verifyIfAccountExists, (request, response) => {
    const { costumer } = request;
    
    costumers = costumers.filter(c => c.id !== costumer.id)

    return response.send();
})

app.post("/accounts", (request, response) => {
    const { cpf, name } = request.body;


    const consumerAlreadyExists = costumers.some(c => c.cpf === cpf)
    if (consumerAlreadyExists) {
        return response.status(400).json({ message: "Costumer Already Exists" });
    }

    const id = uuidV4();

    const account = { id, cpf, name, statement: [], balance: 0 };

    costumers.push(account);

    return response.status(201).json(account);
})



app.put("/accounts", verifyIfAccountExists, (request, response) => {
    const { name } = request.body;
    const { costumer } = request;

    costumer.name = name;
    
    return response.status(201).json(costumer);
})


app.get("/statement", verifyIfAccountExists, (request, response) => {
    const { costumer } = request;
    return response.json(costumer.statement);
})

app.get("/statement/date", verifyIfAccountExists, (request, response) => {
    const { costumer } = request;

    const { date } = request.query;

    const dateFormat = new Date(`${date}T00:00`);

    const statement = costumer.statement.filter(s => s.createAt >= dateFormat);

    return response.json(statement);
})


app.post("/deposit", verifyIfAccountExists, (request, response) => {
    const { description, amount } = request.body;

    const { costumer } = request;


    const statementOperation = {
        id: uuidV4(),
        description,
        amount,
        createAt: new Date(),
        type: "credit",
    }

    costumer.statement.push(statementOperation)

    costumer.balance += statementOperation.amount;

    return response.status(201).json(statementOperation);
})

function getBalance(statement) {
    return statement.reduce((acc, operation) => {
        return operation.type === 'credit' ? arr + operation.amount : arr - operation.amount;
    }, 0)
}

app.post("/withdraw", verifyIfAccountExists, (request, response) => {
    const { description, amount } = request.body;

    const { costumer } = request;

    if (getBalance(costumer.statement) < amount) {
        return response.status(400).json({ message: "Insufficient funds" });
    }

    const statementOperation = {
        id: uuidV4(),
        description,
        amount,
        createAt: new Date(),
        type: "debit",
    }

    costumer.statement.push(statementOperation)

    return response.status(201).json(statementOperation);

})

app.listen(3333, () => console.info("Server is started!"))