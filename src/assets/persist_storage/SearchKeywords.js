import persistStorage from '.';

const persist = persistStorage.getString('search_keywords');
const searchKeys = JSON.parse(persist);

export default searchKeys;
