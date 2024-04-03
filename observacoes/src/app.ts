import express from 'express' 
//import uuid from 'uuid'
import {v4 as uuidv4} from 'uuid'
const app = express()
app.use(express.json())


/* 
a estrutura da base de observacoes 
{
    "1": [
        {
            "id": "100", 
            "texto": "Comprar açucar"
        },
        {
            "id": "101", 
            "texto": "Ver um filme"
        }
    ]
}
*/

interface Observacao{
    id: string;
    texto: string; 
}
const observacoes: Record <string, Observacao[]> = {}


//POST /lembretes/123456/observacoes
app.post('/lembretes/:id/observacoes', (req, res) => {
   //1. gerar id de observacoes (descobrir como usar a versao 4 do uuid typescript)
   let idObs = uuidv4();
   //2. extrair texto do corpo da requisicao
    const { texto } = req.body
   //3. pegar a colecao de observacoes do lembrede cujo o id se encontra na url, caso exista
   //Caso contrário, pego uma colecao nova, vazia 
    const observacoesDoLembrete: Observacao[] = observacoes[req.params.id] || []
   //4. Na colecao pega no passo anterior adiciona um novo objeto caracterizado por id e texto
    observacoesDoLembrete.push({id: idObs, texto})
   //5. Atualizar o ponteiro na base global para que ele aponte para a colecao que conte nova observacao
   observacoes[req.params.id] = observacoesDoLembrete 
   //6. Responder para o cliente com status 201 e entregando a ele a colecao atualizada
   res.status(201).json(observacoesDoLembrete)

})

app.get('/lembretes/:id/observacoes', (req, res) => {
    res.json(observacoes[req.params.id] || [])
})

const port = 5000
app.listen(port, () => {
    console.log(`Observacoes. ${port}`)
})