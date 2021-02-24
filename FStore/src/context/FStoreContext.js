import createDataContext from './createfstore';
import AsyncStorage from '@react-native-community/async-storage';
import storage, {firebase} from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

//reducer add
const storeReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return {...state, event: action.payload};
    // case 'EVENT_DETAILS':
    //   return {...state, getEvent: action.payload};
    case 'UPDATE_USER':
      return {...state, updates: action.payload};
    case 'USER_DETAILS':
      return {...state, user: action.payload};
    case 'CURRENT_USER':
      return {...state, userData: action.payload};
    default:
      return state;
  }
};
const UpadataUsedetils = (dispatch) => {
  return async (fname, lname, email, imageUrl, dob, gender, id) => {
    const update = {fname, lname, email, imageUrl, dob, gender, id};
    firestore()
      .collection('User')
      .doc(`${id}`)
      .update({
        FirstName: fname,
        LastName: lname,
        Email: email,
        Dob: dob,
        Gender: gender,
        Image: imageUrl,
      })
      .then(() => {
        dispatch({type: 'UPDATE_USER', payload: update});
        alert('You have Data Successfully Add');
      });
  };
};
const Getuser = (dispatch) => {
  return () => {
    firebase
      .firestore()
      .collection('User')
      .onSnapshot((snapshot) => {
        const lists = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({type: 'USER_DETAILS', payload: Object.values(lists)});
      });
  };
};
const signup = (dispatch) => {
  return async (email, password, fname, lname, dob, gender, imageUrl) => {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        console.log(uid);
        firestore()
          .collection('User')
          .doc(uid)
          .set({
            Image: imageUrl,
            FirstName: fname,
            LastName: lname,
            Email: email,
            Dob: dob,
            Gender: gender,
            id: uid,
          })
          .then(() => {
            alert('You have signed up Successfully');
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };
};
const signIn = (dispatch) => {
  return async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      alert('Enter the valid email and password');
    }
  };
};
const signout = (dispatch) => {
  return async () => {
    auth().signOut();
  };
};
const gettoken = (dispatch) => {
  return () => {
    let user = auth().currentUser.uid;
    dispatch({type: 'CURRENT_USER', payload: user});
  };
};
const Eventdetils = (dispatch) => {
  return (title, description, place, guest, date, imageUrl, id) => {
    const data = {title, place, description, date, guest, imageUrl, id};
    dispatch({type: 'ADD_EVENT', payload: data});
    let timestamp = firebase.firestore.FieldValue.serverTimestamp();
    firestore()
      .collection('UserEvent')
      .add({
        Title: title,
        Description: description,
        Place: place,
        date: date,
        Guest: guest,
        image: imageUrl,
        timestamp: timestamp,
        like: [
          {
            id: id,
            isSelected: false,
          },
        ],
      })
      .then(() => {
        alert('You have Event save Successfully ');
      })
      .catch(() => {
        alert('Place Add to data ');
      });
  };
};
// const GetEvent = (dispatch) => {
//   return () => {
//     firebase
//       .firestore()
//       .collection('UserEvent')
//       .orderBy('date', 'asc')
//       .onSnapshot((snapshot) => {
//         const Events = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         console.log('events:::-', Events);
//         dispatch({type: 'EVENT_DETAILS', payload: Object.values(Events)});
//       });
//   };
// };

export const {Context, Provider} = createDataContext(
  storeReducer,
  {
    signIn,
    signout,
    gettoken,
    Eventdetils,
    Getuser,
    signup,
    UpadataUsedetils,
    // GetEvent,
  },
  [],
);
