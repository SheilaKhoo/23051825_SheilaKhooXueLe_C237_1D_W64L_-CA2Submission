// Basic NodeJS and Express Initialization
const express = require('express');
const app = express();
const mysql = require('mysql2');
const multer = require('multer');
const PORT = 3000;
const YOURNAME = 'User'; // Default name of user since we don't have user accounts yet
const SALAD_LIMIT = 10; // Maximum number of dreams that can be chained into a DreamSalad

// MySQL Connection
const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'sheilakhooxuele',
    password: 'f%rgos#$wgvh$RGLSQWfg==',
    database: 'dreamsalad'
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Initialize EJS View Engine
app.set('view engine', 'ejs');

// Set CSS and JavaScript to get files from the public folder
app.use(express.static('public'));

// Urlencoded for MySQL
app.use(express.urlencoded({extended: false}));

// Storage and upload for multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});
const upload = multer({storage: storage});

// ============================================
// =============== MAIN PROGRAM ===============
// ============================================

// INDEX PAGE
app.get('/', (req, res) => {
    // Select random 10 dreams from dreams table
    const sql = 'SELECT * FROM dreams ORDER BY RAND() LIMIT 10';

    connection.query(sql, (error, randomedDreamsResults) => {
        if (error) {
            console.log('Database query error:', error.message);
            return res.status(500).redirect('/500');
        }
        res.render('index', {randomedDreams: randomedDreamsResults});
    });
});
// Additional redirects for Index Page
app.get('/index', (req, res) => {
    // Redirect to Index Page
    res.redirect('/');
});
app.get('/home', (req, res) => {
    // Redirect to Index Page
    res.redirect('/');
});

// VIEW DREAMSALAD
app.get('/view/:id/:count', (req, res) => {
    // GET BASE DREAM
    const dreamID = req.params.id;
    const rootDreamSQL = 'SELECT * FROM dreams WHERE dream_id = ?';

    // Get base dream from database
    connection.query(rootDreamSQL, [dreamID], (error, rootDreamResult) =>{
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).redirect('/500');
        }

        if (rootDreamResult.length > 0) {
            // GET EXTRA DREAMS
            let extraDreamsNo = parseInt(req.params.count) - 1; // Number of extra dreams to append
            // If user manually set the value too low, set it minimum to 3 dreams (2 extra dreams)
            if (extraDreamsNo < 2) {
                extraDreamsNo = 2;
            }
            // Set max count to the limit
            if (extraDreamsNo > SALAD_LIMIT - 1) {
                extraDreamsNo = SALAD_LIMIT - 1;
            }

            // Random extra dreams based on the number the user selected on the slider bar
            // This also inner joins the starting phrase (the string version converted from the connector_id)
            const extraDreamsSQL = 'SELECT * FROM dreams INNER JOIN connectors ON connectors.connector_id = dreams.connector_id WHERE dreams.dream_id != ? ORDER BY RAND() LIMIT ?'
            
            // Get extra dreams from database
            connection.query(extraDreamsSQL, [dreamID, extraDreamsNo], (error2, extraDreamsResult) => {
                if (error2) {
                    console.error('Database query error:', error.message);
                    return res.status(500).redirect('/500');
                }

                // Get a list of authors so they can be displayed alongside the story
                // This generates a unique list of authors
                const authorsList = [];
                // Push in the root dream's author first
                authorsList.push(rootDreamResult[0].user_name);
                for (let i = 0; i < extraDreamsResult.length; i++) {
                    // Check for repeated name in the authors list
                    if (authorsList.includes(extraDreamsResult[i].user_name) == false) {
                        authorsList.push(extraDreamsResult[i].user_name);
                    }

                    // Change to lowercase if detected to start with "I"
                    if (extraDreamsResult[i].dream.startsWith('I ')) {
                        // Do nothing
                    } else {
                        extraDreamsResult[i].dream = extraDreamsResult[i].dream.charAt(0).toLowerCase() + extraDreamsResult[i].dream.slice(1);
                    }
                }

                // Render the page and pass through dreams selected
                res.render('viewStory', {rootDream: rootDreamResult[0], extraDreams: extraDreamsResult, authorsList});
            });
        } else {
            res.status(404).redirect('/404');
        }
    })
});

// POST DREAMSALAD
app.get('/newDream', (req, res) => {
    const sql = 'SELECT * FROM connectors';

    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).redirect('/500');
        }

        res.render('newDream', {connectors: results});
    });
})
app.post('/myDreams', upload.single('image'), (req, res) => {
    const {title, dream} = req.body; // Get whatever the user entered
    const connector_id = parseInt(req.body.connector_id); // Change connector id to integer
    user_name = YOURNAME; // Default username to 'User' since we don't have user accounts yet
    created = new Date(); // Set created date to now
    last_edited = new Date(); // Set last edited date to now

    let image;
    if (req.file) {
        image = req.file.filename;
    } else {
        image = null;
    }

    // SQL statement to insert
    const sql = 'INSERT INTO dreams (user_name, title, dream, connector_id, created, last_edited, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
    // Post the values to the database
    connection.query(sql, [user_name, title, dream, connector_id, created, last_edited, image], (error, results) => {
        if (error) {
            console.error('Error adding dream:', error);
            res.status(500).redirect('/500');
        } else {
            res.redirect('/myDreams');
        }
    });
});

