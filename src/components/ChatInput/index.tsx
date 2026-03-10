import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator, Platform, Image } from 'react-native';
import Text from '../Text';
import Icon from '../Icon';
import images from '../../assets/images';
import styles from './styles';
import colors from '../../utils/colors';
import { launchImageLibrary, Asset } from 'react-native-image-picker';

interface ChatInputProps {
  onSend: (message: string, files?: Asset[]) => void;
  disabled?: boolean;
  isLoading?: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  disabled = false,
  isLoading = false,
  placeholder = 'Type message...',
}) => {
  const [message, setMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<Asset[]>([]);

  const handleSend = () => {
    if (message.trim() || selectedFiles.length > 0) {
      onSend(message.trim(), selectedFiles);
      setMessage('');
      setSelectedFiles([]);
    }
  };

  const handleAttachment = () => {
    launchImageLibrary(
      {
        mediaType: 'mixed',
        selectionLimit: 5,
        quality: 0.8,
      },
      response => {
        if (response.didCancel) {
          return;
        }
        if (response.errorCode) {
          console.error('ImagePicker Error:', response.errorMessage);
          return;
        }
        if (response.assets) {
          setSelectedFiles(prev => [...prev, ...response.assets!]);
        }
      }
    );
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      {selectedFiles.length > 0 && (
        <View style={styles.files_preview}>
          {selectedFiles.map((file, index) => (
            <View key={index} style={styles.file_item}>
              <Image
                source={{ uri: file.uri }}
                style={styles.file_image}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.remove_button}
                onPress={() => removeFile(index)}
              >
                <Text size={10} color={colors.white}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.medium_gray}
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={1000}
          editable={!disabled}
        />
        <TouchableOpacity
          style={styles.attachment_button}
          onPress={handleAttachment}
          disabled={disabled || isLoading}
        >
          <Icon source={images.camera} size={24} tint_color={colors.medium_gray} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.send_button, disabled && styles.send_button_disabled]}
          onPress={handleSend}
          disabled={disabled || (!message.trim() && selectedFiles.length === 0)}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Icon source={images.send} size={24} tint_color={colors.primary} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatInput;

