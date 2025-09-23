import { FC } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/Slices/AuthSlice';
import { getGreetingText } from '../../utils/helper';
import Icon from '../Icon';
import Row from '../Row';
import Text from '../Text';

const ProfileViewer: FC = () => {

  const user = useSelector(selectUser);

  return (
    <Row align="center" gap={12}>
      <Icon source={{ uri: user?.image_url }} size={44} rounded no_padding resize="cover" />
      <View>
        <Text size={12}>{getGreetingText()}</Text>
        <Text
          size={23}
          weight="bold"
          line_height={28}
        >{`Hi, ${user.first_name} ${user.last_name} 👋🏻`}</Text>
      </View>
    </Row>
  );
};

export default ProfileViewer;
