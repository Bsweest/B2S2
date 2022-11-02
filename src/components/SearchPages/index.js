import { FontAwesome5 } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import getUserProfile from '../../../backend/services/ShareProfileServices';
import shortServices from '../../../backend/services/ShortService';
import themes from '../../values/themes';

const littleWidth = (Dimensions.get('window').width * 44) / 100;
const littleHeight = (Dimensions.get('window').width * 66) / 100;
const allHeight = littleHeight + 100;

const LittleShort = ({ navigation, item, ts }) => {
  const { id: ssid, op_id } = item;

  const { data, isLoading, isError, isSuccess } = useQuery(
    ['get_user_data', op_id],
    () => getUserProfile(op_id),
    {
      placeholderData: {
        avatar_url: '',
      },
    },
  );
  const { data: services } = useQuery(['short_services', ssid], () =>
    shortServices(ssid),
  );

  const open = () => {
    navigation.navigate('SearchDetails', { text_search: ts });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={open}>
        <Image
          style={styles.poster}
          source={
            item.poster_uri
              ? { uri: item.poster_uri }
              : require('../../assets/placeholder/background.png')
          }
          resizeMode="cover"
        />
      </Pressable>

      <Text style={styles.caption} numberOfLines={2}>
        {item.caption}
      </Text>

      <View style={styles.originalPoster}>
        <Image
          style={styles.avatar}
          source={
            data.avatar_url
              ? { uri: data.avatar_url }
              : require('../../assets/placeholder/user.png')
          }
          resizeMode="cover"
        />
        <Text style={styles.opname} numberOfLines={1}>
          {data.displayname}
        </Text>
        <FontAwesome5 name="heart" size={18} color="grey" />
        <Text style={styles.countHeart}>{services.count_heart}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: littleWidth,
    height: allHeight,
    flexDirection: 'column',
    marginHorizontal: '2%',
  },
  poster: {
    height: littleHeight,
    width: littleWidth,
    borderRadius: 8,
  },
  caption: {
    fontWeight: '500',
    color: themes.COLOR,
    fontSize: themes.SIZE,
    marginVertical: 3,
  },
  originalPoster: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  opname: {
    flex: 1,
    color: themes.SECONDCOLOR,
    fontSize: themes.SMALL,
  },
  countHeart: {
    width: 50,
    fontSize: themes.SMALL,
    color: themes.ACTIVE,
    marginLeft: 5,
  },
});

export default LittleShort;
