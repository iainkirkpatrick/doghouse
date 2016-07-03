var install = require('npm-install-package')
var copy = require('copy-template-dir')
var prompt = require('inquirer').prompt
// var today = require('dates-of-today')
var assign = require('xtend/mutable')
var mapLimit = require('map-limit')
var gitInit = require('git-init')
var mkdirp = require('mkdirp')
var path = require('path')
var rc = require('rc')

module.exports = {
  createApp: createApp,
  createConcept: createConcept
}

function createApp(argv, cb) {
  // argv.date = today()
  argv.devDeps = [
    'babel-cli',
    'babel-preset-es2015',
    'babel-preset-react',
    'babelify',
    'browserify',
    'budo',
  ]
  argv.mainDeps = [
    'dogstack',
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux',
  ]

  const tasks = [
    runPrompt,
    // getUser,
    chdir,
    copyFiles,
    createGit,
    devDeps,
    mainDeps
  ]
  mapLimit(tasks, 1, iterator, cb)
  function iterator (fn, next) {
    fn(argv, next)
  }
}

function createConcept(argv, cb) {
  const tasks = [
    runPrompt,
    chdir,
    copyFiles
  ]
  mapLimit(tasks, 1, iterator, cb)
  function iterator (fn, next) {
    fn(argv, next)
  }
}


function runPrompt (argv, cb) {
  const questions = []
  if (!argv.name) {
    questions.push({ name: 'name', default: '', message: argv.app ? 'App name' : 'Concept name' })
  }

  if (!questions.length) return cb()
  prompt(questions, function (res) {
    assign(argv, res)
    cb()
  })
}

// get the current user if no user was specified
// (obj, fn) -> null
// function getUser (argv, cb) {
//   if (argv.user) return cb()
//
//   const conf = rc('npm')
//   if (!conf) return cb('no npm config found')
//
//   const github = conf['init.author.github']
//   if (!github) return cb('no init.author.github set')
//   argv.user = github
//
//   const name = conf['init.author.name']
//   if (!name) return cb('no init.author.name set')
//   argv.realName = name
//
//   cb()
// }

// change the output directory
// (obj, fn) -> null
function chdir (argv, cb) {
  const dir = path.join(argv.directory, argv.name)
  mkdirp(dir, function (err) {
    if (err) return cb(err)
    process.chdir(dir)
    cb()
  })
}

// copy files from dir to dist
// (obj, fn) -> null
function copyFiles (argv, cb) {
  if (argv.app) {
    copy(path.join(__dirname, 'templates/app'), process.cwd(), argv, cb)
  } else {
    copy(path.join(__dirname, 'templates/concept'), process.cwd(), argv, cb)
  }
}

// create git repository
// (obj, cb) -> null
function createGit (argv, next) {
  const path = argv.path
  gitInit(path, next)
}

// install dev dependencies from npm, pull from cache by default
// (obj, cb) -> null
function devDeps (argv, next) {
  const opts = { saveDev: true, cache: true }
  install(argv.devDeps, opts, function (err) {
    if (err) return next(err)
    next()
  })
}

// install dependencies from npm for app-main
// (obj, cb) -> null
function mainDeps (argv, next) {
  const opts = { save: true, cache: true }
  install(argv.mainDeps, opts, function (err) {
    if (err) return next(err)
    next()
  })
}
