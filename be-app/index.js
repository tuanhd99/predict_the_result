const express = require('express')
const cors = require('cors')
const redis = require('fakeredis')
const {google} = require('googleapis')
const bodyParser = require('body-parser');
const cronJob = require('node-cron');
const { checkUserLogin } = require('./helper');

const CACHE_KEY = 'USER_VOTE'
const app = express()

app.use(cors())
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Tạo một Redis client
const client = redis.createClient();

// handler
const handleGetListData = async (name) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'google.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const sheetID = '1J7tEvc6nHczOg7ypI4HRvuLjlu61iuStkxV0Gknaxgw'
    const client = await auth.getClient()
    const sheets = google.sheets({version: 'v4', auth: client})

    const rows = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId: `${sheetID}`,
        range: name
    });
    
    const results = rows.data.values;
    if(results) {
        const headers = results[0];
        const rowsResults = results.slice(1);
        
        const getColumnLetter = (colIndex) => String.fromCharCode(65 + colIndex);
        
        const result = rowsResults.map((row, rowIndex) => ({
            [headers[0].toLowerCase()]: row[0],
            [headers[1].toLowerCase()]: row[1],
            [headers[2].toLowerCase()]: row[2],
            [headers[3].toLowerCase()]: row[3],
            [headers[4].toLowerCase()]: row[4],
            [headers[5].toLowerCase()]: row[5],
            position: {
                [headers[0].toLowerCase()]: `${getColumnLetter(0)}${rowIndex + 2}`, 
                [headers[1].toLowerCase()]: `${getColumnLetter(1)}${rowIndex + 2}`, 
                [headers[2].toLowerCase()]: `${getColumnLetter(2)}${rowIndex + 2}`,
                [headers[3].toLowerCase()]: `${getColumnLetter(3)}${rowIndex + 2}`,
                [headers[4].toLowerCase()]: `${getColumnLetter(4)}${rowIndex + 2}`,
                [headers[5].toLowerCase()]: `${getColumnLetter(5)}${rowIndex + 2}`,
            }
        }));
    
        return result;
    } else {
        return results;
    }
}

const handleGetAccountData = async (name) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'google.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const sheetID = '1J7tEvc6nHczOg7ypI4HRvuLjlu61iuStkxV0Gknaxgw'
    const client = await auth.getClient()
    const sheets = google.sheets({version: 'v4', auth: client})

    const rows = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId: `${sheetID}`,
        range: name
    });
    
    const results = rows.data.values;
    if(results) {
        const headers = results[0];
        const rowsResults = results.slice(1);
        
        const getColumnLetter = (colIndex) => String.fromCharCode(65 + colIndex);
        
        const result = rowsResults.map((row, rowIndex) => ({
            [headers[0].toLowerCase()]: row[0],
            [headers[1].toLowerCase()]: row[1],
            [headers[2].toLowerCase()]: row[2],
            [headers[3].toLowerCase()]: row[3],
            [headers[4].toLowerCase()]: row[4],
            position: {
                [headers[0].toLowerCase()]: `${getColumnLetter(0)}${rowIndex + 2}`, 
                [headers[1].toLowerCase()]: `${getColumnLetter(1)}${rowIndex + 2}`, 
                [headers[2].toLowerCase()]: `${getColumnLetter(2)}${rowIndex + 2}`,
                [headers[3].toLowerCase()]: `${getColumnLetter(3)}${rowIndex + 2}`,
                [headers[4].toLowerCase()]: `${getColumnLetter(4)}${rowIndex + 2}`,
            }
        }));
    
        return result;
    } else {
        return results;
    }
}

