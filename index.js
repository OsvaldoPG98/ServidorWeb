const express = require('express');
const Service = require('./src/service');

const app = express();
const PORT = 3000;


app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        body: Service.getUsers(),
    });
});

app.get("/:id", (req, res) => {
    let {params : {id}} = req;
    let user = Service.getUser(id)
    res.json({
        message: `Usuario ${id}`,
        body: user,
    });
});

app.post("/", (req, res) => {
    let { body: newUser } = req;
    let user = Service.createUser(newUser);
    res.status(201).json({
        message: "usuario creado",
        body: user,
    });
});

app.put("/:id", (req, res) => {
    let { params: {id}} = req;
    //let { params : {body}} = req;
    let results = req.body;

    let upUser = Service.updateUser( {id, input: results} );
    if(upUser == false){ 
        res.status(404).json({
            message: `user ${id} not found`
        });
    }
    res.status(202).json({
        message: `Usuario actualizado`,
        body: upUser,
    });
});

app.delete("/:id", (req, res) => {
    let { params: {id} } = req;
    let eliminado = Service.deleteUser(id);
    if(eliminado) res.json({
        message: 'Usuario Eliminado'
    });
});

app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});