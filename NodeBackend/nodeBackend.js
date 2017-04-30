var express = require('express');
var bodyParser = require('body-parser');

var nodebackend = express();

nodebackend.use(bodyParser.json());

nodebackend.use(express.static(__dirname + '/dist'));

let books = [
    {'id': 1, 'title': "SUEÑOS DE ACERO Y NEON", 'description': "Los personajes que protagonizan este relato sobreviven en una sociedad en decadencia a la que, no obstante, lograrán devolver la posibilidad de un futuro. Año 2484. En un mundo dominado por las grandes corporaciones, solo un hombre, Jordi Thompson, detective privado deslenguado y vividor, pero de gran talento y sentido d..." },
    {'id': 2, 'title': "LA VIDA SECRETA DE LA MENTE", 'description': "La vida secreta de la mentees un viaje especular que recorre el cerebro y el pensamiento: se trata de descubrir nuestra mente para entendernos hasta en los más pequeños rincones que componen lo que somos, cómo forjamos las ideas en los primeros días de vida, cómo damos forma a las decisiones que nos constituyen, cómo soñamos y cómo imaginamos, por qué sentimos ciertas emociones hacia los demás, cómo los demás influyen en nosotros, y cómo el cerebro se transforma y, con él, lo que somos."},
    {'id': 3, 'title': "CASI SIN QUERER", 'description': "El amor algunas veces es tan complicado como impredecible. Pero al final lo que más valoramos son los detalles más simples, los más bonitos, los que llegan sin avisar. Y a la hora de escribir sobre sentimientos, no hay nada más limpio que hacerlo desde el corazón. Y eso hace Defreds en este libro."},
    {'id': 4, 'title': "TERMINAMOS Y OTROS POEMAS SIN TERMINAR", 'description': "Recopilación de nuevos poemas, textos en prosa y pensamientos del autor. Un sabio dijo una vez: «Pocas cosas hipnotizan tanto en este mundo como una llama y como la luna, será porque no podemos cogerlas o porque nos iluminan en la penumbra». Realmente no sé si alguien dijo esta cita o me la acabo de inventar pero deberían de haberla escrito porque el poder hipnótico que ejercen esa mujer de rojo y esa dama blanca sobre el ser humano es digna de estudio."},
    {'id': 5, 'title': "LA LEGIÓN PERDIDA", 'description': "En el año 53 a. C. el cónsul Craso cruzó el Éufrates para conquistar Oriente, pero su ejército fue destrozado en Carrhae. Una legión entera cayó prisionera de los partos. Nadie sabe a ciencia cierta qué pasó con aquella legión perdida.150 años después, Trajano está a punto de volver a cruzar el Éufrates. ..."}
];

let id = 0;

function searchBook(id){
    for(let i = 0; i < books.length; i++){
        if (books[i].id === id) {
            return i;
        }
    }
    return undefined;
}

// Add headers
nodebackend.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

nodebackend.route('/books/')

    .get((req, res) => {
        res.json(books);
    })

    .post((req, res) => {
        let book = req.body;
        book.id = id;
        id++;
        books.push(book);
        res.json(book);
    })

nodebackend.route('/books/:id')
    .get((req, res) => {
        let rId = parseInt(req.params['id']);
        let pos = searchBook(rId);
        if (pos !== undefined){
            res.json(books[pos]);
        } else {
            res.sendStatus(404);
        }
    })

    .put((req, res) => {
        let rId = parseInt(req.params['id']);
        let pos = searchBook(rId);
        if(pos !== undefined) {
            let newBook = req.body;
            newBook.id = rId;
            books[pos] = newBook;
            res.json(newBook);
        } else {
            res.sendStatus(404);
        }
    })

    .delete((req, res) => {
        let pos = searchBook(parseInt(req.params['id']));
        if (pos !== undefined) {
            let deletedBook = books[pos];
            books.splice(pos, 1);
            res.json(deletedBook);
        } else {
            res.statusCode(404);
        }
    })

    nodebackend.listen(8080, function () {
        console.log('Node backend listening on port 8080!');
    })