// MY DREAM SALAD
app.get('/myDreams', (req, res) => {
    // Get user's dreams
    //                    DREAM_ID       USER_NAME    TITLE       DREAM  CONNECTOR_ID  CREATED  LAST_EDITED              FAVOURITED              image
    const sql = 'SELECT dreams.dream_id, user_name, dreams.title, dream, connector_id, created, last_edited, COUNT(SDHD.saved_id) AS favourited, image FROM dreams LEFT JOIN saved_dreams_has_dreams SDHD ON SDHD.dream_id = dreams.dream_id WHERE user_name = ? GROUP BY dreams.dream_id';

    // USER DREAMS SQL
    connection.query(sql, [YOURNAME], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).redirect('/500');
        }

        // Pass in connectors for the modal edit box to work properly
        const sql2 = 'SELECT * FROM connectors';

        // CONNECTORS SQL
        connection.query(sql2, (error2, results2) => {
            if (error2) {
                console.error('Database query error:', error2.message);
                return res.status(500).redirect('/500');
            }
            res.render('myDreams', {returnList: results, connectors: results2})
        });
    });
});
// Delete
app.get('/myDreams/:id/delete', (req, res) => {
    const dreamID = req.params.id;
    // SQL statement for delete
    const sql = 'DELETE FROM dreams WHERE dream_id = ? AND user_name = ?'; // check user name just to check if you're not deleting someone else's dreams
    
    // CONNECTORS SQL
    connection.query(sql, [dreamID, YOURNAME], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).redirect('/500');
        }
        res.redirect('/myDreams');
    });
});
// Update
app.post('/myDreams/:id/update', upload.single('image'), (req, res) => {
    const dreamID = req.params.id;
    const {title, dream} = req.body; // Get whatever the user entered
    const connector_id = parseInt(req.body.connector_id); // Change connector id to integer
    last_edited = new Date(); // Set last edited date to now

    let image = req.body.currentImage;
    if (req.file) {
        image = req.file.filename;
    }

    // SQL statement to UPDATE
    const sql = 'UPDATE dreams SET title = ?, connector_id = ?, dream = ?, last_edited = ?, image = ? WHERE dream_id = ? AND user_name = ?';  // check user name just to check if you're not updating someone else's dreams
    // Post the values to the database
    connection.query(sql, [title, connector_id, dream, last_edited, image, dreamID, YOURNAME], (error, results) => {
        if (error) {
            console.error('Error updating dream:', error);
            res.status(500).redirect('/500');
        } else {
            res.redirect('/myDreams');
        }
    });
});

