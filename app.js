const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

const log = console.log

/**Create list command */
yargs.command({
    command: 'list',
    description: 'List notes.',
    handler() {
        notes.listNotes()
    }
})

/**Create add command */
yargs.command({
    command: 'add',
    description: 'Add a new note.',
    builder: {
        title: {
            description: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            description: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

/**Create read command */
yargs.command({
    command: 'read',
    description: 'Read a note.',
    builder: {
        title: {
            description: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

/**Create remove command */
yargs.command({
    command: 'remove',
    description: 'Remove a note.',
    builder: {
        title: {
            description: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})


yargs.parse()