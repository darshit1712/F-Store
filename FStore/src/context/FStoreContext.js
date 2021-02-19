import createDataContext from './createfstore';
import AsyncStorage from '@react-native-community/async-storage';
import storage,{ firebase } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth"

//reducer add
const storeReducer = (state, action) => {

  switch (action.type) {
      case 'ADD_EVENT':
        return {...state,event:action.payload};
      case 'UPDATE_USER':
        return {...state,updates:action.payload};
      case 'USER_DETAILS':
        return {...state,user:action.payload};
      case 'ADD_USER':
        return {...state,userData:action.payload};
    default:
      return state;
  }
};
const UpadataUsedetils =(dispatch)=>{
  return async(fname,lname,email,imageUrl,dob,gender,id)=>{
    const update={fname,lname,email,imageUrl,dob,gender,id}
        firestore().collection("User").doc(`${id}`).update({
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
    .collection("User")
    .onSnapshot(snapshot => {
      const lists = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      console.log(lists)
       dispatch({ type: 'USER_DETAILS',payload:Object.values(lists)})
    })
  }
}
const Eventdetils=(dispatch)=>{
  return(title,description,place,quest,date,imageUrl)=>{
    const data={title,place,description,date,quest,imageUrl}
    dispatch({type:'ADD_EVENT',payload:data});
    firestore().collection("UserEvent")
    .add({
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
const signup=(dispatch)=>{
  return async(email,password,fname,lname,dob,gender,imageUrl)=>{
    await auth().createUserWithEmailAndPassword(email, password)
    .then((response) => {
      const uid = response.user.uid
      console.log(uid)
      firestore().collection("User")
          .doc(uid)
          .set({
            Image:imageUrl,
            FirstName:fname,
            LastName:lname,
            Email:email,
            Dob:dob,
            Gender:gender,
            id:uid
          })
          .then(() => {
            alert("You have signed up Successfully");
          })
          .catch((error) => {
              alert(error)
          });
  })
  .catch((error) => {
      alert(error)
});
  }
}
  const signIn = (dispatch) => {
    return  async(email,password) => {  
      try {
      await auth().signInWithEmailAndPassword(email, password)
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
    return () => {
      let user = auth().currentUser.uid;
       dispatch({type:'ADD_USER' ,payload:user})
    };
  }; 

  export const { Context, Provider } = createDataContext(
    storeReducer,
    {
      signIn,signout,
      gettoken,
      Eventdetils,Getuser,
      signup,UpadataUsedetils,
    },
    [],
  ); 