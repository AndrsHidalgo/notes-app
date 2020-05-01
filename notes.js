const fs    = require('fs')
const chalk = require('chalk')

const log = console.log

const listNotes = () => {
    const notes = loadNotes()

    notes.forEach(note => log(chalk`Title: {blue.bold ${note.title}}\n ${note.body}`));
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)  

        log(chalk.green.bold('New note added!'))
    } else {
        log(chalk.yellow.bold('Note title taken!'))
    }
}

const readNote = title => {
    const notes = loadNotes()
    const findNote = notes.find(note => note.title === title)

    if (findNote) {
        log(chalk`Title: {blue.bold ${findNote.title}}\n ${findNote.body}`)    
    } else {
        log(chalk.yellow.bold('Note not found!'))
    }
}

const removeNote = title => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(note => note.title !== title)

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep)  

        log(chalk.green.bold(`Note ${title} removed!`))
    } else {
        log(chalk.yellow.bold('Note not found!'))
    }
}

const saveNotes = notes => {
    const dataJson = JSON.stringify(notes)

    fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')

        const dataJson   = dataBuffer.toString()

        return JSON.parse(dataJson)   
    } catch (error) {
        return []
    }
}

module.exports = {
    listNotes: listNotes,
    addNote: addNote,
    readNote: readNote,
    removeNote: removeNote
}