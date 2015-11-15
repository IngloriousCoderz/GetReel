randomArrayElement = function (array) {
	return array[Math.floor(Math.random() * array.length)]
}

randomCollectionElement = function (collection, filter) {
	if(!filter) {
		filter={}
	}
	var array = collection.find(filter).fetch();
	return randomArrayElement(array);
}