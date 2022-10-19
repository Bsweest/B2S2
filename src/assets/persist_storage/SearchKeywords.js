import persistStorage from '.'
import { persistObservable } from '@legendapp/state/persist'
import { observable } from '@legendapp/state';

const persist = persistStorage.getString('search_keywords');
const searchKeys = observable(JSON.parse(persist));

persistObservable(searchKeys, { local: 'search_keywords' });

export default searchKeys;