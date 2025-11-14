import { launchCamera, launchImageLibrary } from "react-native-image-picker"


export const openImageGallery = async (onSelect) => {

  launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: 1
  })
    .then(async (photo) => {

      let image = photo?.assets?.[0]
      let data = null

      if (image) {
        data = {
          ...image,
          name: image?.fileName,
          type: image?.type,
          uri: image?.uri
        }
      }

      onSelect(data)

    })
    .catch((err) => {
      console.log(err)
    })
}

export const openImageCamera = (onSelect) => {
  launchCamera({
    mediaType: 'photo',
  })
    .then((photo) => {

      let image = photo?.assets?.[0]
      let data = null

      if (image) {
        data = {
          ...image,
          name: image?.fileName,
          type: image?.type,
          uri: image?.uri
        }
      }

      onSelect(data)

    })
    .catch((err) => {
      console.log(err)
    })
}

export const openMultipleImagePicker = async (onSelect) => {
  launchImageLibrary({
    mediaType: 'mixed', // Allows both photos and videos
    selectionLimit: 0, // 0 means unlimited selection
  })
    .then((result) => {
      if (result.assets && result.assets.length > 0) {
        const files = result.assets.map((file) => ({
          uri: file.uri,
          name: file.fileName || `file_${Date.now()}`,
          type: file.type || 'image/jpeg',
          size: file.fileSize,
        }))
        onSelect(files)
      }
    })
    .catch((err) => {
      console.log('Image Picker Error: ', err)
    })
}