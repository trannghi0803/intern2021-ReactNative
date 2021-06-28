import React, {useState, useContext} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Button,
  Picker,
  ScrollView,
} from 'react-native';
import {GlobalState} from './GlobalState';

export default function FilterScreen({navigation}) {
  const {
    pagination,
    setPagination,
    department,
    allCommon,
    setIsFilter,
    isFilter,
    // allCommons,
  } = useContext(GlobalState);

  // console.log(department);
  //modal
  const [modalVisible, setModalVisible] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);

  //dropdown
  const [selectedValue1, setSelectedValue1] = useState('-1');
  const [selectedValue2, setSelectedValue2] = useState('-1');
  const [selectedValue3, setSelectedValue3] = useState('-1');
  const [selectedValue4, setSelectedValue4] = useState('-1');

  const dropList = data => {
    // allCommon
    if (typeof data !== 'undefined') {
      return data.map((value, index) => {
        return (
          <Picker.Item
            label={value.name}
            value={value.code}
            key={value.code}></Picker.Item>
        );
      });
    }
  };
  const dropListDepartment = data => {
    // allCommon
    if (!data) {
      return null;
    }
    return data.map((value, index) => {
      return (
        <Picker.Item
          label={value.departmentName}
          value={value.id}
          key={value.id}
        />
      );
    });
  };

  const modal = () => {
    return (
      <ScrollView>
        <View style={styles.centeredView}>
          {/* <View style={styles.modalView}> */}
          <Text style={styles.modalTitle}>Lọc báo cáo</Text>
          <Text style={styles.modalText}>Trạng thái</Text>
          <View style={styles.dropdown}>
            <Picker
              selectedValue={selectedValue1}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedValue1(itemValue);
                // console.log(itemValue);
                setPagination({...pagination, status: itemValue});
              }}>
              <Picker.Item label="Tất cả" value="-1"></Picker.Item>
              {dropList(allCommon.reportStatus)}
            </Picker>
          </View>
          <Text style={styles.modalText}>Loại báo cáo</Text>
          <View style={styles.dropdown}>
            <Picker
              selectedValue={selectedValue2}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedValue2(itemValue);
                setPagination({...pagination, reportType: itemValue});
              }}>
              <Picker.Item label="Tất cả" value="-1"></Picker.Item>
              {dropList(allCommon.reportType)}
            </Picker>
          </View>
          <Text style={styles.modalText}>Đối tượng</Text>
          <View style={styles.dropdown}>
            <Picker
              selectedValue={selectedValue3}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedValue3(itemValue);
                setPagination({...pagination, incidentObject: itemValue});
              }}>
              <Picker.Item label="Tất cả" value="-1"></Picker.Item>
              {dropList(allCommon.incidentObject)}
            </Picker>
          </View>
          <Text style={styles.modalText}>Phòng ban</Text>

          <View style={styles.dropdown}>
            <Picker
              selectedValue={selectedValue4}
              // onScroll={selected => setSelectedValue(selected.index)}

              onValueChange={(itemValue, itemIndex) => {
                setSelectedValue4(itemValue);
                console.log(itemValue);
                setPagination({...pagination, departmentId: itemValue});
              }}>
              <Picker.Item label="Tất cả" value="-1"></Picker.Item>
              {dropListDepartment(department)}
            </Picker>
          </View>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={styles.btnFilter}>
              <Button
                title="Lọc"
                onPress={() => {
                  setModalVisible(false);
                  setIsFilter(true);
                  navigation.navigate('Home');
                }}
              />
            </View>
            <View style={styles.btnClose}>
              <Button
                title="Thoát"
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('Home');
                  setPagination({page: 1});
                }}
              />
            </View>
          </View>
          {/* </View> */}
        </View>
      </ScrollView>
    );
  };

  return <View style={{flex: 1, backgroundColor: 'white'}}>{modal()}</View>;
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },

  btnFilter: {
    width: 60,
    marginRight: 10,
    margin: 10,
  },
  btnClose: {
    width: 70,
    marginRight: 10,
    margin: 10,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalText: {
    textAlign: 'left',
    width: 300,
    fontSize: 16,
    margin: 10,
  },
  modalTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    // marginTop: 10,
    fontSize: 20,
  },
  dropdown: {
    borderWidth: 0.5,
    width: 300,
    borderRadius: 10,
  },
});
