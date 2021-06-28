import React, {useState, useContext} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import {GlobalState} from './GlobalState';

export default function HomeScreen({navigation}) {
  const {
    allReport,
    pagination,
    setPagination,
    department,
    allCommon,
    setIsFilter,
    isFilter,
    // allCommons,
  } = useContext(GlobalState);

  const [dateFrom, setDateFrom] = useState('01-01-2020');
  const [dateTo, setDateTo] = useState(moment().format('DD-MM-YYYY'));
  // console.log(allReport);

  // console.log(items);
  const loading = () => {
    return (
      <ActivityIndicator
        size="large"
        color="#00ff00"
        style={{position: 'absolute', top: 300, left: 190}}
      />
    );
  };
  //filter

  const filterDate = () => {
    // let data = [];
    // console.log('object');
    // console.log(dateFrom, dateTo);
    setIsFilter(true);
    let timeStart = moment(dateFrom, 'DD-MM-YYYY').unix();
    let timeEnd = moment(dateTo, 'DD-MM-YYYY').unix();
    // console.log(timeStart, timeEnd);

    setPagination({...pagination, reportTime: `${timeStart}, ${timeEnd}`});
    // console.log('value');
    console.log(pagination);
  };
  // console.log(items);
  //DateTime

  const ReportItem = props => (
    <View style={styles.row}>
      <View>
        <View style={styles.title}>
          <Text style={styles.reportNo}>{props.item.reportNo}</Text>
          <Text
            style={[
              styles.status,
              {
                color:
                  props.item.statusName === 'Phân tích' ? '#f39c12' : '#2ecc71',
              },
            ]}>
            {props.item.statusName}
          </Text>
        </View>
        <Text>
          {moment(props.item.reportTime * 1000).format('DD-MM-YYYY HH:mm')}
        </Text>
        <View style={styles.common}>
          <Text style={styles.report}>{props.item.reportTypeName} |</Text>
          <Text>{props.item.incidentObjectName}</Text>
        </View>
        <Text>{props.item.reporterName}</Text>
        <Text>{props.item.detailDescription}</Text>
      </View>
      <TouchableOpacity style={styles.dotslist} activeOpacity={0.5}>
        <Image
          source={require('./img/61140.png')}
          style={{width: 20, height: 20}}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.main}>
      <View style={styles.datetime}>
        <SafeAreaView style={styles.firstDateTime}>
          <Text>Từ</Text>
          <View>
            <DatePicker
              style={styles.datePickerStyle}
              date={dateFrom} // Initial date from state
              mode="date" // The enum of date, datetime and time
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate="01-01-2020"
              maxDate={dateTo}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  //display: 'none',
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              // onDateChange={filterDate}
              onDateChange={date => {
                // console.log(date);
                // console.log(moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY'));
                setDateFrom(moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY'));
                // console.log('DateFrom: ', date);
                // console.log(dateFrom);
                filterDate();
              }}
              // onPress={filterDate}
            />
          </View>
          <Text style={{marginLeft: 5}}>đến</Text>
        </SafeAreaView>
        <SafeAreaView>
          <View>
            <DatePicker
              style={styles.datePickerStyle}
              date={dateTo} // Initial date from state
              mode="date" // The enum of date, datetime and time
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate="01-01-2020"
              maxDate={moment().format('DD-MM-YYYY')}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  //display: 'none',
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              // onDateChange={filterDate}
              onDateChange={dated => {
                // console.log(date);
                // // console.log(moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY'));
                // const dateTo = moment(date, 'DD-MM-YYYY');
                setDateTo(moment(dated, 'DD-MM-YYYY').format('DD-MM-YYYY'));
                // console.log('DateTo: ', dated);
                // setDateTo(dated);
                // console.log(dateTo);
                filterDate();
              }}
              // onPress={filterDate}
            />
          </View>
        </SafeAreaView>
        <View style={styles.filter}>
          <TouchableOpacity
            // style={{marginLeft: 15}}
            onPress={() => {
              setIsFilter(true);
              setDateFrom('01-01-2020');

              setDateTo(moment().format('DD-MM-YYYY'))
              setPagination({page: 1});
            }}>
            <Image
              source={require('./img/reset-icon.jpg')}
              style={{width: 35, height: 35}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => navigation.navigate('Filter')}>
            <Image
              source={require('./img/filter-img-icon.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <>
        <FlatList
          style={styles.container}
          data={allReport}
          // onEndReachedThreshold={0.5}
          // onReached={({distanceFromEnd}) => {
          //   console.log(distanceFromEnd);
          //   console.log('aaa');
          //   setPagination({...pagination, page: 2});
          //   console.log(pagination);
          // }}
          renderItem={({item, index}) => <ReportItem item={item}></ReportItem>}
          keyExtractor={item => item.id}
        />
        {allReport.length === 0 && loading()}
        {isFilter && loading()}
      </>
      <TouchableOpacity style={styles.list}>
        <Image
          source={require('./img/sign-add-icon.png')}
          style={{width: 60, height: 60}}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  filter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  firstDateTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  list: {
    position: 'absolute',
    right: 20,
    top: 530,
  },
  dotslist: {
    marginTop: 40,
  },
  datePickerStyle: {
    width: 130,
    marginTop: 5,
  },
  datetime: {
    // flex: 1,
    padding: 10,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  reportNo: {
    fontSize: 16,
    fontWeight: '700',
  },
  status: {
    marginLeft: 10,
    color: '#20232a',
  },
  common: {
    flexDirection: 'row',
  },
  report: {
    marginRight: 5,
  },
  title: {
    flexDirection: 'row',
  },
});
