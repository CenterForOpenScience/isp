# Isp

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation
Before beginning, you will need to install [Yarn](https://yarnpkg.com/en/docs/install), a package manager (like npm). 

* `git clone <repository-url>` this repository
* change into the new directory
* `yarn install --pure-lockfile`
* `bower install`

### Install submodule dependencies

```bash
cd lib
git submodule init
git submodule update
```

You may need to run the yarn and bower install commands in `lib/exp-player` and `lib/exp-models` as well.

## Running / Development

Setup instructions are broadly derived from those of the [experimenter addon](https://github.com/CenterForOpenScience/experimenter/). 
For most use cases, it should be possible to run against a remote installation of JamDB. The instructions below assume a staging server, 
`https://staging-metadata.osf.io`.

To login via OSF:
* create .env file in top directory
* in .env file include:
  * OSF_CLIENT_ID=\<client ID for staging account\>
  * OSF_SCOPE="osf.users.all_read"
  * OSF_URL="https://staging.osf.io"
  * OSF_AUTH_URL=https://staging-accounts.osf.io
  * JAMDB_URL=https://staging-metadata.osf.io
  * EXPERIMENT_ID=\<jam db document ID referencing the desired ISP study\>
  * USE_UNRELEASED_TRANSLATIONS=<true|false>

* Find jam db document id at: https://staging-experimenter.osf.io/experiments/ (this is the EXPERIMENT_ID)
* Create a new participant at https://staging-experimenter.osf.io/participants
  * Study ID: test
  * Participant ID: <look in the downloaded csv file>

Then run the ember application:

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Trying an experiment
Once the app is started, you will need to log in. Provide a study ID and participant ID. 
These are human readable strings as defined by the researchers, and are available on request (not committed to Github). 
There may be different study IDs to test conditions at different times of day.

### Adding dependencies on other packages
Sometimes, you will want to install an additional third-party package. In place of npm, this project uses `yarn`. 
Most of the [commands](https://yarnpkg.com/en/docs/managing-dependencies) are the same, but this alternative tool 
provides a way for two developers to guarantee they are using the same versions of underlying code. (by running 
`yarn install --pure-lockfile`) This can help avoid a situation where things break unexpectedly when run on a different 
computer.

Whenever you choose to update your dependencies (`yarn add x` or `yarn install`), make sure that code still runs, then
be sure to [commit](https://yarnpkg.com/en/docs/yarn-lock) the modified `yarn.lock` file, which represents the "current 
known working state" for your app. 


### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

