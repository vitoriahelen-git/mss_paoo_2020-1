import express from 'express'; 
const app = express()
app.use(express.json())
interface Lembrete{
    id: string;
    texto: string;
}
const lembretes: Record <string, Lembrete> = {} 
let id: string = '1'
/*
    {
        "1":{
            "id": "1"
            "texto": "Fazer café"
        },
        "2":{
            "id": "2"
            "texto": "Nadar"
        }
    }
*/

//get /lembretes obter a coleção de lembretes
app.get('/lembretes', (req, res) => {
    res.json(lembretes)
})

//POST /lembretes cadastrar novo lembrete 
app.post('/lembretes', (req, res) =>{
    //extrair texto do corpo da requisição {"texto": "Fazer café"}
    const { texto } = req.body 
    //construir um novo lembrete 
    const lembrete = { id, texto }
    //armazenar novo lembrete
    lembretes[id] = lembrete
    //incremento o id 
    id = (+id+1).toString()
    //responder ao cliente
    res.json(lembrete)
})

//get /lembretes/{id}
app.get('/lembretes/:id', (req,res) => { 
    const { id } = req.params; 
    const lembrete = lembretes[id]; 
    if (lembrete) { 
        res.json(lembrete);
    } 
    else { 
        res.status(404).send('Lembrete nao encontrado'); 
    } })


const port = 4000
app.listen(port, ()=> console.log(`Lembretes. Porta ${port}.`))