import { StyleSheet } from 'react-native';
import { Pressable, Text } from 'react-native';
import { Colors } from '../../constants/colors';

function Button({ onPress, children }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.primary100,
    backgroundColor: Colors.primary800,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.primary100,
    //backgroundColor: Colors.primary100,
  },
});
