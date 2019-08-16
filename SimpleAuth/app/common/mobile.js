import AsyncStorage from '@react-native-community/async-storage'; 

export const lsAll = async => {
    console.log('\n\n');
    console.log('mobile lsAll\n\n'); 
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (error, stores) => {
        stores.map((result, i, store) => {
          console.log({ [store[i][0]]: store[i][1] });
          return true;
        });
      });
    });
}

export const lsCheck = async (aKey) => {
  try {
    const value = await AsyncStorage.getItem(aKey) || 'none';
    if (value !== null) {
      console.log('check key = ' +aKey)
      console.log(value);
      return value 
    }
  } catch (error) {
    console.log('LS check error - can not read ' +error)
  }
};

export const lsClear = async (keys) => {
  AsyncStorage.multiRemove(keys, (err) => {
    console.log('keys removed ' +keys)
  })
}

export const lsGet = async (aKey) => {
  try {
    const value = await AsyncStorage.getItem(aKey) || 'none';
    if (value !== null) {
      return JSON.parse(value)
    }
  } catch (error) {
      console.log('LS error - can not read \n' +error)
      return null
  }
};

export const lsGetAny = async (aKey) => {
  let lsAny = await lsGet(aKey)
  return lsAny               
}

export const lsStore = async (aKey, aValue) => {
  try {
    console.log('store key = ' +aKey)
    console.log('store value = ' +aValue)
    await AsyncStorage.setItem(aKey, JSON.stringify(aValue));
  } catch (error) {
    console.log('key = ' +aKey)
    console.log('LS error - can not save \n' +error)
  }
}; 
