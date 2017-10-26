const main = require('./main').default
function vuejsStorage(option) {
	return main.createVuexPlugin(option)
}
vuejsStorage.install = main.install
module.exports = vuejsStorage