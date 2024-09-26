import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const doctorList = [
  {
    id: 1,
    image: "./../../assets/images/doctor.jpg",
    name: "James Smith",
    experience: 1,
    rate: 1,
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
  },
  {
    id: 2,
    image: "./../../assets/images/doctor.jpg",
    name: "Emma Johnson",
    experience: 1,
    rate: 1,
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
  },
  {
    id: 3,
    image: "./../../assets/images/doctor.jpg",
    name: "Oliver Williams",
    experience: 1,
    rate: 1,
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
  },
  {
    id: 4,
    image: "./../../assets/images/doctor.jpg",
    name: "Sophia Brown",
    experience: 1,
    rate: 1,
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
  },
  {
    id: 5,
    image: "./../../assets/images/doctor.jpg",
    name: "Liam Taylor",
    experience: 1,
    rate: 1,
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
  },
];

export default function DoctorList() {
  const router = useRouter();

  const Doctor = ({ doctor }) => (
    <TouchableOpacity
      onPress={() =>
        router.push("/DoctorInfo/" + encodeURIComponent(JSON.stringify(doctor)))
      }
    >
      <View>
        <Image
          style={styles.image}
          source={require("./../../assets/images/doctor.jpg")}
        />
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {doctor.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        horizontal={true} // Thêm thuộc tính này để cuộn ngang
        showsHorizontalScrollIndicator={false} // Tùy chọn: Ẩn thanh cuộn ngang nếu không cần
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />} // Tạo khoảng cách giữa các item
        data={doctorList}
        renderItem={({ item }) => <Doctor doctor={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 100,
    width: 80,
    height: 80,
  },
  name: {
    textAlign: "center",
    width: 80,
    fontSize: 13
  },
});