// SAVED DREAMS
// When user tries to save dream chain
app.post('/myDreams/:idchain', (req, res) => {
    // Get the necessary data
    const idChain = req.params.idchain.split('-');
    const owner_name = YOURNAME;
    const title = req.body.title;

    // SQL statement for new saved dream entry (this table stores one entry. The primary key for this table will serve to identify all entries in saved_dreams_has_dreams belonging to the same saved group of dreams)
    const saved_dreams_SQL = 'INSERT INTO saved_dreams (owner_name, title) VALUES (?, ?)';
    // Execute SQL statement
    connection.query(saved_dreams_SQL, [owner_name, title], (error, results) => {
        if (error) {
            console.error('Error saving DreamSalad:', error);
            res.status(500).redirect('/500');
        } else {
            // If successful, continue to insert the entries for the resolving table

            let orderNum = 0; // Initialize order number as 0. This is the order the dream appeared in
            idChain.forEach((dreamID) => {
                const saved_dreams_has_dreams_SQL = 'INSERT INTO saved_dreams_has_dreams (saved_id, dream_id, dream_order) VALUES (?, ?, ?); ';
                let dreamID_int = parseInt(dreamID);

                connection.query(saved_dreams_has_dreams_SQL, [results.insertId, dreamID_int, orderNum], (error2, results) => {
                    if (error2) {
                        console.error('Error adding dreams to resolving table:', error2);
                        res.status(500).redirect('/500');
                    } else {
                        // Do nothing if success
                    }
                });

                orderNum++;
            });
            res.redirect('/savedDreams'); // Only redirect after loop to insert items is complete
        }
    });
});
// When user tries to view saved dreams
app.get('/savedDreams', (req, res) => {
    const returnListSQL = 'SELECT *, SD.title AS saved_title FROM saved_dreams SD INNER JOIN saved_dreams_has_dreams SDHD ON SD.saved_id = SDHD.saved_id LEFT JOIN dreams D ON D.dream_id = SDHD.dream_id LEFT JOIN connectors C ON C.connector_id = D.connector_id WHERE SD.owner_name = ? ORDER BY SD.saved_id ASC, dream_order DESC';
    connection.query(returnListSQL, [YOURNAME], (error, results) => {
        // Group the results together based on saved_id and order by dream_order but descending for now
        // For example:
        // [
        //     [ { saved_id: 1, dream_order: 2 }, { saved_id: 1, dream_order: 1 }, { saved_id: 1, dream_order: 0 } ],
        //     [ { saved_id: 2, dream_order: 2 }, { saved_id: 2, dream_order: 1 }, { saved_id: 2, dream_order: 0 } ]
        // ]
        if (error) {
            console.log('Error retrieving saved dreams:', error);
            res.status(500).redirect('/500');
        } else {
            const returnList = [];
            let order_index = -1;
            results.forEach((item) => {
                order_index--; // Keeps track from highest dream_order of each saved_id to lowest, then reset and go to the next saved_id
                if (order_index < 0) {
                    order_index = item.dream_order; // Reset dream_order to the first value (the highest index) of the next saved_id batch of items
                    returnList.push([item]);
                } else { // Else if still in the midst of counting down, meaning still on the same saved_id
                    returnList[returnList.length - 1].push(item); // Push in to the last array to group saved_ids together
                }
            });

            // Now reverse each index's dream_order to make them ascending order
            for (let i = 0; i < returnList.length; i++) {
                returnList[i] = [...returnList[i]].reverse();
            }
            
            // Now our returnList is sorted like this (dream_order is ascending now):
            // [
            //     [ { saved_id: 1, dream_order: 0 }, { saved_id: 1, dream_order: 1 }, { saved_id: 1, dream_order: 2 } ],
            //     [ { saved_id: 2, dream_order: 0 }, { saved_id: 2, dream_order: 1 }, { saved_id: 2, dream_order: 2 } ]
            // ]
            // Which makes it easier for us to use it in savedDreams.ejs

            // Get nested list of unique author names
            const authorsMasterList = [];
            returnList.forEach((item) => {
                // Push in a new list with the first name in
                // If dream hasn't been deleted, push in the user_name, else push it an empty array
                if (item[0].dream) {
                    authorsMasterList.push([item[0].user_name]);
                } else {
                    authorsMasterList.push([]);
                }

                // Push in the remaining authors too but also check if dream hasn't been deleted
                for (let i = 1; i < item.length; i++) {
                    if (item[i].dream_id && authorsMasterList[authorsMasterList.length - 1].includes(item[i].user_name) == false) {
                        authorsMasterList[authorsMasterList.length - 1].push(item[i].user_name);
                    }
                }
            })
            // Now we can pass it through the render and let the .ejs page do the displaying
            res.render('savedDreams', {returnList, authorsMasterList});
        }
    });
});
// Delete saved dream entry
app.get('/savedDreams/:id/delete', (req, res) => {
    const savedID = req.params.id;
    // SQL statement for delete
    // Delete from the resolving table first since it's the child table
    // My C207 lecturer Juan Sng said that "You must kill the child first then kill the parent" :)
    const resolvingSQL = 'DELETE SDHD FROM saved_dreams_has_dreams SDHD INNER JOIN saved_dreams SD ON SD.saved_id = SDHD.saved_id WHERE SDHD.saved_id = ? AND SD.owner_name = ?'; // check owner name just to check if you're not deleting someone else's dreams
    
    // Delete from resolving table SQL
    connection.query(resolvingSQL, [savedID, YOURNAME], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).redirect('/500');
        }

        const savedSQL = 'DELETE FROM saved_dreams WHERE saved_id = ? AND owner_name = ?'; // check owner name just to check if you're not deleting someone else's dreams
        connection.query(savedSQL, [savedID, YOURNAME], (error2, results2) => {
            if (error2) {
                console.error('Database query error:', error2.message);
                return res.status(500).redirect('/500');
            }
            res.redirect('/savedDreams');
        });
    });
});

// FAQ PAGE
app.get('/FAQ', (req, res) => {
    res.render('FAQ');
});

// 500 INTERNAL SERVER ERROR
app.get('/500', (req, res) => {
    res.status(500).render('500');
});

// 404 NOT FOUND
app.use((req, res) => {
    // Render the 404 not found page
    res.status(404).render('404');
});


// ============================================
// ============= MAIN PROGRAM END =============
// ============================================

// Listen to Port
app.listen(PORT, (req, res) => {
    console.log(`Server running at http://localhost:${PORT}/`);
});