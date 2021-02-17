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
       case 'ADD_EVENT':
         return {...state,event:action.payload};
      // case 'add_detile':
      //   return action.user;
      case 'UPDATE_USER' :
        return {...state,updates:action.payload};
      case 'USER_DETAILS':
        return {...state,user:action.payload};
      case 'ADD_USER':
          return {...state,userData:action.payload};
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
const UpadataUsedetils =(dispatch)=>{
  return async(fname,lname,email,imageUrl,dob,gender,id)=>{
    const update={fname,lname,email,imageUrl,dob,gender,id}
        firestore().collection("user").doc(`${id}`).update({
            FirstName: fname,
            LastName: lname,
            Email: email,
            Dob:dob,
            Gender:gender,
            Image:imageUrl,
        }).then(() => {
          dispatch({type:'UPDATE_USER',payload:update})
          alert('You have Data Successfully Add')
        })
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
    const data={title,place,description,date,quest,imageUrl}
    dispatch({type:'ADD_EVENT',payload:data});

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
// const addstore = (dispatch) => {
//   return  (title,place,descripation,date,quest,image) => {
//       const data={title,place,descripation,date,quest,image}
//       dispatch({ type: 'add_store' ,payload : data});
      
//   };
// };
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
      try {
        await auth().signInWithEmailAndPassword(email, password)
        try {
          await AsyncStorage.setItem("userData", JSON.stringify(email));
       } catch (error) {
         console.log("Something went wrong", error);
       }
     } catch (e) {
       alert('Enter the valid email and password')
     }
    };
  };
  const signout = (dispatch) => {
    return async() => {
      auth().signOut()
      await AsyncStorage.removeItem('userData');
    };
  };
  const gettoken = (dispatch) => {
    return async() => {
      try {
          let userData = await AsyncStorage.getItem("userData");
          let data = JSON.parse(userData);
          dispatch({type:'ADD_USER' ,payload:data})
      } catch(e) {
        console.log("get",e);
      }
    };
  }; 
  export const { Context, Provider } = createDataContext(
    storeReducer,
    {
      addUser,
      signIn,signout,
      gettoken,Userdetils,
      Eventdetils,Getuser,
      signup,UpadataUsedetils,
    },
    [],
  ); 