// Required modules 
const express = require("express");
const app = express();
const dblib = require("./dblib.js");

const multer = require("multer");
const upload = multer();

// Add middleware to parse default urlencoded form
app.use(express.urlencoded({ extended: false }));

// Setup EJS
app.set("view engine", "ejs");

// Enable CORS (see https://enable-cors.org/server_expressjs.html)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Application folders
app.use(express.static("public"));

// Serve content of the "public and css" subfolder directly
app.use(express.static("css"));

// Start listener
app.listen(process.env.PORT || 3001, () => {
    console.log("Server started (http://localhost:3001/) !");
});


// Setup routes
app.get("/", (req, res) => {
    //res.send("Root resource - Up and running!")
    res.render("index");
});

app.get("/home", (req, res) => {

    res.render("index");
});

app.get("/sumOfSeries", (req, res) => {

    res.render("sumOfSeries");
});

app.get("/import", async (req, res) => {
    const totRecs = await dblib.getTotalRecords()
    console.log(totRecs.totRecords)
    res.render("import", {
        totRecs: totRecs.totRecords,
    });

});


app.post("/import", upload.single('filename'), (req, res) => {
    if (!req.file || Object.keys(req.file).length === 0) {
        message = "Error: Import file not uploaded";
        return res.send(message);
    };
    //Read file line by line, inserting records
    const buffer = req.file.buffer;
    const lines = buffer.toString().split(/\r?\n/);

    lines.forEach(line => {
        //console.log(line);
        product = line.split(",");
        //console.log(product);
        const sql = `INSERT INTO book (book_id, title, total_pages, rating, isbn, published_date) VALUES ($1, $2, $3, $4, $5, $6)`;
        pool.query(sql, product, (err, result) => {
            if (err) {
                console.log(`Insert Error.  Error message: ${err.message}`);
            } else {
                console.log(`Inserted successfully`);
            }
        });
    });
    message = `Processing Complete - Processed ${lines.length} records`;
    res.send(message);
});