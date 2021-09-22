import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar
 } from 'react-native';

 

const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getMoviesFromApi();
  }, []);
  const getMoviesFromApi = () => {
    const URL = 'https://api.github.com/repos/flutter/flutter/commits';
    return fetch(URL)
      .then(response => response.json())
      .then(res => {
        console.log('json===>', res);
        setData(res);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const renderItem = ({item, index}) => {
    const searchTerm = '#';
    const indexOfFirst = (item.commit.message).indexOf(searchTerm);
    let neww = (item.commit.message).slice(indexOfFirst, indexOfFirst + 6);
    console.log(neww);
    if (index < 25) {
      return (
        <View key={String(index)} style={styles.item}>
          <Text style={styles.title}>{item.commit && item.commit.message}</Text>
          <Text style={styles.title1}>{`(${neww})`}</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#00000090',
    padding: 20,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title1: {
    fontSize: 35,
    color: 'yellow',
  },
  title: {
    fontSize: 17,
    color: '#fff',
    textAlign: 'justify',
  },
});

export default App;
