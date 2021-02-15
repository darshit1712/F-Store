import createDataContext from './createfstore';
import AsyncStorage from '@react-native-community/async-storage';
import storage,{ firebase } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth"

//reducer add
const storeReducer = (state, action) => {

  switch (action.type) {
      //  case 'ADD_UserDetils' :
      //     return action.payload ;
      //  case 'add_store':
      //    return action.payload;
      // case 'add_detile':
      //   return action.user;
      case 'USER_DETAILS':
        return {...state,user:action.payload};
        case 'ADD_USER':
          return {...state,userData:action.payload};
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

const Userdetils=(dispatch)=>{
  return(fname,lname,dob,imageUrl,gender,email)=>{
      firestore().collection("user").add({
                Image:imageUrl,
                FirstName:fname,
                LastName:lname,
                Email:email,
                Dob:dob,
                Gender:gender
            })
            .then(() => {
                alert("You have signed up Successfully");
            })
            .catch(() => {
                alert("Error adding document: ");
            });
  }
}

const Getuser=(dispatch)=>{
  return()=>{
    firebase
    .firestore()
    .collection("user")
    .onSnapshot(snapshot => {
      const lists = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
       dispatch({ type: 'USER_DETAILS',payload:Object.values(lists)})
    })
  }
}
  
const Eventdetils=(dispatch)=>{
  return(title,description,place,quest,date,imageUrl)=>{
    firestore().collection("UserEvent").add({
      Title:title,
      Description:description,
      Place:place,
      date:date,
      Quest:quest,
      image:imageUrl
      })
      .then(() => {
          alert("You have Event save Successfully ");
      })
      .catch(() => {
          alert("Place Add to data ");
      });

  }
}

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

const signup=(dispatch)=>{
  return async(email,password)=>{
    try {
       await auth().createUserWithEmailAndPassword(email, password)
    } catch (e) {
      alert('Enter the valid and password')
    }
  }
}

  const signIn = (dispatch) => {
    return  async(email,password) => {  
      console.log(email,password)  
      try {
        await auth().signInWithEmailAndPassword(email, password)
        
        dispatch({type:'ADD_USER' ,payload:email})
        console.log(email)
     } catch (e) {
       alert('Enter the valid email and password')
     }
    };
  };

  const signout = (dispatch) => {
    return async() => {
      auth().signOut()
    };
  };

  const gettoken = (dispatch) => {
    return async() => {
      try {
        await AsyncStorage.getItem('Token');
      } catch(e) {
        console.log("get",e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'REGISTER', email: email });
    };
  };
 
 
  export const { Context, Provider } = createDataContext(
    storeReducer,
    {addstore,addUser,signIn,signout,gettoken,Userdetils,Eventdetils,Getuser,signup},
    [],
  ); 