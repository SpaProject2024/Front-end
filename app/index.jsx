import { Text, View } from "react-native";
import {Link} from "expo-router";
import BottomTabs from './doctor/bottomTabs';
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <Link href={'/bottomTabs'}>
        <Text>phuc123</Text>
      </Link>
    </View>
  );
}
