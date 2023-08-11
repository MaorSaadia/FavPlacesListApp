import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';

function PlaceItem({ place, onSelect }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(this, place.id)}
    >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
  },
  pressed: {
    opacity: 0.85,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.gray700,
    marginBottom: 2,
    borderBottomColor: Colors.primary200,
    borderBottomWidth: 1,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
});