const handleGetListPlaying = async (name) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'google.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const sheetID = '1J7tEvc6nHczOg7ypI4HRvuLjlu61iuStkxV0Gknaxgw'
    const client = await auth.getClient()
    const sheets = google.sheets({version: 'v4', auth: client})

    const rows = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId: `${sheetID}`,
        range: name
    });
    
    const results = rows.data.values;
    if(results) {
        const headers = results[0];
        const rowsResults = results.slice(1);
        
        const getColumnLetter = (colIndex) => String.fromCharCode(65 + colIndex);
        
        const result = rowsResults.map((row, rowIndex) => ({
            [headers[0].toLowerCase()]: row[0],
            [headers[1].toLowerCase()]: row[1],
            [headers[2].toLowerCase()]: row[2],
            [headers[3].toLowerCase()]: row[3],
            [headers[4].toLowerCase()]: row[4],
            position: {
                [headers[0].toLowerCase()]: `${getColumnLetter(0)}${rowIndex + 2}`, 
                [headers[1].toLowerCase()]: `${getColumnLetter(1)}${rowIndex + 2}`, 
                [headers[2].toLowerCase()]: `${getColumnLetter(2)}${rowIndex + 2}`,
                [headers[3].toLowerCase()]: `${getColumnLetter(3)}${rowIndex + 2}`,
                [headers[4].toLowerCase()]: `${getColumnLetter(4)}${rowIndex + 2}`,
            }
        }));
    
        return result;
    } else {
        return results;
    }
}

const handleAddAccount = async (name, data) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'google.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const sheetID = '1J7tEvc6nHczOg7ypI4HRvuLjlu61iuStkxV0Gknaxgw'
    const client = await auth.getClient()
    const sheets = google.sheets({version: 'v4', auth: client})

    const row = await sheets.spreadsheets.values.append({
        auth,
        spreadsheetId: `${sheetID}`,
        range: name,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [data]
        }
    })

    return row
}

const handleUpdateAccount = async (name, position, value) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'google.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const sheetID = '1J7tEvc6nHczOg7ypI4HRvuLjlu61iuStkxV0Gknaxgw'
    const client = await auth.getClient()
    const sheets = google.sheets({version: 'v4', auth: client})

    const row = await sheets.spreadsheets.values.update({
        auth,
        spreadsheetId: `${sheetID}`,
        range: `${name}!${position}`,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [value]
        }
    })

    return row
}

const getDataInPosition = async (position) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'google.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const sheetID = '1J7tEvc6nHczOg7ypI4HRvuLjlu61iuStkxV0Gknaxgw'
    const client = await auth.getClient()
    const sheets = google.sheets({version: 'v4', auth: client})

    const rows = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId: `${sheetID}`,
        range: `${position}`
    });
    
    const results = rows.data.values;

    return results[0];
}

const getItemInPosition = async (name, position) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'google.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })
    const sheetID = '1J7tEvc6nHczOg7ypI4HRvuLjlu61iuStkxV0Gknaxgw'
    const client = await auth.getClient()
    const sheets = google.sheets({version: 'v4', auth: client})

    const rows = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId: `${sheetID}`,
        range: `${name}!${position}`
    });
    
    const results = rows.data.values;

    return results[0][0];
}

