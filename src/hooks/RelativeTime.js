import moment from 'moment/moment';

export default RelativeTime = (timestamp) => {
  return moment(timestamp).fromNow();
};
