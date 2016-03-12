'use strict'
const BaseGenerator = require('yeoman-generator').Base
const chalk = require('chalk')
const yosay = require('yosay')
const glob = require('glob')
const path = require('path')


class AppGenerator extends BaseGenerator {

  initializing() {
    this.sourceRoot(path.join(this.sourceRoot(), 'proton-base'))
  }

  prompting() {
    const redName = chalk.red('generator-proton')
    const welcomeMessage = `Welcome to the excellent ${redName} generator!`
    this.log(yosay(welcomeMessage))
  }

  writing() {
    const done = this.async()
    const options = {
      cwd: this.sourceRoot(),
      dot: true,
      ignore: '.git/**'
    }
    glob('**/*', options, (err, files) => {
      if (err) return done(err)
      files.forEach(file => this.fs.copy(
        this.templatePath(file),
        this.destinationPath(file)))
      done()
    })
  }

  install() {}
}

module.exports = AppGenerator