// cron job
cronJob.schedule('*/2 * * * *', async () => {
    console.log('cron job scheduled at 300s')

    const result = await handleGetListData('results')
    const countRender = await getItemInPosition('results', 'G2')
    const results = result.slice(0, +countRender)
    console.log('results', results)

    client.get(CACHE_KEY, async (err, data) => {
        if (err) {
            console.error('Error get cached:', err)
            return
        }

        if (data) {
            const dataCached = JSON.parse(data)

            if(dataCached && dataCached.length > 0) {
                console.log('data cached: ', dataCached)
                const resultDone = results.filter(item => item.win !== 'pending')

                if(resultDone.length > 0) {
                    for(const result of resultDone) {
                        const matchs = dataCached.filter(item => +item.match === +result.match && item.team_vote === result.win)

                        if(matchs.length > 0) {
                            for(const match of matchs) {
                                const listAccounts = await handleGetAccountData('accounts')
                                const item = listAccounts.find(account => account.email === match.email)

                                if(item) {

                                    const updatedAcc = await handleUpdateAccount('accounts', item.position.coin, [(+item.coin + +match.coin_vote)])
                                    if(updatedAcc.status === 200) {
                                        
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if(dataCached && dataCached.length > 0) {
                const resultDone = results.filter(item => item.win !== 'pending')
                let finals = [...dataCached]

                if(resultDone.length > 0) {
                    // clear data in cached with match 
                    resultDone.forEach(item => {
                        let match = item.match
                        finals = finals.filter(item => +item.match !== +match)

                        
                    })
                }

                console.log('finals: ', finals)

                         client.set(CACHE_KEY, JSON.stringify(finals)), (err) => {
                            if(err) {
                                console.error('Error set cached:', err)
                            } else {
                                console.log('Cached cleared with match:', match)
                            }
                         }
            }
        }
    })
})

//
app.get("/list-account", async (req, res) => {
    const result = await handleGetAccountData('accounts')

    res.send({
        message: 'success',
        code: 200,
        data: result
    })
})

//
app.get("/list-result", async (req, res) => {
    const result = await handleGetListData('results')
    const countRender = await getItemInPosition('results', 'G2')

    res.send({
        message: 'success',
        code: 200,
        data: result.slice(0, +countRender)
    })
})


//
app.get("/list-playing", async (req, res) => {
    const result = await handleGetListPlaying('playing')

    res.send({
        message: 'success',
        code: 200,
        data: result
    })
})

//
app.post("/add-playing", async (req, res) => {
    const {email, match, team_vote, coin_vote} = req.body

    const dataCache = {
        email,
        match,
        team_vote,
        coin_vote,
    }

    await client.get(CACHE_KEY, (err, data) => {
        if (err) throw err;

        let cacheData = [];

        if(data) {
            cacheData = [...JSON.parse(data)];
        }

        const newData = [
            ...cacheData,
            dataCache
        ]

        client.set(CACHE_KEY, JSON.stringify(newData), async (err, redis) => {
            if (err) {
                // checkCache = false;
                console.error('Lỗi khi lưu cache:', err);
                res.status(500).send({message: 'Add failed', code: 500})
            } else {
                // checkCache = true;
                const listAccounts = await handleGetAccountData('accounts')
                const item = listAccounts.find(account => account.email === email)

                if(item) {
                    const updatedAcc = await handleUpdateAccount('accounts', item.position.coin, [(+item.coin - +coin_vote)])

                    if(updatedAcc.status === 200) {
                        console.log('Cache lưu thành công:', redis); // In ra "OK" nếu lưu thành công
                        res.send({message: 'Add success', code: 200})

                    }
                }
            }
        })
    })
})

//
app.get('/test-cache', async (req, res) => {
    client.get(CACHE_KEY, (err, data) => {
        if (err) throw err;
        res.send(data)
    })
})

//
app.get('/api/user', async (req, res) => {

    const query = req.query
    const accounts = await handleGetAccountData('accounts')

    const result = accounts.find(account => account.email === query.email)
    if(result) {
        res.send({message: 'User found', code: 200, data: result})
    } else {
        res.status(404).send({message: 'User not found', code: 404})
    }
})

//
app.post("/login", async (req, res) => {
    const {email, password} = req.body

    // Check if email and password match the spreadsheet
    const listAccounts = await handleGetAccountData('accounts')
    const isMatch = listAccounts.some(account => account.email === email && account.password === password)
    const item = listAccounts.find(account => account.email === email && account.password === password)

    if(item?.last_login) {
        const check = checkUserLogin(item?.last_login)
        if(check) {
            const coin = await getItemInPosition('results', 'H2')
            const result = await handleUpdateAccount('accounts', item.position.last_login, [new Date()])
            const updateCoin = await handleUpdateAccount('accounts', item.position.coin, [(+item.coin + +coin)])
        }
    }

    if(isMatch) {
        res.send({message: 'Login success', code: 200, data: item})
    } else {
        res.status(404).send({message: 'Invalid email or password', code: 404})
    }
})

//
app.post("/register", async (req, res) => {

    const coin = await getItemInPosition('results', 'H2')
    const {email, phone_number, password} = req.body
    
    // console.log('listAccounts: ', listAccounts)
    const listAccounts = await handleGetAccountData('accounts')
    const isEmailExists = listAccounts.some(account => account.email === email)

    if(isEmailExists) {
        res.status(409).send({message: 'Email already exists', code: 409})
        return
    }

    const result = await handleAddAccount('accounts', [email, password, phone_number, coin, new Date()])
    const itemCreated = await getDataInPosition(result.data.updates.updatedRange)

    const listAccountsAfter = await handleGetAccountData('accounts')
    const item = listAccountsAfter.find(account => account.email === itemCreated[0] && account.password === itemCreated[1])

    if(result.status === 200) {
        res.status(200).send({message: 'Register success', code: 200, data: item})
    } else {
        res.status(500).send({message: 'Register failed', code: 500})
    }
})

app.listen(1999, (req, res) => {console.log('app listening on 1999')})