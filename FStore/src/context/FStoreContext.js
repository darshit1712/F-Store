import createDataContext from './createfstore';
import AsyncStorage from '@react-native-community/async-storage';

//reducer add
const storeReducer = (state, action) => {

  switch (action.type) {
       case 'add_store':
         return action.payload;
      case 'add_detile':
         return action.user;
      case 'LOGIN': 
         return {
           ...state,
           email: action.email,
           password:action.password
         };
       case 'LOGOUT': 
         return {
           ...state,
           email: null,
         };
       case 'REGISTER': 
        return {
          ...State,
          email: action.email,
        };
    default:
      return state;
  }
};
  
const addUser = (dispatch) => {
  return  (fname,lname,dob,image,male,female,other,email) => {
      const user={fname,lname,dob,image,male,female,other,email}
      dispatch({ type: 'add_detile' , user : user})
  };
};
  const addstore = (dispatch) => {
    return  (title,place,descripation,date,quest,image) => {
        const data={title,place,descripation,date,quest,image}
        dispatch({ type: 'add_store' ,payload : data});
       
    };
  };

  const signIn = (dispatch) => {
    return  async(email,password) => {    
      if(email=='user@gmail.com'&& password=='pass'){
        console.log(email)
        try {
          await AsyncStorage.setItem('Token', email);
          dispatch({ type: 'LOGIN', email: email, password: password });
        } catch(e) {
          console.log(e);
        }
      }else if(email==''){
       alert('enter  the email is')
      }else if(password==''){
        alert('enter the password')
      }else{
        alert('enter the valid email and password')
      }  
    };
  };

  const signout = (dispatch) => {
    return async() => {
      try {
        await AsyncStorage.removeItem('Token');
        dispatch({ type: 'LOGOUT' });
      } catch(e) {
        console.log(e);
      }
    };
  };

  const gettoken = (dispatch) => {
    return async() => {
      try {
        userToken = await AsyncStorage.getItem('Token');
        console.log('aasaaa')
      } catch(e) {
        console.log("get",e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'REGISTER', email: email });
    };
  };
 
 
  export const { Context, Provider } = createDataContext(
    storeReducer,
    {addstore,addUser,signIn,signout,gettoken},
    [],
  ); 