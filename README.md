#doghouse
**a scaffolder that builds a house for the [dog(stack)](https://www.npmjs.com/package/dogstack)**

## PRIOR ART

- [initialize-project](https://github.com/yoshuawuyts/initialize-project)
- [uify](https://github.com/ahdinosaur/uify)

## PURPOSE

- cli tool for scaffolding out a dogstack app
- cli tool for generating new 'concepts' for a dogstack app (concept == folder structure for each 'piece' of the app)

for now, pretty much a rip of [initialize-project](https://github.com/yoshuawuyts/initialize-project) but to use dogstack, i'll play around with it over time

## NOTES

- to clarify: a 'concept' is a opinionated folder structure for collecting related files together
  - but not in a rails way (where all controllers are grouped, all models are grouped etc): instead, all the files related to expressing a concept within your app are gathered under a named folder
  - i.e. a 'profiles' concept, which houses the UI (containers / components), the reducer, the actions etc that are needed to implement profiles
  - (nb. this doesn't mean that some concepts don't rely on files from other concepts)
- at the moment, doesn't wire up any of the concepts to the top-level app
- includes the core libs that dogstack itself uses, as part of the package.json (unsure if that's good... could expose them instead through dogstack)
- doesn't wire up any HTML for a new app: this is deliberate for now, as i expect i'll create a module ```dogfood``` that will do server spinning up (and will make static HTML generation unnecessary)
  - for now just create an index.html at the top-level with a `main` element and a script tag with `src="bundle.js"`
- doesn't do any git user stuff that initialize-project does, as of yet

## API

install globally to use: `npm install -g doghouse`

- generate a new dogstack app: `doghouse -a -n NAME -d DIRECTORY`
- generate a new dogstack concept: `doghouse -n NAME -d DIRECTORY`

## IDEAS

- in the future, this will probably need to be able to spin up dogstack and dogfood apps (client and server)
- fork of [copy-template-dir](https://github.com/yoshuawuyts/copy-template-dir) so that it can generate filenames named after the name arg?
- what about easy deployment handling? is that a different module? (dogrocket? dogwheels?)
