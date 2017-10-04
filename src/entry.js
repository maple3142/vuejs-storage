const main = require('./main').default
function vuejsStorage(option) {
	return new main.Storage(option)
}
vuejsStorage.install = main.install
vuejsStorage.Storage = main.Storage
module.exports = vuejsStorage