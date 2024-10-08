import { View, DrawerLayoutAndroid } from "react-native";
import React, { useRef } from "react";
import ServiceList from "./../../components/ServiceList/ServiceList";
import FilterService from "./../../components/ServiceList/FilterService";
import Header from "../../components/ServiceList/Header";

export default function _layout() {
  const drawer = useRef(null);
  const navigationView = () => (
    <FilterService closeFilter={() => drawer.current.closeDrawer()} />
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={"right"}
      renderNavigationView={navigationView}
    >
      <View style={{ flex: 1 }}>
        <Header setFilterVisible={() => drawer.current.openDrawer()} />

        <ServiceList />
      </View>
    </DrawerLayoutAndroid>
  );
}
