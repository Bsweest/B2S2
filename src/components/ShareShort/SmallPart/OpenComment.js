import { View, Text, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import styles from './styles'
import { openCS } from '../../../redux/slices/CommentSectionSlice';
import { getCountAllComment } from '../../../../backend/services/ShortService';

export default function OpenComment({ssid, setStatus}) {
  const dispatch = useDispatch();

  const [countComment, setCountComment] = useState(0);

  useEffect(() => {
    getCountAllComment(ssid).then((rs) => {
      setCountComment(rs);
    })
  
    return () => {
      
    }
  }, [])
  

  const open = () => {
    setStatus(false);
    dispatch(openCS(ssid));
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={open}>
        <View style={styles.commentAddition}>
          <FontAwesome 
            name='commenting'
            size={36}
            color={'#FBFBFB'}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.text}>
        {countComment}
      </Text>
    </View>
  )
}